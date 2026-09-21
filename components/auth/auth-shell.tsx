"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, MessageCircle, Send, Sparkles, Star } from "lucide-react"
import { SocialAuthButtons } from "./social-auth-buttons"

interface AuthShellProps {
  mode: "signin" | "signup"
  title: string
  subtitle: string
  switchText: string
  switchLinkText: string
  switchHref: string
  children: React.ReactNode
}

// Clean SVG Meta loop icon for authentic partner branding
function MetaLoopIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 8.544c-1.879 0-3.328 1.138-4.215 2.502-.85 1.306-1.308 2.87-1.308 4.298 0 1.637.595 2.923 1.657 3.738.922.709 2.128.974 3.327.974 1.83 0 3.308-.853 4.238-2.227.928 1.374 2.408 2.227 4.238 2.227 1.199 0 2.405-.265 3.327-.974 1.062-.815 1.657-2.101 1.657-3.738 0-1.428-.458-2.992-1.308-4.298-.887-1.364-2.336-2.502-4.215-2.502-1.782 0-3.232.812-4.144 2.138-.912-1.326-2.362-2.138-4.144-2.138zm-3.085 6.726c0-.986.326-2.115.895-3.011.603-.949 1.439-1.487 2.19-1.487.899 0 1.583.743 1.897 1.828.163.561.229 1.258.229 2.057 0 .899-.172 1.956-.583 2.686-.445.791-1.049 1.218-1.743 1.218-.846 0-1.472-.519-1.77-1.121-.299-.603-.415-1.37-.415-2.17zm9.957 0c0 .8-.116 1.567-.415 2.17-.298.602-.924 1.121-1.77 1.121-.694 0-1.298-.427-1.743-1.218-.411-.73-.583-1.787-.583-2.686 0-.799.066-1.496.229-2.057.314-1.085.998-1.828 1.897-1.828.751 0 1.587.538 2.19 1.487.569.896.895 2.025.895 3.011z" />
    </svg>
  )
}

export function AuthShell({
  mode,
  title,
  subtitle,
  switchText,
  switchLinkText,
  switchHref,
  children,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen bg-[hsl(40_20%_98%)] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 text-foreground">
      {/* Ambient background glow (Warm luxury, light theme) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(235,59,112,0.06)_0,rgba(255,255,255,0)_100%)]" />

      {/* Main Container Card */}
      <div className="relative mx-auto my-auto w-full max-w-5xl rounded-[32px] sm:rounded-[36px] border border-stone-200/90 bg-white shadow-xl shadow-stone-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: BRAND SHOWCASE (Reference style, light aesthetic)            */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 bg-gradient-to-br from-stone-50 via-stone-100/60 to-warm-stone/30 border-b lg:border-b-0 lg:border-r border-stone-200/80 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
          {/* Top: Back to home button */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs backdrop-blur-sm transition-all hover:bg-white hover:text-stone-900 hover:shadow-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to home</span>
            </Link>

            {/* Subtle brand mark */}

          </div>

          {/* Middle: Headline & Value Prop */}
          <div className="my-8 lg:my-10 space-y-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(340_82%_62%/0.12)] px-3 py-1 text-[11px] font-bold text-[hsl(340_82%_55%)] uppercase tracking-wider">
              <span>Creator-First Automation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-[1.15]">
              Get More From <br />
              <span className="text-[hsl(340_82%_55%)]">Your DMs.</span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              Reply to DMs, send links, and capture leads. Built for creators,
              brands, and agencies who want results, not complexity.
            </p>

            {/* Simulated Live Automation Card */}
            <div className="rounded-2xl border border-stone-200/80 bg-white/95 p-4 shadow-sm backdrop-blur-xs space-y-3">
              <div className="flex items-center justify-between text-[11px] text-stone-500 pb-2 border-b border-stone-100">
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Workflow
                </span>
                <span className="text-[10px] text-stone-400">0.8s avg reply</span>
              </div>

              {/* Simulated reel comment */}
              <div className="flex items-start gap-2 text-xs">
                <div className="h-6 w-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-600 shrink-0">
                  @
                </div>
                <div className="bg-stone-100/80 rounded-xl px-2.5 py-1.5 text-[11px] text-stone-700">
                  <span className="font-semibold text-stone-900">@alexa_style: </span>
                  &ldquo;LINK for the shoes please! 🙌&rdquo;
                </div>
              </div>

              {/* Simulated auto DM */}
              <div className="flex items-start gap-2 text-xs pl-4">
                <div className="h-6 w-6 rounded-full bg-stone-900 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                  <Send className="h-3 w-3 -rotate-12 text-[hsl(340_82%_62%)]" />
                </div>
                <div className="bg-[hsl(340_82%_62%/0.08)] border border-[hsl(340_82%_62%/0.15)] rounded-xl px-2.5 py-1.5 text-[11px] text-stone-800">
                  <span>Hey Alexa! Here is your private 20% off discount link: </span>
                  <span className="font-semibold text-[hsl(340_82%_55%)] underline block mt-0.5">
                    instadm.link/shoes-sale
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Social Proof & Meta Trust Badge */}
          <div className="pt-4 border-t border-stone-200/70 space-y-3">
            <div className="flex items-center justify-between">
              {/* Meta Tech Provider badge */}
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white">
                  <MetaLoopIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold text-stone-900">Meta</div>
                  <div className="text-[9px] font-medium text-stone-500">Tech Provider</div>
                </div>
              </div>

              {/* Avatars Stack */}
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
                  ].map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={src}
                      alt="Creator"
                      className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-2xs"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold text-stone-600">
                    Trusted by <span className="text-stone-900 font-bold">+20,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: AUTH FORM CONTAINER                                         */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center max-w-md mx-auto w-full">
          {/* Top Brand Pill Header */}
          <div className="text-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-stone-50 px-3 py-1 text-xs font-bold text-stone-900 shadow-2xs transition-transform hover:scale-105"
            >
              <div className="h-4 w-4 rounded-full bg-stone-900 flex items-center justify-center">
                <Send className="h-2.5 w-2.5 -rotate-12 text-white" />
              </div>
              <span>InstaDM</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(340_82%_62%)]" />
            </Link>

            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              {title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-500">
              {subtitle}
            </p>
          </div>

          {/* Social Auth Buttons (Google & GitHub) */}
          <div className="mb-5">
            <SocialAuthButtons />
          </div>

          {/* Divider */}
          <div className="relative mb-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-stone-400">
              or continue with email
            </span>
          </div>

          {/* Form Content (Injected by Page) */}
          {children}

          {/* Switch Mode Link (e.g. Don't have an account? Sign up) */}
          <div className="mt-6 text-center text-xs text-stone-500">
            <span>{switchText} </span>
            <Link
              href={switchHref}
              className="font-semibold text-stone-900 hover:text-[hsl(340_82%_55%)] underline underline-offset-4 transition-colors"
            >
              {switchLinkText}
            </Link>
          </div>

          {/* Mini Terms and Privacy Links at Bottom */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-center gap-4 text-[11px] text-stone-400">
            <Link href="/" className="hover:text-stone-600 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-stone-600 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-500">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              256-Bit SSL
            </span>
          </div>
        </div>
      </div>

      {/* Page Footer Copyright */}
      <footer className="mt-6 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} InstaDM Inc. All rights reserved. Meta Tech Provider.
      </footer>
    </div>
  )
}
