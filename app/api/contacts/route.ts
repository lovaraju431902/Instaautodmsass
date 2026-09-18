import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const workspace = await prisma.workspace.findFirst({
      orderBy: { createdAt: "desc" },
    })

    if (!workspace) {
      return NextResponse.json({ contacts: [] })
    }

    const contacts = await prisma.contact.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { lastInteractionAt: "desc" },
    })

    return NextResponse.json({ contacts })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
