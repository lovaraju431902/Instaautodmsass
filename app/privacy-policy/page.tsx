import * as React from "react"
import Link from "next/link"
import {
  Shield,
  Lock,
  Key,
  Database,
  Trash2,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  Server,
  MessageSquare,
  Sparkles,
} from "lucide-react"

export const metadata = {
  title: "Privacy Policy | InstaDM - nextzshop.online",
  description:
    "Privacy Policy for InstaDM (nextzshop.online). Learn how we collect, use, process, and protect your Instagram account data, direct messages, comments, and Meta API tokens.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-rose-500/20 selection:text-rose-900">
      {/* Top Sticky Navigation */}
      <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-900 transition hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight">InstaDM</span>
            <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
              nextzshop.online
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 transition hover:text-stone-950"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/login"
              className="hidden sm:inline-flex rounded-xl bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-stone-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Header Hero */}
        <div className="space-y-4 border-b border-stone-200 pb-8 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Official Meta Platform Compliance &amp; Data Privacy Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950">
            Privacy Policy
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-stone-600">
            This Privacy Policy explains how <strong>InstaDM</strong> (operated at{" "}
            <span className="font-semibold text-stone-900">https://nextzshop.online</span>,
            referred to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses,
            stores, processes, and protects your information when you connect and automate your
            Instagram Creator or Business account.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-stone-500">
            <span>
              <strong>Effective Date:</strong> January 1, 2026
            </span>
            <span>•</span>
            <span>
              <strong>Last Updated:</strong> September 18, 2026
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Publicly Accessible Document</span>
          </div>
        </div>

        {/* Quick Summary Highlights */}
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mb-3">
              <Key className="h-5 w-5" />
            </div>
            <h2 className="text-sm font-bold text-stone-900">Zero Password Storing</h2>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              We never see or store your Instagram password. Authentication is completed securely
              via official Meta OAuth.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-sm font-bold text-stone-900">Encrypted Meta Tokens</h2>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              All Instagram User Access Tokens are stored server-side with encryption at rest and
              are never exposed to browsers.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-3">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 className="text-sm font-bold text-stone-900">Instant Data Deletion</h2>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              Disconnecting your account immediately wipes all tokens and automations. Deletion
              requests are processed within 48h.
            </p>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-12 text-sm leading-relaxed text-stone-700">
          {/* Section 1: Information We Collect */}
          <section id="information-collected" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-xs font-bold text-white">
                1
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-950">
                Information We Collect
              </h2>
            </div>

            <p>
              When you use InstaDM at <code>https://nextzshop.online</code>, we collect only the
              minimal data necessary to provide our automated direct messaging and comment reply
              services:
            </p>

            <div className="space-y-3 pl-2">
              <div className="rounded-xl border border-stone-200 bg-white p-4">
                <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  A. Account &amp; Profile Information
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-xs text-stone-600">
                  <li>Your InstaDM account registration details (email address, name).</li>
                  <li>
                    Instagram Business/Creator Account details retrieved via Meta Graph API:
                    Instagram Scoped ID (<code>id</code>), username (<code>username</code>), profile name,
                    profile picture URL, and follower count.
                  </li>
                  <li>
                    Metadata for posts and reels that you choose to automate (e.g. Media ID,
                    permalink, caption snippet).
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-4">
                <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  B. Direct Messages and Comments Interaction Data
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-xs text-stone-600">
                  <li>
                    <strong>Comment Activity:</strong> Comment ID, comment text, timestamp, post ID,
                    and the commenter&apos;s Instagram-scoped ID (IGSID) and public handle.
                  </li>
                  <li>
                    <strong>Direct Messages:</strong> Incoming message text received via webhook,
                    message ID, sender IGSID, and timestamp.
                  </li>
                  <li>
                    <strong>Automation Delivery Status:</strong> Outgoing automated reply text,
                    destination link clicks, and API delivery success/failure logs.
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-4">
                <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  C. Technical &amp; Diagnostic Information
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-xs text-stone-600">
                  <li>
                    IP addresses, browser type, device information, and error logs collected
                    strictly for security auditing, fraud prevention, and uptime diagnostics.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Use of Instagram Account Data and Meta Access Tokens */}
          <section id="access-tokens" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-xs font-bold text-white">
                2
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-950">
                How We Use Instagram Account Data &amp; Access Tokens
              </h2>
            </div>

            <p>
              We connect to Instagram using the official <strong>Meta Instagram Business Login</strong>{" "}
              flow. We adhere strictly to the{" "}
              <a
                href="https://developers.facebook.com/terms/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-rose-600 hover:underline inline-flex items-center gap-0.5"
              >
                Meta Platform Terms <ExternalLink className="h-3 w-3" />
              </a>{" "}
              and Developer Policies:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-stone-600">
              <li>
                <strong>Meta OAuth Access Tokens:</strong> When you connect your account, Meta issues
                an authorization code that our secure server exchanges for an encrypted access token.
                This token is stored strictly in our protected database and is used solely to execute
                the automations you explicitly create.
              </li>
              <li>
                <strong>Scope Limitation:</strong> We only request permissions necessary for core
                app functionality:
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-md border border-stone-200 bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-stone-800">
                    instagram_business_basic
                  </span>
                  <span className="rounded-md border border-stone-200 bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-stone-800">
                    instagram_business_manage_messages
                  </span>
                  <span className="rounded-md border border-stone-200 bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-stone-800">
                    instagram_business_manage_comments
                  </span>
                </div>
              </li>
              <li>
                <strong>No Unauthorized Actions:</strong> We will NEVER use your access token to follow
                or unfollow accounts, like random media, read private personal non-business chats,
                or post unapproved content.
              </li>
              <li>
                <strong>No Selling of Data:</strong> We NEVER sell, rent, lease, or broker your personal
                or Instagram data to third parties, advertising networks, or data brokers.
              </li>
            </ul>
          </section>

          {/* Section 3: Processing DMs & Comments */}
          <section id="processing-dms-comments" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-xs font-bold text-white">
                3
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-950">
                How DMs and Comments Data Are Processed
              </h2>
            </div>

            <p>
              InstaDM functions as an automated marketing workflow assistant for creators and brands:
            </p>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-3">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Real-time Webhook Ingestion</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    When an Instagram user comments on your post or sends a DM, Meta notifies our
                    secure webhook endpoint (<code>https://nextzshop.online/api/webhook/instagram</code>).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Keyword Filtering &amp; Trigger Execution</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Our system checks whether the comment or message contains your configured trigger
                    keywords (e.g. &quot;LINK&quot;, &quot;PRICE&quot;, &quot;SHOP&quot;). If a match is found, our
                    server sends your pre-composed DM or public comment reply back through Meta&apos;s
                    official Graph API.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Ephemeral Processing</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Message payloads are processed ephemerally using background queues. We only
                    persist basic delivery metrics and trigger activity logs to show you conversion
                    analytics inside your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Data Storage & Security */}
          <section id="storage-security" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-xs font-bold text-white">
                4
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-950">
                Data Storage and Security
              </h2>
            </div>

            <p>
              We employ enterprise-grade security standards to safeguard your account:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-stone-600">
              <li>
                <strong>Encryption in Transit:</strong> All data transmitted between your browser,
                our servers, and Meta&apos;s Graph API is encrypted using TLS 1.3 (HTTPS).
              </li>
              <li>
                <strong>Encryption at Rest:</strong> Access tokens and sensitive credentials are
                securely stored in encrypted database clusters (PostgreSQL).
              </li>
              <li>
                <strong>Tenant Isolation:</strong> Workspaces are partitioned by user ID so that no
                unauthorized user or organization can access another creator&apos;s account details.
              </li>
              <li>
                <strong>Least Privilege Architecture:</strong> Server endpoints communicate with Meta
                strictly via backend services; credentials and secrets are never embedded in client-side code.
              </li>
            </ul>
          </section>

          {/* Section 5: Data Deletion Request (Crucial for Meta App Review) */}
          <section id="data-deletion" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-600 text-xs font-bold text-white">
                5
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-950">
                Data Deletion Instructions (User Data Deletion)
              </h2>
            </div>

            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-base">
                <Trash2 className="h-5 w-5 text-rose-600" />
                <span>How to Delete Your Data from InstaDM</span>
              </div>

              <p className="text-xs text-rose-950/80 leading-relaxed">
                In compliance with Meta Platform Policies and General Data Protection Regulations
                (GDPR), you have the right to request deletion of all personal data, Instagram profile
                records, automations, and tokens stored by InstaDM.
              </p>

              <div className="space-y-3 pt-1">
                <div className="rounded-xl bg-white p-4 border border-rose-200/80 text-xs space-y-1.5">
                  <h3 className="font-bold text-stone-900">Option 1: Instant In-App Disconnection</h3>
                  <p className="text-stone-600">
                    Log in to your dashboard at <code>https://nextzshop.online/dashboard/profile</code>,
                    locate your Instagram account, and click <strong>Disconnect Account</strong>. This
                    immediately revokes and purges your access token from our database and terminates
                    all automation jobs.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-rose-200/80 text-xs space-y-1.5">
                  <h3 className="font-bold text-stone-900">Option 2: Revoke Access via Instagram Settings</h3>
                  <p className="text-stone-600">
                    In your Instagram app, go to <strong>Settings</strong> &gt; <strong>Apps and Websites</strong> &gt;
                    find <strong>InstaDM</strong> &gt; tap <strong>Remove</strong>. Meta will immediately
                    invalidate your token and notify our server.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-rose-200/80 text-xs space-y-1.5">
                  <h3 className="font-bold text-stone-900">Option 3: Complete Account Purge via Email</h3>
                  <p className="text-stone-600">
                    Send an email from your registered address to{" "}
                    <a
                      href="mailto:support@nextzshop.online?subject=Data%20Deletion%20Request"
                      className="font-bold text-rose-600 hover:underline"
                    >
                      support@nextzshop.online
                    </a>{" "}
                    with the subject line <code>&quot;Data Deletion Request&quot;</code> and include your
                    Instagram username. Our technical team will permanently delete your entire user
                    profile, database records, and logs within <strong>48 hours</strong> and confirm via email.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Third-Party Services */}
          <section id="third-party-services" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-xs font-bold text-white">
                6
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-950">
                Third-Party Services
              </h2>
            </div>

            <p>
              To deliver our service reliably, we integrate with trusted third-party cloud vendors:
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-stone-200 bg-white p-3.5 text-xs space-y-1">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5 text-blue-600" />
                  Meta Platforms, Inc.
                </span>
                <p className="text-stone-500">
                  Instagram Graph API, Instagram Login, and webhook event delivery.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-3.5 text-xs space-y-1">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-emerald-600" />
                  PostgreSQL / Cloud Database
                </span>
                <p className="text-stone-500">
                  Secure encrypted database storage for user profiles and automation rules.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-3.5 text-xs space-y-1">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  Inngest
                </span>
                <p className="text-stone-500">
                  Resilient background event orchestration for comment and DM handling.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-3.5 text-xs space-y-1">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-indigo-600" />
                  Stripe
                </span>
                <p className="text-stone-500">
                  PCI-DSS Level 1 compliant billing and subscription payment processing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Contact Us */}
          <section id="contact" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-xs font-bold text-white">
                7
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-950">
                Contact Information
              </h2>
            </div>

            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or
              your personal data, please contact our Data Protection and Support team:
            </p>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-2 text-xs text-stone-700">
              <p>
                <strong>Platform Name:</strong> InstaDM
              </p>
              <p>
                <strong>Service Domain:</strong>{" "}
                <a
                  href="https://nextzshop.online"
                  className="font-medium text-rose-600 hover:underline"
                >
                  https://nextzshop.online
                </a>
              </p>
              <p>
                <strong>Support &amp; Privacy Email:</strong>{" "}
                <a
                  href="mailto:support@nextzshop.online"
                  className="font-medium text-rose-600 hover:underline"
                >
                  support@nextzshop.online
                </a>
              </p>
              <p>
                <strong>Operator:</strong> InstaDM Labs / nextzshop.online
              </p>
              <p>
                <strong>Response Time:</strong> Within 24–48 hours on business days
              </p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 border-t border-stone-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} InstaDM (nextzshop.online). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-stone-900 transition">
              Home
            </Link>
            <span>•</span>
            <Link href="/login" className="hover:text-stone-900 transition">
              Login
            </Link>
            <span>•</span>
            <Link href="/connect-instagram" className="hover:text-stone-900 transition">
              Connect Instagram
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
