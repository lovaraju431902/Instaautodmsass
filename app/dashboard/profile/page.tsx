"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  ExternalLink,
  Lock,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Save,
  Shield,
  Sparkles,
  Trash2,
  User,
  Zap,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"

// Custom inline Instagram Icon (avoiding lucide-react brand icon incompatibility)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

interface ProfileData {
  user: {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: string
  }
  workspace: {
    id: string
    name: string
    slug: string
    planTier: string
    subscriptionStatus: string
    currentPeriodEnd: string | null
    monthlyDmLimit: number
    dmsSentThisMonth: number
    maxIgAccounts: number
  }
  instagramAccounts: Array<{
    id: string
    instagramId: string
    username: string
    name: string | null
    profilePictureUrl: string | null
    followersCount: number
    status: string
    connectedAt: string
    postsCount: number
    automationsCount: number
  }>
  credits: {
    monthlyDmLimit: number
    dmsSentThisMonth: number
    dmsRemaining: number
    percentDmsUsed: number
    maxIgAccounts: number
    connectedIgAccounts: number
    accountsRemaining: number
    planTier: string
    subscriptionStatus: string
    renewalDate: string | null
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = React.useState<ProfileData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [signingOut, setSigningOut] = React.useState(false)
  const [displayName, setDisplayName] = React.useState("")
  const [statusMessage, setStatusMessage] = React.useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  // Instagram Connect Input state
  const [newUsername, setNewUsername] = React.useState("")
  const [connectingIg, setConnectingIg] = React.useState(false)
  const [disconnectingId, setDisconnectingId] = React.useState<string | null>(null)

  const fetchProfile = React.useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/user/profile")
      if (!res.ok) throw new Error("Failed to load profile")
      const json = await res.json()
      setData(json)
      setDisplayName(json.user?.name || "")
    } catch (err) {
      console.error("Profile load error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  // Handle Profile Name Update
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!displayName.trim()) return
    setSaving(true)
    setStatusMessage(null)

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName.trim() }),
      })

      if (!res.ok) throw new Error("Failed to save profile changes")
      const result = await res.json()
      setStatusMessage({ type: "success", text: "Profile details updated successfully!" })
      if (data) {
        setData({
          ...data,
          user: { ...data.user, name: result.user?.name || displayName },
        })
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to update profile" })
    } finally {
      setSaving(false)
    }
  }

  // Handle Sign Out
  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await authClient.signOut()
    } catch {
      // ignore
    } finally {
      router.push("/login")
    }
  }

  // Handle Instagram Connect
  const handleConnectInstagram = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUsername.trim()) return
    setConnectingIg(true)
    setStatusMessage(null)

    try {
      const res = await fetch("/api/instagram/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername.trim() }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to connect Instagram account")
      }

      setNewUsername("")
      setStatusMessage({
        type: "success",
        text: `Instagram account @${newUsername.replace(/^@/, "")} connected successfully!`,
      })
      await fetchProfile()
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to connect account" })
    } finally {
      setConnectingIg(false)
    }
  }

  // Handle Instagram Disconnect
  const handleDisconnect = async (accountId: string, username: string) => {
    if (!confirm(`Are you sure you want to disconnect @${username}? Automations on this account will be stopped.`)) {
      return
    }

    setDisconnectingId(accountId)
    setStatusMessage(null)

    try {
      const res = await fetch("/api/instagram/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to disconnect account")
      }

      setStatusMessage({
        type: "success",
        text: `@${username} has been disconnected.`,
      })
      await fetchProfile()
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to disconnect account" })
    } finally {
      setDisconnectingId(null)
    }
  }

  if (loading && !data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <RefreshCw className="h-8 w-8 animate-spin text-[hsl(340_82%_62%)]" />
        <p className="text-sm font-medium text-stone-500">Loading your profile & usage data...</p>
      </div>
    )
  }

  const user = data?.user
  const workspace = data?.workspace
  const credits = data?.credits
  const accounts = data?.instagramAccounts || []

  // Plan helpers
  const planTier = workspace?.planTier || "FREE"
  const isPro = planTier === "PRO"
  const isAgency = planTier === "AGENCY"

  // User Initials
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "CF"

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Profile & Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* 2. Top Header with Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-stone-950 sm:text-3xl">
              Profile & Workspace
            </h1>
            <Badge
              variant={isPro ? "coral" : isAgency ? "default" : "secondary"}
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5"
            >
              {planTier} PLAN
            </Badge>
          </div>
          <p className="text-xs text-stone-500 sm:text-sm mt-1">
            Manage your account credentials, connected Instagram profiles, plan subscription, and monthly DM quotas.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link href="/pricing">
            <Button
              className="h-10 rounded-xl bg-[hsl(340_82%_62%)] px-4 text-xs font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] active:scale-95 transition cursor-pointer"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5 fill-white text-white" />
              <span>{planTier === "FREE" ? "Upgrade to Pro" : "Change Plan"}</span>
            </Button>
          </Link>

          {/* Top Quick Log Out Button */}
          <Button
            variant="outline"
            disabled={signingOut}
            onClick={handleSignOut}
            className="h-10 rounded-xl border-stone-200 px-3.5 text-xs font-semibold text-stone-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
            title="Log out of CreatorFlow"
          >
            <LogOut className="mr-1.5 h-3.5 w-3.5" />
            <span>{signingOut ? "Logging out..." : "Log out"}</span>
          </Button>
        </div>
      </div>

      {/* Status Notification Banner */}
      {statusMessage && (
        <div
          className={`flex items-center justify-between rounded-2xl p-4 text-xs font-medium border ${
            statusMessage.type === "success"
              ? "border-emerald-200 bg-emerald-50/70 text-emerald-800"
              : "border-red-200 bg-red-50/70 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-stone-400 hover:text-stone-700 cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3. Four Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Plan Tier */}
        <Card className="rounded-2xl border-stone-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Subscription Plan</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[hsl(340_82%_62%/0.1)] text-[hsl(340_82%_55%)]">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-black text-stone-900 capitalize">{planTier} Tier</div>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <Check className="h-3 w-3" />
              <span>Status: {workspace?.subscriptionStatus || "Active"}</span>
            </p>
          </div>
        </Card>

        {/* Metric 2: Credits / DMs Remaining */}
        <Card className="rounded-2xl border-stone-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Monthly DMs Remaining</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-black text-stone-900">
              {credits?.dmsRemaining ?? 500}{" "}
              <span className="text-xs font-normal text-stone-400">/ {credits?.monthlyDmLimit ?? 500}</span>
            </div>
            <div className="mt-2">
              <Progress value={credits?.percentDmsUsed ?? 0} className="h-1.5" />
            </div>
          </div>
        </Card>

        {/* Metric 3: Connected IG Profiles */}
        <Card className="rounded-2xl border-stone-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Instagram Accounts</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <InstagramIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-black text-stone-900">
              {accounts.length}{" "}
              <span className="text-xs font-normal text-stone-400">
                / {credits?.maxIgAccounts ?? 1} connected
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-medium mt-0.5">
              {credits?.accountsRemaining === 0 ? "Slot limit reached" : `${credits?.accountsRemaining} slot available`}
            </p>
          </div>
        </Card>

        {/* Metric 4: API Webhook Status */}
        <Card className="rounded-2xl border-stone-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Webhook Engine</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-black text-emerald-600">Operational</div>
            <p className="text-[11px] text-stone-400 font-medium mt-0.5">
              Graph API v21.0 Connected
            </p>
          </div>
        </Card>
      </div>

      {/* 4. Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column (2 Cols): User Details & Connected Instagram Accounts */}
        <div className="space-y-8 lg:col-span-2">
          {/* CARD 1: User Details & Profile */}
          <Card className="rounded-3xl border-stone-200/80 bg-white shadow-xs overflow-hidden">
            <CardHeader className="border-b border-stone-100 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-stone-950">
                      Personal Profile Details
                    </CardTitle>
                    <CardDescription className="text-xs text-stone-500">
                      Your identity and contact information on CreatorFlow.
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="subtle" className="text-[11px] font-semibold">
                  Workspace Owner
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* Avatar and Summary Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16 rounded-2xl border-2 border-stone-100 shadow-xs">
                  {user?.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : null}
                  <AvatarFallback className="rounded-2xl bg-stone-900 text-lg font-black text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-stone-900">{user?.name}</h3>
                    {user?.emailVerified && (
                      <Badge variant="success" className="text-[10px] px-2 py-0 font-bold">
                        <Check className="h-2.5 w-2.5 mr-0.5" /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-stone-400" />
                    <span>{user?.email}</span>
                  </p>
                  <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-stone-400" />
                    <span>
                      Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Recently"}
                    </span>
                  </p>
                </div>
              </div>

              <Separator />

              {/* Edit Profile Form */}
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Display Name</label>
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your full name"
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Email Address</label>
                    <Input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="h-11 rounded-xl bg-stone-50 text-stone-500 cursor-not-allowed"
                    />
                    <p className="text-[10px] text-stone-400">Email is linked to authentication credentials.</p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={saving || displayName === user?.name}
                    className="h-10 rounded-xl bg-stone-900 px-4 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 cursor-pointer"
                  >
                    <Save className="mr-1.5 h-3.5 w-3.5" />
                    <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* CARD 2: Connected Instagram Profiles */}
          <Card className="rounded-3xl border-stone-200/80 bg-white shadow-xs overflow-hidden">
            <CardHeader className="border-b border-stone-100 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(340_82%_62%)] text-white">
                    <InstagramIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-stone-950">
                      Connected Instagram Profiles
                    </CardTitle>
                    <CardDescription className="text-xs text-stone-500">
                      Profiles connected to your workspace for automated comments, stories, and DMs.
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="subtle" className="text-[11px] font-semibold">
                  {accounts.length} / {credits?.maxIgAccounts ?? 1} Slots Used
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {accounts.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50/50 p-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(340_82%_62%/0.12)] text-[hsl(340_82%_55%)] mb-3">
                    <InstagramIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">No Instagram Account Connected</h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm">
                    Connect your Instagram Creator or Business account to begin automating DMs and replying to comments.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {accounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 hover:border-stone-300 transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <Avatar className="h-12 w-12 rounded-xl border border-stone-100 shadow-2xs">
                          {acc.profilePictureUrl ? (
                            <AvatarImage src={acc.profilePictureUrl} alt={acc.username} />
                          ) : null}
                          <AvatarFallback className="rounded-xl bg-[hsl(340_82%_62%/0.15)] font-bold text-xs text-[hsl(340_82%_55%)]">
                            {acc.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-stone-900">@{acc.username}</span>
                            <Badge variant="success" className="text-[10px] px-2 py-0 font-bold">
                              Connected
                            </Badge>
                          </div>
                          <p className="text-xs text-stone-400 mt-0.5">
                            {acc.followersCount.toLocaleString()} followers • {acc.postsCount} posts • {acc.automationsCount} automations
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <a
                          href={`https://instagram.com/${acc.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                          >
                            <ExternalLink className="mr-1 h-3 w-3 text-stone-400" />
                            <span>View IG</span>
                          </Button>
                        </a>

                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={disconnectingId === acc.id}
                          onClick={() => handleDisconnect(acc.id, acc.username)}
                          className="h-8 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          <span>{disconnectingId === acc.id ? "Disconnecting..." : "Disconnect"}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Connect Another Account Form */}
              <div className="rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-800">
                    Connect Instagram Profile
                  </h4>
                  {credits && credits.accountsRemaining === 0 && (
                    <Link href="/pricing" className="text-[10px] font-bold text-[hsl(340_82%_55%)] hover:underline">
                      Upgrade for more slots →
                    </Link>
                  )}
                </div>

                <form onSubmit={handleConnectInstagram} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs text-stone-400 font-bold">@</span>
                    <Input
                      placeholder="your_instagram_handle"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="h-9 pl-7 rounded-xl bg-white text-xs"
                      disabled={connectingIg || (credits?.accountsRemaining === 0)}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={connectingIg || !newUsername.trim() || (credits?.accountsRemaining === 0)}
                    className="h-9 rounded-xl bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 cursor-pointer"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    <span>{connectingIg ? "Connecting..." : "Connect Profile"}</span>
                  </Button>
                </form>
                <p className="text-[10px] text-stone-400">
                  Must be an Instagram Professional (Creator or Business) account connected to a Facebook Page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 Col): Plan & Subscription + Credits & Quota + Security & Log Out */}
        <div className="space-y-8">
          {/* CARD 3: Plan & Subscription Details */}
          <Card className="rounded-3xl border-2 border-[hsl(340_82%_62%/0.3)] bg-linear-to-b from-white to-[hsl(340_82%_62%/0.03)] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(340_82%_55%)]">
                  Current Membership
                </span>
                <h3 className="text-xl font-black text-stone-950 mt-0.5">
                  {planTier} Plan
                </h3>
              </div>
              <Badge variant="coral" className="font-bold text-xs">
                Active
              </Badge>
            </div>

            <p className="text-xs text-stone-500">
              {planTier === "FREE"
                ? "You are on the free starter plan. Upgrade to unlock high-volume DMs and advanced AI capabilities."
                : "Your professional plan unlocks automated growth, story triggers, and dedicated DM queues."}
            </p>

            <Separator />

            {/* Included Plan Features Checklist */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-[hsl(340_82%_62%)] shrink-0" />
                <span>{credits?.monthlyDmLimit ?? 500} Automated DMs / month</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-[hsl(340_82%_62%)] shrink-0" />
                <span>{credits?.maxIgAccounts ?? 1} Connected Instagram Account</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-[hsl(340_82%_62%)] shrink-0" />
                <span>Automated Post & Reel Comment Triggers</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-[hsl(340_82%_62%)] shrink-0" />
                <span>AI Auto-Reply Assistant Powered by OpenAI</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-[hsl(340_82%_62%)] shrink-0" />
                <span>Real-Time Meta Webhook Sync</span>
              </div>
            </div>

            <Link href="/pricing" className="block pt-2">
              <Button
                className="w-full h-11 rounded-2xl bg-[hsl(340_82%_62%)] font-bold text-xs text-white shadow-sm hover:bg-[hsl(340_82%_55%)] active:scale-95 transition cursor-pointer"
              >
                <Zap className="mr-1.5 h-3.5 w-3.5 fill-white text-white" />
                <span>Upgrade / Change Subscription</span>
              </Button>
            </Link>
          </Card>

          {/* CARD 4: Remaining Credits & Usage */}
          <Card className="rounded-3xl border-stone-200/80 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900">
                Credits & Quota Usage
              </h3>
              <span className="text-[10px] font-bold text-stone-400 uppercase">
                Monthly Cycle
              </span>
            </div>

            {/* DMs Sent Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-600">Monthly DMs Sent</span>
                <span className="text-stone-950 font-bold">
                  {credits?.dmsSentThisMonth ?? 0} / {credits?.monthlyDmLimit ?? 500}
                </span>
              </div>
              <Progress value={credits?.percentDmsUsed ?? 0} className="h-2" />
              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span>{credits?.dmsRemaining ?? 500} DMs remaining</span>
                <span className="font-bold text-stone-700">{credits?.percentDmsUsed ?? 0}% used</span>
              </div>
            </div>

            <Separator />

            {/* Instagram Account Slots Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-600">Account Slots</span>
                <span className="text-stone-950 font-bold">
                  {credits?.connectedIgAccounts ?? 0} / {credits?.maxIgAccounts ?? 1}
                </span>
              </div>
              <Progress
                value={
                  credits?.maxIgAccounts
                    ? Math.round(((credits?.connectedIgAccounts || 0) / credits.maxIgAccounts) * 100)
                    : 0
                }
                className="h-2"
              />
            </div>

            <div className="rounded-xl bg-stone-50 p-3 text-center">
              <p className="text-[11px] text-stone-500 font-medium">
                Need more DMs for an upcoming launch?
              </p>
              <Link
                href="/pricing"
                className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[hsl(340_82%_55%)] hover:underline"
              >
                <span>Buy Add-On DM Credits</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>

          {/* CARD 5: Security & Session Log Out Card */}
          <Card className="rounded-3xl border-stone-200/80 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Security & Session</h3>
                <p className="text-[11px] text-stone-400">Session ID & account sign-out</p>
              </div>
            </div>

            <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-3 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500">Status</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active Session
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500">User ID</span>
                <span className="font-mono text-stone-700 text-[10px]">{user?.id?.slice(0, 12)}...</span>
              </div>
            </div>

            {/* Big Prominent Log Out Button */}
            <Button
              variant="outline"
              disabled={signingOut}
              onClick={handleSignOut}
              className="w-full h-11 justify-center gap-2 rounded-2xl border-stone-200 text-xs font-bold text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700 shadow-2xs transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>{signingOut ? "Signing out of session..." : "Log Out of CreatorFlow"}</span>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
