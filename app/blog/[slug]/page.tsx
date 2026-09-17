import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Share2, Sparkles } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { AnnouncementBar } from "@/components/landing/announcement-bar"
import { BLOG_POSTS } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))] font-sans antialiased text-foreground">
      {/* Top Bars */}
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-12 pb-24">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all playbooks</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="border-b border-border/70 pb-8">
            <div className="flex items-center gap-3 text-xs">
              <Badge variant="coral">{post.category}</Badge>
              <span className="text-stone-300">•</span>
              <div className="flex items-center gap-1 text-stone-500">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readTime}</span>
              </div>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500">{post.publishedAt}</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.15] text-stone-900">
              {post.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              {post.excerpt}
            </p>

            {/* Author Info Card */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/60">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-border">
                  <AvatarFallback className="bg-stone-100 text-xs font-bold text-stone-800">
                    {post.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-bold text-stone-900">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-stone-500">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-stone-400">
                  InstaDM Growth Series
                </span>
              </div>
            </div>
          </header>

          {/* Key Takeaways Callout Box */}
          <section className="my-10 rounded-2xl border-2 border-[hsl(340_82%_62%/0.3)] bg-[hsl(340_82%_62%/0.02)] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[hsl(340_82%_55%)]">
              <Sparkles className="h-4 w-4" />
              <span>Key Takeaways & Best Practices</span>
            </div>

            <ul className="mt-4 space-y-3">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(340_82%_55%)] mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Body Content Paragraphs */}
          <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-6 text-sm sm:text-base">
            {post.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Call to Action Box at Bottom of Article */}
          <div className="mt-16 rounded-3xl border border-stone-900 bg-stone-900 p-8 text-white sm:p-10 shadow-lg">
            <div className="max-w-xl">
              <span className="rounded-full bg-[hsl(340_82%_62%)] px-3 py-0.5 text-[10px] font-extrabold tracking-wider uppercase text-white">
                Start Building Today
              </span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to put comment-to-DM automation to work?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                Set up your first keyword trigger and welcome message in under 5 minutes.
                Free plan available with no credit card required.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  <span>Start for free</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-stone-700 bg-transparent px-5 py-2.5 text-xs font-medium text-stone-300 hover:text-white hover:border-stone-500 transition-colors"
                >
                  <span>More articles</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
