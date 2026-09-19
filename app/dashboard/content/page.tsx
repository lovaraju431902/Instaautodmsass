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
    account: { username: string; followersCount: number; profilePictureUrl?: string } | null
    recentPost: {
      caption?: string
      mediaType?: string
      mediaUrl?: string
      thumbnailUrl?: string
      likesCount?: number
      commentsCount?: number
      postedAt?: string
    } | null
    posts?: Array<{
      id: string
      mediaId: string
      mediaType: string
      caption: string
      mediaUrl?: string
      thumbnailUrl?: string
      permalink?: string
      likesCount: number
      commentsCount: number
      postedAt: string
    }>
  } | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const loadContent = async (refresh = false) => {
    try {
      const url = refresh ? "/api/dashboard/stats?refresh=true" : "/api/dashboard/stats"
      const res = await fetch(url)
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
    loadContent(true)
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
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-rose-500" : ""}`} />
          <span>{isRefreshing ? "Syncing Meta..." : "Refresh"}</span>
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

        {loading ? (
          <div className="flex h-44 w-full max-w-md items-center justify-center rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin text-stone-400" />
              <p className="text-xs text-stone-400 font-medium">Loading Instagram media...</p>
            </div>
          </div>
        ) : !hasAccount ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center space-y-3 max-w-md shadow-2xs">
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
                  {data?.account?.profilePictureUrl ? (
                    <img
                      src={data.account.profilePictureUrl}
                      alt={username}
                      className="h-6 w-6 rounded-full object-cover border border-stone-700"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-700 text-[10px] font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-semibold truncate max-w-[130px]">{username}</span>
                </div>
                <MoreHorizontal className="h-4 w-4 text-stone-400" />
              </div>

              {/* Video/Image Canvas */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-900 flex items-center justify-center">
                {data?.recentPost?.thumbnailUrl || data?.recentPost?.mediaUrl ? (
                  <img
                    src={data.recentPost.thumbnailUrl || data.recentPost.mediaUrl}
                    alt={data.recentPost.caption || "Reel"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-sky-700 via-blue-900 to-emerald-950 flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-white">
                      <Play className="h-4 w-4 fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Bar */}
              <div className="flex items-center justify-between pt-3 text-stone-300">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Heart className="h-4 w-4 hover:text-red-500 cursor-pointer" />
                    <span>{data?.recentPost?.likesCount ?? 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <MessageCircle className="h-4 w-4 cursor-pointer" />
                    <span>{data?.recentPost?.commentsCount ?? 0}</span>
                  </div>
                  <Send className="h-4 w-4 cursor-pointer" />
                </div>
                <Bookmark className="h-4 w-4 cursor-pointer" />
              </div>

              {/* Caption */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-white line-clamp-2">
                  {username} <span className="font-normal text-stone-300">| {data?.recentPost?.caption || "Automation active"}</span>
                </p>
                <p className="text-[10px] font-medium text-emerald-400 uppercase mt-1">META GRAPH API LIVE</p>
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
                {!data?.posts || data.posts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-xs text-stone-500 font-medium">
                      No posts or reels found yet on this Instagram account. Once you publish content on Instagram, it will appear here.
                    </td>
                  </tr>
                ) : (
                  data.posts.map((post) => {
                    const formattedDate = new Date(post.postedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                    return (
                      <tr key={post.id} className="hover:bg-stone-50/40 transition">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            {post.thumbnailUrl || post.mediaUrl ? (
                              <img
                                src={post.thumbnailUrl || post.mediaUrl}
                                alt={post.caption}
                                className="h-10 w-10 shrink-0 overflow-hidden rounded-xl object-cover border border-stone-200 shadow-2xs"
                              />
                            ) : (
                              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-800 to-indigo-950 flex items-center justify-center text-white">
                                <Play className="h-3.5 w-3.5 fill-white" />
                              </div>
                            )}
                            <div className="max-w-xs truncate">
                              <p className="font-bold text-stone-900 truncate">
                                {post.caption || "Instagram Media"}
                              </p>
                              <p className="text-[11px] text-stone-400">{formattedDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
                            Live
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-stone-400 font-medium">—</td>
                        <td className="py-4 px-4 text-center font-bold text-stone-900">{post.likesCount}</td>
                        <td className="py-4 px-4 text-center font-bold text-stone-900">{post.commentsCount}</td>
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
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
