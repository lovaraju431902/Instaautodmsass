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

    if (!acc) {
      console.log("No account found")
      return
    }

    const token = decryptToken(acc.accessToken)
    console.log("Testing DM send for account:", acc.username)

    // Test 1: graph.instagram.com/v21.0/me/messages with plain text
    console.log("\n--- TEST 1: graph.instagram.com/v21.0/me/messages ---")
    const res1 = await fetch("https://graph.instagram.com/v21.0/me/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipient: { username: "telugu.cockroachjanataparty" },
        message: { text: "Hello from InstaDM test!" },
      }),
    })
    console.log("Status 1:", res1.status)
    const json1 = await res1.text()
    console.log("Response 1:", json1)

    // Test 2: graph.facebook.com/v21.0/me/messages
    console.log("\n--- TEST 2: graph.facebook.com/v21.0/me/messages ---")
    const res2 = await fetch("https://graph.facebook.com/v21.0/me/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipient: { username: "telugu.cockroachjanataparty" },
        message: { text: "Hello from InstaDM test!" },
      }),
    })
    console.log("Status 2:", res2.status)
    const json2 = await res2.text()
    console.log("Response 2:", json2)

    // Test 3: graph.instagram.com/v21.0/{ig_user_id}/messages
    console.log(`\n--- TEST 3: graph.instagram.com/v21.0/${acc.instagramId}/messages ---`)
    const res3 = await fetch(`https://graph.instagram.com/v21.0/${acc.instagramId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipient: { username: "telugu.cockroachjanataparty" },
        message: { text: "Hello from InstaDM test!" },
      }),
    })
    console.log("Status 3:", res3.status)
    const json3 = await res3.text()
    console.log("Response 3:", json3)

  } catch (err) {
    console.error("Test DM Error:", err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
