"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { blogCategories, blogPosts } from "@/data/blog"

const ALL = "All Posts"

export default function ResourcesPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(ALL)

  const posts = useMemo(() => {
    const term = query.trim().toLowerCase()
    return blogPosts
      .filter((post) => category === ALL || post.category === category)
      .filter(
        (post) => !term || post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term),
      )
  }, [query, category])

  return (
    <main id="main">
      <PageHero
        eyebrow="Journal"
        title="Ideas on light"
        description="Practical guidance on specifying, designing and living with architectural lighting."
      />

      <section className="py-12 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {blogCategories.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="pill"
                  aria-pressed={category === name}
                  onClick={() => setCategory(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="relative lg:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <label htmlFor="article-search" className="sr-only">
                Search articles
              </label>
              <Input
                id="article-search"
                type="search"
                placeholder="Search articles"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 bg-transparent pl-9"
              />
            </div>
          </div>

          <p role="status" className="mt-8 text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>

          {posts.length > 0 ? (
            <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <h2 className="text-3xl font-light">No articles match your search</h2>
              <Button
                onClick={() => {
                  setQuery("")
                  setCategory(ALL)
                }}
                variant="outline"
                size="lg"
                className="mt-8 bg-transparent"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
