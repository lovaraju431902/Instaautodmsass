import * as React from "react"
import Link from "next/link"
import { ArrowRight, Send, Star } from "lucide-react"

// Clean SVG Icons for brand socials
function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function ThreadsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c4.566 0 8.414-3.056 9.61-7.228M15.5 13.5c0-1.933-1.567-3.5-3.5-3.5-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5c1.438 0 2.684-.867 3.224-2.1" />
      <path d="M12 8.5c2.485 0 4.5 2.015 4.5 4.5 0 3-2 5-4.5 5-2.2 0-4-1.8-4-4s1.8-4 4-4Z" />
    </svg>
  )
}

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-stone-400 selection:bg-[hsl(340_82%_62%/0.3)] selection:text-white border-t border-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Main Grid: Left Brand Block + Right Navigation Columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Brand Identity Block (4 cols) */}
          <div className="lg:col-span-4">
            {/* Logo Pill Badge */}
            <Link href="/" className="inline-flex items-center gap-2 group outline-none">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(340_82%_62%)] px-3.5 py-1 text-xs font-extrabold text-white shadow-sm transition-transform group-hover:scale-105">
                <Send className="h-3.5 w-3.5 -rotate-12 fill-white" />
                <span className="tracking-tight">instadm</span>
              </div>
            </Link>

            {/* Headline */}
            <h3 className="mt-6 text-xl font-bold tracking-tight text-white sm:text-2xl leading-snug">
              Instagram DM and Comment Automation for Creators, Brands & Agencies
            </h3>

            {/* Paragraph */}
            <p className="mt-4 text-xs leading-relaxed text-stone-400 max-w-sm">
              Auto-reply to comments, send links in DMs, and capture leads. Turn
              Instagram conversations into sales, automatically.
            </p>

            {/* Social Icons Row */}
            <div className="mt-6 flex items-center gap-2.5">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/80 text-stone-300 transition-all hover:border-stone-700 hover:bg-stone-800 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>

              {/* Threads */}
              <a
                href="https://threads.net"
                target="_blank"
                rel="noreferrer"
                aria-label="Threads"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/80 text-stone-300 transition-all hover:border-stone-700 hover:bg-stone-800 hover:text-white"
              >
                <ThreadsIcon className="h-4 w-4" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/80 text-stone-300 transition-all hover:border-stone-700 hover:bg-stone-800 hover:text-white"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/80 text-stone-300 transition-all hover:border-stone-700 hover:bg-stone-800 hover:text-white"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>

              {/* Reviews / Star */}
              <a
                href="#reviews"
                aria-label="Reviews"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/80 text-stone-300 transition-all hover:border-stone-700 hover:bg-stone-800 hover:text-white"
              >
                <Star className="h-4 w-4 fill-stone-300" />
              </a>
            </div>
          </div>

          {/* Right Navigation Columns Grid (8 cols) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:gap-x-8">
              {/* Column 1: SOLUTIONS & COMPARE */}
              <div className="space-y-10">
                {/* Top Tier: SOLUTIONS */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                    SOLUTIONS
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-xs">
                    {[
                      "Content Creators",
                      "Affiliate Creators",
                      "Coaches & Educators",
                      "Creative Professionals",
                      "Service Businesses",
                      "Shopify Stores",
                      "WooCommerce Stores",
                      "PrestaShop Stores",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#use-cases"
                          className="text-stone-400 transition-colors hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Tier: COMPARE */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                    COMPARE
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-xs">
                    {[
                      "vs ManyChat",
                      "vs Stan AutoDM",
                      "vs Linktree AutoDM",
                      "vs MobileMonkey",
                      "vs SuperProfile",
                      "vs LinkDM",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#features"
                          className="text-stone-400 transition-colors hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                    <li className="pt-1">
                      <a
                        href="#features"
                        className="inline-flex items-center gap-1 font-semibold text-[hsl(340_82%_62%)] hover:underline"
                      >
                        <span>View All Comparisons</span>
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 2: USE CASES & INDUSTRIES */}
              <div className="space-y-10">
                {/* Top Tier: USE CASES */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                    USE CASES
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-xs">
                    {[
                      "Auto-Respond to Comments",
                      "Send Links in DMs",
                      "Collect Emails",
                      "Drive Conversions",
                      "Grow Followers",
                      "Story Replies",
                      "Free DM Automation",
                      "Engagement Automation",
                      "Monetize Viral Posts",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#features"
                          className="text-stone-400 transition-colors hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Tier: INDUSTRIES */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                    INDUSTRIES
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-xs">
                    {[
                      "Healthcare & Wellness",
                      "Real Estate",
                      "Education",
                      "Travel & Hospitality",
                      "Retail",
                      "Music & Entertainment",
                      "Wedding & Events",
                      "Pet Industry",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#use-cases"
                          className="text-stone-400 transition-colors hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: FREE INSTAGRAM TOOLS & COMPANY */}
              <div className="space-y-10">
                {/* Top Tier: FREE INSTAGRAM TOOLS */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                    FREE INSTAGRAM TOOLS
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-xs">
                    {[
                      "Instagram Engagement Calculator",
                      "Hashtag Generator",
                      "Instagram Caption Generator",
                      "Instagram Fancy Fonts Generator",
                      "Instagram Chat Link Generator",
                      "Instagram Handle Checker",
                      "Instagram Money Calculator",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#features"
                          className="text-stone-400 transition-colors hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                    <li className="pt-1">
                      <a
                        href="#features"
                        className="inline-flex items-center gap-1 font-semibold text-[hsl(340_82%_62%)] hover:underline"
                      >
                        <span>View All Tools</span>
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Bottom Tier: COMPANY */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                    COMPANY
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-xs">
                    {[
                      { name: "About", href: "#" },
                      { name: "What's New", href: "#" },
                      { name: "Pricing", href: "#pricing" },
                      { name: "Reviews", href: "#testimonials" },
                      { name: "Blog", href: "#" },
                      { name: "Contact", href: "#faq" },
                      { name: "Careers", href: "#" },
                    ].map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-stone-400 transition-colors hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 4: RESOURCES & PARTNERSHIPS */}
              <div className="space-y-10">
                {/* Top Tier: RESOURCES */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                    RESOURCES
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-xs">
                    {[
                      "How-To Guides",
                      "Video Course",
                      "DM Campaign Examples",
                      "Instagram Glossary",
                      "Help Center",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#faq"
                          className="text-stone-400 transition-colors hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Tier: PARTNERSHIPS */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                    PARTNERSHIPS
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-xs">
                    {[
                      "Affiliate Program",
                      "Agency Program",
                      "DesignerBox (AI Creative Studio)",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#pricing"
                          className="text-stone-400 transition-colors hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Copyright & Meta Disclaimer Row */}
        <div className="mt-16 border-t border-stone-800/80 pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Left Bottom: Copyright & Legal Links */}
            <div className="space-y-3">
              <div className="text-sm font-bold text-white">
                &copy; {new Date().getFullYear()} InstaDM. All rights reserved.
              </div>

              <div className="text-[11px] text-stone-500">
                Meta Tech Provider • InstaDM Labs, S.L.
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-stone-400">
                <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
                <span>•</span>
                <a href="#terms" className="hover:text-white transition-colors">Terms</a>
                <span>•</span>
                <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
                <span>•</span>
                <a href="#dpa" className="hover:text-white transition-colors">DPA</a>
                <span>•</span>
                <a href="#security" className="hover:text-white transition-colors">Security</a>
                <span>•</span>
                <a href="#refunds" className="hover:text-white transition-colors">Refunds</a>
                <span>•</span>
                <a href="#affiliate" className="hover:text-white transition-colors">Affiliate Terms</a>
                <span>•</span>
                <a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a>
                <span>•</span>
                <a href="#ai-info" className="hover:text-white transition-colors">AI Info</a>
              </div>
            </div>

            {/* Right Bottom: Official Platform Compliance Disclaimer */}
            <div className="max-w-2xl text-[11px] leading-relaxed text-stone-500">
              <p>
                Instagram is a trademark of Meta Platforms, Inc. InstaDM is not affiliated
                with, endorsed by, or sponsored by Meta Platforms, Inc. InstaDM uses
                Instagram&apos;s official Graph API. Performance results shown are based on
                aggregated user data. Individual results vary based on audience size, niche,
                content quality, and engagement rates. Users are responsible for complying with
                Instagram&apos;s Terms of Service and Community Guidelines. Instagram/Meta may
                change API features, rate limits, or terms at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}