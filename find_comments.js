const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const crypto = require("crypto")

function decryptToken(cipherText) {
  if (!cipherText) return ""
  if (!cipherText.startsWith("enc:")) return cipherText
  try {
    const SECRET_SEED =
      process.env.ENCRYPTION_SECRET ||
      process.env.BETTER_AUTH_SECRET ||
      process.env.INSTAGRAM_APP_SECRET ||
      "instadm_default_secure_vault_secret_key_2026"
    const ENCRYPTION_KEY = crypto.createHash("sha256").update(SECRET_SEED).digest()
    const parts = cipherText.split(":")
    const [, ivHex, authTagHex, encryptedHex] = parts
    const iv = Buffer.from(ivHex, "hex")
    const authTag = Buffer.from(authTagHex, "hex")
    const encrypted = Buffer.from(encryptedHex, "hex")
    const decipher = crypto.createDecipheriv("aes-256-gcm", ENCRYPTION_KEY, iv)
    decipher.setAuthTag(authTag)
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
    return decrypted.toString("utf8")
  } catch (err) {
    return cipherText
  }
}

async function main() {
  try {
    const acc = await prisma.instagramAccount.findFirst({
      where: { username: "coder_431" },
    })

    if (!acc) return
    const token = decryptToken(acc.accessToken)

    console.log("Querying comments on Reel 18198190582379738...")
    const res = await fetch(
      `https://graph.instagram.com/v21.0/18198190582379738/comments?fields=id,text,timestamp,username,from&access_token=${token}`
    )
    const data = await res.json()
    console.log("Status:", res.status)
    console.log("Data:", JSON.stringify(data, null, 2))
  } catch (err) {
    console.error("Error:", err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
