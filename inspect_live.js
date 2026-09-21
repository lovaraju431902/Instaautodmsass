const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  try {
    const acc = await prisma.instagramAccount.findFirst({
      where: { username: "coder_431" },
    })

    if (!acc) {
      console.log("coder_431 not found in DB")
      return
    }

    console.log("Account:", {
      username: acc.username,
      instagramId: acc.instagramId,
      hasToken: Boolean(acc.accessToken),
      tokenSnippet: acc.accessToken?.substring(0, 15) + "...",
    })

    const token = acc.accessToken

    // 1. Verify token is valid with /me
    console.log("\n1. Testing /me endpoint:")
    const meRes = await fetch(
      `https://graph.instagram.com/v21.0/me?fields=id,username,user_id&access_token=${token}`
    )
    console.log("Me Status:", meRes.status)
    const meData = await meRes.json()
    console.log("Me Data:", JSON.stringify(meData, null, 2))

    // 2. Check subscribed_apps
    console.log("\n2. Checking subscribed_apps:")
    const subRes = await fetch(
      `https://graph.instagram.com/v21.0/me/subscribed_apps?access_token=${token}`
    )
    console.log("Subscribed Apps Status:", subRes.status)
    const subData = await subRes.json()
    console.log("Subscribed Apps:", JSON.stringify(subData, null, 2))

    // 3. Query comments on reel 18198190582379738
    console.log("\n3. Querying comments on Reel 18198190582379738:")
    const commentsRes = await fetch(
      `https://graph.instagram.com/v21.0/18198190582379738/comments?fields=id,text,timestamp,username,from&access_token=${token}`
    )
    console.log("Comments Status:", commentsRes.status)
    const commentsData = await commentsRes.json()
    console.log("Comments:", JSON.stringify(commentsData, null, 2))
  } catch (err) {
    console.error("Error:", err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
