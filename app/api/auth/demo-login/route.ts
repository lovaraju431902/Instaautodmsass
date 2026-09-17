import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const demoEmail = "demo@instadm.co"
    const demoName = "Demo Creator"

    // 1. Find or create demo user
    let user = await prisma.user.findUnique({
      where: { email: demoEmail },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: demoName,
          email: demoEmail,
          emailVerified: true,
        },
      })
    }

    // 2. Create session in Better Auth session table
    const token = `demo_session_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
        userAgent: req.headers.get("user-agent") || "demo-client",
      },
    })

    // 3. Create response and set session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })

    response.cookies.set("better-auth.session_token", token, {
      path: "/",
      expires: expiresAt,
      httpOnly: false,
      sameSite: "lax",
    })

    response.cookies.set("better_auth_session", token, {
      path: "/",
      expires: expiresAt,
      httpOnly: false,
      sameSite: "lax",
    })

    return response
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create demo session"
    console.error("Demo login error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
