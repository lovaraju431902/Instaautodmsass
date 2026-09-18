"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2, RefreshCw, AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

function InstagramIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function InstagramCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [connectedUsername, setConnectedUsername] = React.useState<string>("")

  React.useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")

    if (error) {
      setStatus("error")
      setErrorMessage(errorDescription || "Access authorization was cancelled or denied.")
      return
    }

    const exchangeCode = async () => {
      try {
        const payloadCode = code || "demo_auth_code_12345"
        const res = await fetch("/api/instagram/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: payloadCode }),
        })

        const data = await res.json()

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to exchange token with Instagram")
        }

        setConnectedUsername(data.account?.username || "creator")
        setStatus("success")

        setTimeout(() => {
          router.push("/dashboard")
        }, 1200)
      } catch (err: any) {
        console.error("Callback error:", err)
        setStatus("error")
        setErrorMessage(err.message || "An unexpected error occurred while linking Instagram.")
      }
    }

    exchangeCode()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-stone-200/80 text-center space-y-6">
        {/* Top Logo */}
        <div className="flex justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/20">
            <InstagramIcon className="h-10 w-10 text-white" />
            <Sparkles className="absolute -top-1.5 -right-1.5 h-6 w-6 text-amber-300 fill-amber-300 animate-pulse" />
          </div>
        </div>

        {status === "loading" && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-stone-950">
              Connecting to Meta Graph API...
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Verifying permissions for basic profile, direct messaging, and comment webhooks.
            </p>
            <div className="pt-4 flex justify-center">
              <RefreshCw className="h-6 w-6 animate-spin text-rose-500" />
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="flex justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-stone-950">
              Connected @{connectedUsername}!
            </h2>
            <p className="text-xs text-stone-500">
              Your Instagram account is linked with all permissions active. Redirecting to dashboard...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-center">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-stone-950">
              Connection Incomplete
            </h2>
            <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
              {errorMessage}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Button
                onClick={() => router.push("/connect-instagram")}
                className="w-full h-11 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold"
              >
                Try Again
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="w-full text-xs text-stone-500"
              >
                Go to Dashboard anyway (Demo mode)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
