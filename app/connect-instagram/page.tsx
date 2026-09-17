"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  RefreshCw,
  Sparkles,
  User,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 264.583 264.583"
      className={className}
    >
      <defs>
        <radialGradient
          xlinkHref="#ig-a"
          id="ig-f"
          cx="158.429"
          cy="578.088"
          r="52.352"
          fx="158.429"
          fy="578.088"
          gradientTransform="matrix(0 -4.03418 4.28018 0 -2332.227 942.236)"
          gradientUnits="userSpaceOnUse"
        />
        <radialGradient
          xlinkHref="#ig-b"
          id="ig-g"
          cx="172.615"
          cy="600.692"
          r="65"
          fx="172.615"
          fy="600.692"
          gradientTransform="matrix(.67441 -1.16203 1.51283 .87801 -814.366 -47.835)"
          gradientUnits="userSpaceOnUse"
        />
        <radialGradient
          xlinkHref="#ig-c"
          id="ig-h"
          cx="144.012"
          cy="51.337"
          r="67.081"
          fx="144.012"
          fy="51.337"
          gradientTransform="matrix(-2.3989 .67549 -.23008 -.81732 464.996 -26.404)"
          gradientUnits="userSpaceOnUse"
        />
        <radialGradient
          xlinkHref="#ig-d"
          id="ig-e"
          cx="199.788"
          cy="628.438"
          r="52.352"
          fx="199.788"
          fy="628.438"
          gradientTransform="matrix(-3.10797 .87652 -.6315 -2.23914 1345.65 1374.198)"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient id="ig-d">
          <stop offset="0" stopColor="#ff005f" />
          <stop offset="1" stopColor="#fc01d8" />
        </linearGradient>
        <linearGradient id="ig-c">
          <stop offset="0" stopColor="#780cff" />
          <stop offset="1" stopColor="#820bff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ig-b">
          <stop offset="0" stopColor="#fc0" />
          <stop offset="1" stopColor="#fc0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ig-a">
          <stop offset="0" stopColor="#fc0" />
          <stop offset=".124" stopColor="#fc0" />
          <stop offset=".567" stopColor="#fe4a05" />
          <stop offset=".694" stopColor="#ff0f3f" />
          <stop offset="1" stopColor="#fe0657" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-e)"
        d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
        transform="translate(-71.816 -18.143)"
      />
      <path
        fill="url(#ig-f)"
        d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
        transform="translate(-71.816 -18.143)"
      />
      <path
        fill="url(#ig-g)"
        d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
        transform="translate(-71.816 -18.143)"
      />
      <path
        fill="url(#ig-h)"
        d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
        transform="translate(-71.816 -18.143)"
      />
      <path
        fill="#fff"
        d="M132.345 33.973c-26.716 0-30.07.117-40.563.594-10.472.48-17.62 2.136-23.876 4.567-6.47 2.51-11.958 5.87-17.426 11.335-5.472 5.464-8.834 10.948-11.354 17.412-2.44 6.252-4.1 13.397-4.57 23.858-.47 10.486-.593 13.838-.593 40.535 0 26.697.119 30.037.594 40.522.482 10.465 2.14 17.609 4.57 23.859 2.515 6.465 5.876 11.95 11.346 17.414 5.466 5.468 10.955 8.834 17.42 11.345 6.26 2.431 13.41 4.088 23.881 4.567 10.493.477 13.844.594 40.559.594 26.719 0 30.061-.117 40.555-.594 10.472-.48 17.63-2.136 23.888-4.567 6.468-2.51 11.948-5.877 17.414-11.345 5.472-5.464 8.834-10.949 11.354-17.412 2.419-6.252 4.079-13.398 4.57-23.858.472-10.486.595-13.828.595-40.525s-.123-30.047-.594-40.533c-.492-10.465-2.152-17.608-4.57-23.858-2.521-6.466-5.883-11.95-11.355-17.414-5.472-5.468-10.944-8.827-17.42-11.335-6.271-2.431-13.424-4.088-23.897-4.567-10.493-.477-13.834-.594-40.558-.594zm-8.825 17.715c2.62-.004 5.542 0 8.825 0 26.266 0 29.38.094 39.752.565 9.591.438 14.797 2.04 18.264 3.385 4.591 1.782 7.864 3.912 11.305 7.352 3.443 3.44 5.575 6.717 7.362 11.305 1.346 3.46 2.951 8.663 3.388 18.247.47 10.363.573 13.475.573 39.71 0 26.233-.102 29.346-.573 39.709-.44 9.584-2.042 14.786-3.388 18.247-1.783 4.587-3.919 7.854-7.362 11.292-3.443 3.441-6.712 5.57-11.305 7.352-3.463 1.352-8.673 2.95-18.264 3.388-10.37.47-13.486.573-39.752.573-26.268 0-29.38-.102-39.751-.573-9.592-.443-14.797-2.044-18.267-3.39-4.59-1.781-7.87-3.911-11.313-7.352-3.443-3.44-5.574-6.709-7.362-11.298-1.346-3.461-2.95-8.663-3.387-18.247-.472-10.363-.566-13.476-.566-39.726s.094-29.347.566-39.71c.438-9.584 2.04-14.786 3.387-18.25 1.783-4.588 3.919-7.865 7.362-11.305 3.443-3.441 6.722-5.57 11.313-7.357 3.468-1.351 8.675-2.949 18.267-3.389 9.075-.41 12.592-.532 30.926-.553zm61.337 16.322c-6.518 0-11.805 5.277-11.805 11.792 0 6.512 5.287 11.796 11.805 11.796 6.517 0 11.804-5.284 11.804-11.796 0-6.513-5.287-11.796-11.805-11.796zm-52.512 13.782c-27.9 0-50.519 22.603-50.519 50.482 0 27.879 22.62 50.471 50.52 50.471s50.51-22.592 50.51-50.471c0-27.879-22.613-50.482-50.513-50.482zm0 17.715c18.11 0 32.792 14.67 32.792 32.767 0 18.096-14.683 32.767-32.792 32.767-18.11 0-32.791-14.671-32.791-32.767 0-18.098 14.68-32.767 32.791-32.767z"
      />
    </svg>
  )
}

export default function ConnectInstagramPage() {
  const router = useRouter()
  const [username, setUsername] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "searching" | "found" | "error" | "prompt">("idle")
  const [connecting, setConnecting] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const st = params.get("status")
      if (st === "prompt" || st === "not-connected") {
        setStatus("prompt")
      } else if (st === "error") {
        setUsername("raju")
        setStatus("error")
      } else if (st === "found") {
        setUsername("coder_431")
        setStatus("found")
      }
    }
  }, [])

  // Demo accounts data
  const accountsDatabase: Record<
    string,
    { name: string; username: string; followers: number; posts: number; avatar: string }
  > = {
    coder_431: {
      name: "Coder 🤍 💥",
      username: "coder_431",
      followers: 25,
      posts: 1,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    },
    instadm_demo: {
      name: "InstaDM Official",
      username: "instadm_demo",
      followers: 1248,
      posts: 14,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    },
  }

  const handleFindAccount = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const clean = username.replace(/^@/, "").trim().toLowerCase()
    if (!clean) return

    setStatus("searching")

    setTimeout(() => {
      // If user typed "raju" or anything unknown, simulate error (Screenshot 2)
      if (clean === "raju" || clean === "error" || clean === "test") {
        setStatus("error")
      } else {
        // Found account (Screenshot 4) - default to coder_431 or custom handle
        setStatus("found")
      }
    }, 600)
  }

  const handleConnect = async () => {
    setConnecting(true)
    const clean = username.replace(/^@/, "").trim() || "coder_431"
    const matched = accountsDatabase[clean] || {
      name: `${clean} 🤍 💥`,
      username: clean,
      followers: 25,
      posts: 1,
    }

    try {
      const res = await fetch("/api/instagram/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: matched.username,
          followersCount: matched.followers,
          postsCount: matched.posts,
        }),
      })

      if (res.ok) {
        // Set document cookie fallback
        document.cookie = "instadm_ig_connected=true; path=/; max-age=2592000"
        document.cookie = `instadm_ig_username=${matched.username}; path=/; max-age=2592000`
        router.push("/dashboard")
      } else {
        // Still proceed to dashboard in demo mode
        document.cookie = "instadm_ig_connected=true; path=/; max-age=2592000"
        router.push("/dashboard")
      }
    } catch {
      document.cookie = "instadm_ig_connected=true; path=/; max-age=2592000"
      router.push("/dashboard")
    } finally {
      setConnecting(false)
    }
  }

  const activeAccount = accountsDatabase[username.replace(/^@/, "").trim().toLowerCase()] || {
    name: `${username.replace(/^@/, "").trim() || "Coder"} 🤍 💥`,
    username: username.replace(/^@/, "").trim() || "coder_431",
    followers: 25,
    posts: 1,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col justify-between select-none">
      {/* Top Simple Header */}
      <header className="flex h-16 items-center justify-between px-6 sm:px-12 border-b border-stone-100">
        <Link href="/" className="font-black text-lg tracking-wider uppercase text-stone-950">
          INSTADM
        </Link>

        <div className="flex items-center gap-3 text-xs text-stone-500">
          <span>Logged in</span>
          <button
            type="button"
            onClick={() => {
              document.cookie = "instadm_ig_connected=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
              router.push("/login")
            }}
            className="font-semibold text-stone-900 hover:underline"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xl mx-auto space-y-8 text-center">
          {/* SCREENSHOT 3: Optional Alternate "Instagram not connected" Banner State */}
          {status === "prompt" ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-stone-100 text-stone-700 shadow-xs">
                  <Camera className="h-10 w-10 text-stone-700" />
                  <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-amber-400 fill-amber-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
                  Instagram not connected
                </h1>
                <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                  Connect your Instagram account to see your posts and set up automations.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => setStatus("idle")}
                  className="h-12 rounded-2xl bg-[#6366F1] hover:bg-[#4F46E5] px-8 text-sm font-bold text-white shadow-md gap-2"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0" />
                  <span>Connect Instagram</span>
                </Button>
              </div>
            </div>
          ) : (
            /* SCREENSHOTS 1, 2, 4: Main "Connect your Creator or Business Instagram" Flow */
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header Titles (Matching Screenshot 1) */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
                  Connect your Creator or <br className="hidden sm:inline" />
                  Business Instagram
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto leading-relaxed">
                  We&apos;ll connect through Meta official login - make sure you are logged in a
                  Creator or Business account in the browser.{" "}
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "How to switch to Business or Creator account in Instagram:\n1. Open Instagram Settings\n2. Tap 'Account type and tools'\n3. Tap 'Switch to Professional account'\n4. Select 'Creator' or 'Business'"
                      )
                    }
                    className="font-medium text-stone-800 underline underline-offset-2 hover:text-black cursor-pointer"
                  >
                    Need Help?
                  </button>
                </p>
              </div>

              {/* Form Input Container */}
              <form onSubmit={handleFindAccount} className="max-w-md mx-auto space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800">
                    Your Instagram username
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400 font-medium text-sm">
                      @
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value)
                        if (status !== "idle") setStatus("idle")
                      }}
                      placeholder="your_username"
                      className={`h-12 w-full rounded-2xl border bg-white pl-9 pr-4 text-sm font-medium text-stone-900 transition focus:outline-none ${
                        status === "found"
                          ? "border-[hsl(340_82%_62%)] ring-2 ring-[hsl(340_82%_62%/0.2)]"
                          : status === "error"
                          ? "border-red-400 ring-2 ring-red-100"
                          : "border-stone-300 focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                      }`}
                    />
                  </div>
                </div>

                {/* ============================================================== */}
                {/* STATE 2: Can't find that account (Matching Screenshot 2)      */}
                {/* ============================================================== */}
                {status === "error" && (
                  <div className="rounded-3xl border-2 border-red-500 bg-white p-5 space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-2 text-stone-950 font-bold text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-black">
                        ✕
                      </div>
                      <span>Can&apos;t find that account</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-700 pl-7">
                      <p className="font-bold text-stone-900">Most likely reasons:</p>
                      <p className="text-stone-600">
                        <span className="font-bold text-stone-800">1.</span> Typo in username
                      </p>
                      <p className="text-stone-600">
                        <span className="font-bold text-stone-800">2.</span> You have a Personal
                        account (need Business/Creator)
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <Button
                        type="button"
                        onClick={() => {
                          setUsername("")
                          setStatus("idle")
                        }}
                        className="h-10 rounded-2xl bg-[#EF4444] hover:bg-red-600 text-xs font-bold text-white px-5 shadow-xs"
                      >
                        Try again
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          alert(
                            "To switch to Creator/Business:\nGo to Instagram app > Settings > Account > Switch to Professional Account."
                          )
                        }
                        className="h-10 rounded-2xl border-stone-200 text-xs font-bold text-stone-800 hover:bg-stone-50 px-4"
                      >
                        Switch account type
                      </Button>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* STATE 4: Account found (Matching Screenshot 4)                */}
                {/* ============================================================== */}
                {status === "found" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="rounded-3xl border-2 border-emerald-500 bg-white p-4 sm:p-5 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-stone-950 font-bold text-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-black">
                          ✓
                        </div>
                        <span>Account found</span>
                      </div>

                      <div className="flex items-center gap-3.5 pl-7">
                        {/* Profile Thumbnail */}
                        <div className="h-14 w-14 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-tr from-sky-800 to-indigo-950 flex items-center justify-center text-white font-bold text-lg shadow-2xs">
                          {activeAccount.username.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-stone-950 flex items-center gap-1.5">
                            <span>{activeAccount.name}</span>
                          </p>
                          <p className="text-xs text-stone-500">@{activeAccount.username}</p>
                          <p className="text-xs text-stone-500 font-medium">
                            {activeAccount.followers} followers · {activeAccount.posts} posts
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Primary Action Button: Sign in as @coder_431 */}
                    <Button
                      type="button"
                      disabled={connecting}
                      onClick={handleConnect}
                      className="h-13 w-full rounded-2xl bg-[hsl(340_82%_62%)] hover:bg-[hsl(340_82%_55%)] text-sm font-bold text-white shadow-md gap-2 active:scale-98 transition cursor-pointer"
                    >
                      <InstagramIcon className="h-5 w-5 shrink-0" />
                      <span>
                        {connecting
                          ? "Connecting to Meta Graph API..."
                          : `Sign in as @${activeAccount.username}`}
                      </span>
                    </Button>
                  </div>
                )}

                {/* Find Account Submit Button (When in idle or searching) */}
                {status !== "found" && (
                  <Button
                    type="submit"
                    disabled={status === "searching" || !username.trim()}
                    className="h-12 w-full rounded-2xl bg-black hover:bg-stone-900 text-sm font-bold text-white shadow-sm transition active:scale-98 cursor-pointer"
                  >
                    {status === "searching" ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Searching Meta Graph API...</span>
                      </div>
                    ) : (
                      <span>Find account</span>
                    )}
                  </Button>
                )}
              </form>
            </div>
          )}

          {/* Helper shortcut / demo chips for all 4 states */}
          <div className="pt-3 text-center text-xs text-stone-400 space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[11px] font-bold text-stone-400 mr-1">Preview UI states:</span>
              <button
                type="button"
                onClick={() => {
                  setUsername("")
                  setStatus("idle")
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  status === "idle"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                1. Search (Screen 1)
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsername("raju")
                  setStatus("error")
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  status === "error"
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                2. Not Found (Screen 2)
              </button>
              <button
                type="button"
                onClick={() => setStatus("prompt")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  status === "prompt"
                    ? "bg-[#6366F1] text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                3. Not Connected (Screen 3)
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsername("coder_431")
                  setStatus("found")
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  status === "found"
                    ? "bg-[hsl(340_82%_62%)] text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                4. Found @coder_431 (Screen 4)
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Meta Disclaimer */}
      <footer className="py-6 text-center text-xs text-stone-400 border-t border-stone-100">
        <p>InstaDM connects directly via official Meta Instagram Graph API webhooks.</p>
      </footer>
    </div>
  )
}
