const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  try {
    const acc = await prisma.instagramAccount.findFirst({
      where: { username: "coder_431" },
      include: {
        automations: {
          include: {
            keywords: true,
            specificPost: true,
          },
        },
      },
    })

    if (!acc) {
      console.log("No account found for coder_431")
      return
    }

    console.log("Instagram Account:", {
      id: acc.id,
      instagramId: acc.instagramId,
      username: acc.username,
      status: acc.status,
    })

    console.log(`Automations count: ${acc.automations.length}`)
    for (const auto of acc.automations) {
      console.log({
        id: auto.id,
        name: auto.name,
        status: auto.status,
        triggerType: auto.triggerType,
        postTargetType: auto.postTargetType,
        specificPostMediaId: auto.specificPost?.mediaId,
        keywords: auto.keywords.map(k => k.keyword),
        finalMessage: auto.finalMessage,
      })
    }
  } catch (err) {
    console.error("DB Error:", err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
