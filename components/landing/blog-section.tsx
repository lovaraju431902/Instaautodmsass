import * as React from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Clock } from "lucide-react"
import { BLOG_POSTS } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function BlogSection() {
  const featuredPosts = BLOG_POSTS.slice(0, 3)

  return (
    <section id="blog" className="py-20 md:py-28 bg-stone-50/50 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
              <BookOpen className="h-3 w-3 text-[hsl(340_82%_55%)]" />
              <span>Playbooks & Strategies</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
              Learn how top creators scale conversations.
            </h2>

            <p className="mt-3 text-base leading-relaxed text-stone-600">
              Actionable guides, case studies, and compliance breakdowns to help
              you turn reel and comment interactions into structured revenue.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-[hsl(340_82%_55%)] transition-colors group self-start md:self-end"
          >
            <span>View all articles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Featured Blog Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div>
                {/* Top Meta: Category & Read Time */}
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
                  <Link href={`/blog/${post.slug}`} className="outline-none">
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
      </div>
    </section>
  )
}
