"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Lock, Mail, User, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { signUpSchema } from "@/lib/validations/auth"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [agreedToTerms, setAgreedToTerms] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [globalError, setGlobalError] = React.useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = React.useState<{
    name?: string
    email?: string
    password?: string
    terms?: string
  }>({})

  // Calculate visual password strength score
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0
    let score = 0
    if (pass.length >= 8) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1
    return score
  }

  const strength = getPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError(null)
    setFieldErrors({})

    // 1. Zod schema validation
    const validation = signUpSchema.safeParse({
      name,
      email,
      password,
      terms: agreedToTerms,
    })

    if (!validation.success) {
      const formattedErrors: { name?: string; email?: string; password?: string; terms?: string } = {}
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as "name" | "email" | "password" | "terms"
        if (!formattedErrors[fieldName]) {
          formattedErrors[fieldName] = issue.message
        }
      })
      setFieldErrors(formattedErrors)
      return
    }

    // 2. Better Auth registration
    setLoading(true)
    try {
      const res = await authClient.signUp.email({
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
      })

      if (res.error) {
        setGlobalError(
          res.error.message ||
          "Unable to create account. An account with this email may already exist."
        )
        setLoading(false)
        return
      }

      setSuccess(true)
      document.cookie = "instadm_ig_connected=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      setTimeout(() => {
        router.push("/connect-instagram")
      }, 700)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create account. Please check your connection."
      setGlobalError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      mode="signup"
      title="Create your account"
      subtitle="Start automating your Instagram DMs and comment replies in minutes."
      switchText="Already haveaa an account?"
      switchLinkText="Sign in"
      switchHref="/login"
    >
      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-center space-y-2 animate-in fade-in duration-200">
          <div className="flex justify-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-sm font-bold text-emerald-900">Account Created Successed !</h3>
          <p className="text-xs text-emerald-700">
            Welcome to InstaDM, {name}! Your 15-day free trial has been activated. Redirecting...
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

          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-stone-700">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }))
                }}
                placeholder="Sarah Jenkins"
                className={`h-11 pl-10 pr-4 rounded-xl border-stone-200/90 bg-stone-50/50 focus:bg-white focus:border-stone-900 text-xs sm:text-sm transition-all ${fieldErrors.name ? "border-rose-400 focus:border-rose-500" : ""
                  }`}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-[11px] text-rose-600 font-medium">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email Address Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-stone-700">
              Email address
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
                placeholder="sarah@creatorbrand.com"
                className={`h-11 pl-10 pr-4 rounded-xl border-stone-200/90 bg-stone-50/50 focus:bg-white focus:border-stone-900 text-xs sm:text-sm transition-all ${fieldErrors.email ? "border-rose-400 focus:border-rose-500" : ""
                  }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-[11px] text-rose-600 font-medium">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-stone-700">
              Create Password
            </label>
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
                placeholder="At least 8 characters with 1 number & 1 capital"
                className={`h-11 pl-10 pr-10 rounded-xl border-stone-200/90 bg-stone-50/50 focus:bg-white focus:border-stone-900 text-xs sm:text-sm transition-all ${fieldErrors.password ? "border-rose-400 focus:border-rose-500" : ""
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

            {/* Inline Password Error */}
            {fieldErrors.password && (
              <p className="text-[11px] text-rose-600 font-medium">{fieldErrors.password}</p>
            )}

            {/* Dynamic Password Strength Meter */}
            {password.length > 0 && (
              <div className="space-y-1 pt-1">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-1 flex-1 rounded-full transition-colors ${step <= strength
                        ? strength <= 1
                          ? "bg-rose-500"
                          : strength <= 2
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        : "bg-stone-200"
                        }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>8+ chars, 1 uppercase, 1 number</span>
                  <span className="font-semibold">
                    {strength <= 1
                      ? "Weak"
                      : strength <= 2
                        ? "Fair"
                        : strength === 3
                          ? "Good"
                          : "Strong"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="space-y-1 pt-1">
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked)
                  if (fieldErrors.terms) setFieldErrors((prev) => ({ ...prev, terms: undefined }))
                }}
                className="mt-0.5 h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer accent-stone-900"
              />
              <label htmlFor="terms" className="text-xs text-stone-600 cursor-pointer select-none leading-relaxed">
                I agree to the{" "}
                <span className="font-semibold text-stone-900 underline underline-offset-2">Terms of Service</span> and{" "}
                <span className="font-semibold text-stone-900 underline underline-offset-2">Privacy Policy</span>. No credit card required.
              </label>
            </div>
            {fieldErrors.terms && (
              <p className="text-[11px] text-rose-600 font-medium pl-6">{fieldErrors.terms}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="group relative h-11 w-full rounded-xl bg-stone-900 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-stone-800 hover:shadow-lg disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating account with Better Auth...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            )}
          </Button>

          {/* Value callout pill */}
          <div className="rounded-xl border border-stone-200/80 bg-stone-50/80 px-3 py-2 text-center text-[11px] text-stone-500">
            Includes <span className="font-semibold text-stone-800">14 days full access</span> to all triggers, comment automations & analytics.
          </div>
        </form>
      )}
    </AuthShell>
  )
}
