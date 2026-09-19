import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { accountId } = body

    if (!accountId) {
      return NextResponse.json({ error: "accountId is required" }, { status: 400 })
    }

    // Delete or update status to DISCONNECTED
    const account = await prisma.instagramAccount.findUnique({
      where: { id: accountId },
    })

    if (!account) {
      return NextResponse.json({ error: "Instagram account not found" }, { status: 404 })
    }

    await prisma.instagramAccount.delete({
      where: { id: accountId },
    })

    const remainingAccounts = await prisma.instagramAccount.count({
      where: { workspaceId: account.workspaceId },
    })

    const response = NextResponse.json({
      success: true,
      message: `Account @${account.username} disconnected successfully`,
    })

    if (remainingAccounts === 0) {
      response.cookies.delete("instadm_ig_connected")
      response.cookies.delete("instadm_ig_username")
    }

    return response
  } catch (error: any) {
    console.error("Failed to disconnect Instagram account:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to disconnect account" },
      { status: 500 }
    )
  }
}
