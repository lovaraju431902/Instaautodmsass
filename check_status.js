const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  try {
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    })
    console.log(`\n=== RECENT ACTIVITY LOGS (${logs.length}) ===`)
    if (logs.length === 0) {
      console.log("No activity logs yet.")
    } else {
      for (const log of logs) {
        console.log({
          id: log.id,
          status: log.status,
          eventType: log.eventType,
          sender: log.metadata?.senderUsername,
          comment: log.metadata?.commentText,
          messageSent: log.messageText?.substring(0, 50) + "...",
          time: log.createdAt,
        })
      }
    }
  } catch (err) {
    console.error("DB Error:", err.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()
