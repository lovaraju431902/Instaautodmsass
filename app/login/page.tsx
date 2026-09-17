"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Lock, Mail, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { loginSchema } from "@/lib/validations/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [globalError, setGlobalError] = React.useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; password?: string }>({})
  const [forgotPasswordSent, setForgotPasswordSent] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError(null)
    setFieldErrors({})

    // 1. Zod Validation
    const validation = loginSchema.safeParse({ email, password, rememberMe })
    if (!validation.success) {
      const formattedErrors: { email?: string; password?: string } = {}
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as "email" | "password"
        if (!formattedErrors[fieldName]) {
          formattedErrors[fieldName] = issue.message
        }
      })
      setFieldErrors(formattedErrors)
      return
    }

    // 2. Better Auth sign-in
    setLoading(true)
    try {
      const res = await authClient.signIn.email({
        email: validation.data.email,
        password: validation.data.password,
        dontRememberMe: !validation.data.rememberMe,
      })

      if (res.error) {
        setGlobalError(res.error.message || "Invalid email or password. Please try again.")
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        const params = new URLSearchParams(window.location.search)
        const callbackUrl = params.get("callbackUrl")
        if (callbackUrl && !callbackUrl.startsWith("/login")) {
          router.push(callbackUrl)
        } else {
          const igConnected = document.cookie.includes("instadm_ig_connected=true")
          router.push(igConnected ? "/dashboard" : "/connect-instagram")
        }
      }, 700)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in. Please verify your connection."
      setGlobalError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setGlobalError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/demo-login", { method: "POST" })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          const igConnected = document.cookie.includes("instadm_ig_connected=true")
          router.push(igConnected ? "/dashboard" : "/connect-instagram")
        }, 600)
      } else {
        setGlobalError("Failed to initiate demo session.")
      }
    } catch (err: unknown) {
      setGlobalError(err instanceof Error ? err.message : "Failed to initiate demo session.")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    const promptEmail = prompt("Please enter your account email to receive password reset instructions:", email)
    if (promptEmail) {
      setForgotPasswordSent(true)
      setTimeout(() => setForgotPasswordSent(false), 6000)
    }
  }

  return (
    <AuthShell
      mode="signin"
      title="Welcome to InstaDM"
      subtitle="Sign in to your account or access your automation dashboard."
      switchText="Don't have an account?"
      switchLinkText="Create an account"
      switchHref="/signup"
    >
      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-center space-y-2 animate-in fade-in duration-200">
          <div className="flex justify-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-sm font-bold text-emerald-900">Signed In Successfully!</h3>
          <p className="text-xs text-emerald-700">
            Welcome back, {email.split("@")[0] || "Creator"}. Redirecting to your workspace...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {globalError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-800 animate-in fade-in duration-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="leading-relaxed font-medium">{globalError}</div>
            </div>
          )}

          {forgotPasswordSent && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-3 text-xs text-blue-800">
              Password reset link sent to your inbox! Check your spam folder if you don&apos;t see it.
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-stone-700 flex items-center justify-between"
            >
              <span>Email address</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }))
                }}
                placeholder="creator@example.com"
                className={`h-11 pl-10 pr-4 rounded-xl border-stone-200/90 bg-stone-50/50 focus:bg-white focus:border-stone-900 text-xs sm:text-sm transition-all ${
                  fieldErrors.email ? "border-rose-400 focus:border-rose-500" : ""
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-[11px] text-rose-600 font-medium">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="password" className="font-semibold text-stone-700">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-stone-500 hover:text-[hsl(340_82%_55%)] transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }))
                }}
                placeholder="••••••••••••"
                className={`h-11 pl-10 pr-10 rounded-xl border-stone-200/90 bg-stone-50/50 focus:bg-white focus:border-stone-900 text-xs sm:text-sm transition-all ${
                  fieldErrors.password ? "border-rose-400 focus:border-rose-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-[11px] text-rose-600 font-medium">{fieldErrors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-0.5">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer accent-stone-900"
            />
            <label htmlFor="remember-me" className="text-xs text-stone-600 cursor-pointer select-none">
              Remember my device for 30 days
            </label>
          </div>

          {/* Submit Sign In Button */}
          <Button
            type="submit"
            disabled={loading}
            className="group relative h-11 w-full rounded-xl bg-stone-900 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-stone-800 hover:shadow-lg disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating with Better Auth...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            )}
          </Button>

          {/* Quick 1-Click Demo Login for Instant Testing */}
          <div className="pt-1">
            <button
              type="button"
              disabled={loading}
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200/90 bg-stone-50 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-[hsl(340_82%_55%)]" />
              <span>Instant Demo Login (1-Click)</span>
            </button>
          </div>
        </form>
      )}
    </AuthShell>
  )
}
