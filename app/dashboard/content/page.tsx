"use client"

import * as React from "react"
import Link from "next/link"
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Play,
  RefreshCw,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContentPage() {
  const [data, setData] = React.useState<{
    account: { username: string; followersCount: number } | null
    recentPost: { caption?: string; mediaType?: string; postedAt?: string } | null
  } | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const loadContent = async () => {
    try {
      const res = await fetch("/api/dashboard/stats")
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  React.useEffect(() => {
    loadContent()
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    loadContent()
  }

  const username = data?.account?.username || "creator"
  const hasAccount = Boolean(data?.account)

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Posts &amp; Reels
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage automations for your recent Instagram posts and reels.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Section 1: Recent Posts */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-stone-900">Recent Posts</h2>
          <p className="text-xs text-stone-500">
            Your latest Instagram posts. Set up automations to start capturing leads when people comment.
          </p>
        </div>

        {!hasAccount ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center space-y-3 max-w-md">
            <p className="text-xs font-medium text-stone-600">
              No Instagram account connected yet. Connect your account to see your real Reels and Posts.
            </p>
            <Button size="lg" className="h-9 rounded-xl bg-stone-900 text-xs font-semibold text-white hover:bg-stone-800">
              <Link href="/connect-instagram">Connect Instagram</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-[280px]">
            <div className="overflow-hidden rounded-3xl border border-stone-800 bg-black p-3.5 text-white shadow-lg">
              {/* Reel Header */}
              <div className="flex items-center justify-between pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-700 text-[10px] font-bold">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold">{username}</span>
                </div>
                <MoreHorizontal className="h-4 w-4 text-stone-400" />
              </div>

              {/* Video Canvas */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-700 via-blue-900 to-emerald-950 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-white">
                  <Play className="h-4 w-4 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center justify-between pt-3 text-stone-300">
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 hover:text-red-500 cursor-pointer" />
                  <MessageCircle className="h-4 w-4 cursor-pointer" />
                  <Send className="h-4 w-4 cursor-pointer" />
                </div>
                <Bookmark className="h-4 w-4 cursor-pointer" />
              </div>

              {/* Caption */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-white">
                  {username} <span className="font-normal text-stone-300">| {data?.recentPost?.caption || "Automation active"}</span>
                </p>
                <p className="text-[10px] font-medium text-stone-500 uppercase mt-1">META API CONNECTED</p>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <Link
                  href="/dashboard/automations"
                  className="flex h-9 w-full items-center justify-center rounded-full bg-white text-xs font-bold text-black hover:bg-stone-100 transition"
                >
                  View Automation
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Section 2: All Content Table (Matching Screenshot 4) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-stone-900">All Content</h2>
          <p className="text-xs text-stone-500">
            View and manage all your Instagram posts and reels.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-100 bg-stone-50/50 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                <tr>
                  <th className="py-3 px-5">POST</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-center">VIEWS</th>
                  <th className="py-3 px-4 text-center">LIKES</th>
                  <th className="py-3 px-4 text-center">COMMENTS</th>
                  <th className="py-3 px-4 text-center">DM CLICKS</th>
                  <th className="py-3 px-4 text-center">CTR</th>
                  <th className="py-3 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/40 transition">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-800 to-indigo-950 flex items-center justify-center text-white">
                        <Play className="h-3.5 w-3.5 fill-white" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Hmm</p>
                        <p className="text-[11px] text-stone-400">Yesterday</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
                      Live
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-stone-400 font-medium">—</td>
                  <td className="py-4 px-4 text-center font-bold text-stone-900">0</td>
                  <td className="py-4 px-4 text-center font-bold text-stone-900">0</td>
                  <td className="py-4 px-4 text-center text-stone-400 font-medium">—</td>
                  <td className="py-4 px-4 text-center text-stone-400 font-medium">—</td>
                  <td className="py-4 px-5 text-right">
                    <Button

                      variant="outline"
                      size="sm"
                      className="h-7 rounded-lg text-xs font-semibold px-2.5 border-stone-200 text-stone-700 hover:bg-stone-100"
                    >
                      <Link href="/dashboard/automations">View Automation</Link>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
