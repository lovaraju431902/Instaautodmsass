"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Clock, Search, Sparkles } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { AnnouncementBar } from "@/components/landing/announcement-bar"
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [searchQuery, setSearchQuery] = React.useState<string>("")

  const categories = ["All", "Automation", "Growth", "Case Study", "Strategy"]

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = BLOG_POSTS[0]

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))] font-sans antialiased text-foreground">
      {/* Top Announcement Bar & Sticky Pill Navbar */}
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-12 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back to Home Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
              <BookOpen className="h-3 w-3 text-[hsl(340_82%_55%)]" />
              <span>InstaDM Playbooks & Insights</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              The Instagram DM Automation Blog
            </h1>

            <p className="mt-3 text-base leading-relaxed text-stone-600 sm:text-lg">
              Practical guides, real case studies, and compliance breakdowns to help
              you turn reel and comment interactions into automated revenue.
            </p>
          </div>

          {/* Featured Article Card */}
          {selectedCategory === "All" && !searchQuery && (
            <div className="mt-12">
              <div className="rounded-3xl border border-border/90 bg-white p-6 sm:p-10 shadow-sm transition-all hover:shadow-md">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 text-xs">
                      <Badge variant="coral">Featured Article</Badge>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-500 font-medium">{featuredPost.category}</span>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-500">{featuredPost.readTime}</span>
                    </div>

                    <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl hover:text-[hsl(340_82%_55%)] transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
                      {featuredPost.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-border">
                          <AvatarFallback className="bg-stone-100 text-xs font-bold text-stone-800">
                            {featuredPost.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xs font-bold text-stone-900">
                            {featuredPost.author.name}
                          </div>
                          <div className="text-[11px] text-stone-400">
                            {featuredPost.publishedAt}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 transition-colors"
                      >
                        <span>Read article</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Graphic Preview Box */}
                  <div className="lg:col-span-4">
                    <div className="relative flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-stone-50 p-6 text-center shadow-2xs">
                      <div className="h-12 w-12 rounded-2xl bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_55%)] flex items-center justify-center mb-3">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                        Conversion Blueprint
                      </h4>
                      <p className="mt-1 text-[11px] text-stone-500">
                        Detailed breakdown with step-by-step workflow triggers and DM response scripts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controls: Search & Category Filter Pills */}
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-5">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-full border border-border/80 bg-white pl-9 pr-3 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[hsl(340_82%_62%)]"
              />
            </div>
          </div>

          {/* Article Grid */}
          <div className="mt-10">
            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/90 p-12 text-center">
                <p className="text-sm font-medium text-stone-500">
                  No articles found matching &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSearchQuery("")
                  }}
                  className="mt-3 text-xs font-semibold text-[hsl(340_82%_55%)] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-md"
                  >
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant={post.category === "Automation" ? "coral" : "subtle"}>
                          {post.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-[11px] text-stone-400">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 text-base font-bold text-stone-900 leading-snug group-hover:text-[hsl(340_82%_55%)] transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-2.5 text-xs leading-relaxed text-stone-500 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom Author & Link */}
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7 border-border">
                          <AvatarFallback className="bg-stone-100 text-[10px] font-bold text-stone-700">
                            {post.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            {post.author.name}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            {post.publishedAt}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        aria-label={`Read ${post.title}`}
                        className="rounded-full p-1.5 text-stone-400 group-hover:bg-stone-100 group-hover:text-stone-900 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
