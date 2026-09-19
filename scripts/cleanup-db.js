const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  console.log("Cleaning demo users and accounts from database...")
  
  // 1. Delete demo accounts
  const accounts = await prisma.instagramAccount.deleteMany({
    where: {
      OR: [
        { username: "coder_431" },
        { instagramId: { contains: "coder_431" } }
      ]
    }
  })
  console.log(`Deleted ${accounts.count} demo Instagram account(s).`)

  // 2. Delete demo users
  const users = await prisma.user.deleteMany({
    where: {
      email: {
        in: [
          "admin@instadm.co",
          "demo@instadm.co",
          "creator@instadm.co",
          "user@instadm.co"
        ]
      }
    }
  })
  console.log(`Deleted ${users.count} demo user(s).`)

  console.log("Cleanup complete!")
}

main()
  .catch((e) => {
    console.error("Cleanup error:", e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
