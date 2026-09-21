import crypto from "crypto"

/**
 * AES-256-GCM Secure Encryption & Decryption Utility
 * Protects Instagram Access Tokens, API Keys, and sensitive OAuth tokens stored in the database.
 */

const SECRET_SEED =
  process.env.ENCRYPTION_SECRET ||
  process.env.BETTER_AUTH_SECRET ||
  process.env.INSTAGRAM_APP_SECRET ||
  "instadm_default_secure_vault_secret_key_2026"

// Derive a deterministic 32-byte (256-bit) key from the secret seed
const ENCRYPTION_KEY = crypto.createHash("sha256").update(SECRET_SEED).digest()
const ALGORITHM = "aes-256-gcm"
const IV_LENGTH = 12 // Standard recommended IV length for GCM

/**
 * Encrypt a plain token or sensitive text string
 */
export function encryptToken(plainText: string | null | undefined): string {
  if (!plainText) return ""
  // Don't double encrypt
  if (plainText.startsWith("enc:")) return plainText

  try {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
    const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()])
    const authTag = cipher.getAuthTag()

    return `enc:${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`
  } catch (error) {
    console.error("[Crypto] Encryption failed, falling back to plaintext:", error)
    return plainText
  }
}

/**
 * Decrypt an encrypted token (backwards-compatible with unencrypted tokens)
 */
export function decryptToken(cipherText: string | null | undefined): string {
  if (!cipherText) return ""

  // If token is not encrypted (e.g. legacy DB row, mock token), return as-is
  if (!cipherText.startsWith("enc:")) {
    return cipherText
  }

  try {
    const parts = cipherText.split(":")
    if (parts.length !== 4) {
      return cipherText
    }

    const [, ivHex, authTagHex, encryptedHex] = parts
    const iv = Buffer.from(ivHex, "hex")
    const authTag = Buffer.from(authTagHex, "hex")
    const encrypted = Buffer.from(encryptedHex, "hex")

    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
    decipher.setAuthTag(authTag)

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
    return decrypted.toString("utf8")
  } catch (error) {
    console.error("[Crypto] Decryption failed:", error)
    return cipherText
  }
}
