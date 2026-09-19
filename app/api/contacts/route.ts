import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    }).catch(() => null)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      )
    }

    const workspace = await prisma.workspace.findFirst({
      where: {
        OR: [
          { ownerId: session.user.id },
          { members: { some: { userId: session.user.id } } },
        ],
      },
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
