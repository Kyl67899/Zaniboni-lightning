"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, Calendar, Clock, ArrowRight, X } from "lucide-react"
import { blogPosts, blogCategories, type BlogPost } from "@/data/blog"
import Link from "next/link"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts)

  useEffect(() => {
    // Load posts from localStorage on mount
    const savedPosts = localStorage.getItem("zaniboni_blog_posts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }

    // Listen for storage changes (from admin dashboard)
    const handleStorageChange = () => {
      const updatedPosts = localStorage.getItem("zaniboni_blog_posts")
      if (updatedPosts) {
        setPosts(JSON.parse(updatedPosts))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Resources & Insights
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-balance">Lighting Resources</h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty px-4">
              Expert insights, design trends, and practical guides to help you make informed lighting decisions
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 sm:py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-12 h-11 sm:h-12 text-base sm:text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {blogCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-secondary hover:bg-secondary/90" : "bg-transparent"}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Results Count */}
            {(searchQuery || selectedCategory !== "All Posts") && (
              <div className="text-sm text-muted-foreground">
                Found {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-8">Featured Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {featuredPosts.map((post) => (
                  <Link key={post.id} href={`/resources/${post.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col">
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img
                          src={`/.jpg?height=400&width=600&query=${post.image}`}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                              <img
                                src={`/.jpg?height=100&width=100&query=${post.author.avatar}`}
                                alt={post.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-sm">
                              <p className="font-medium">{post.author.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section className="py-10 sm:py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-8">All Articles</h2>
              <div className="space-y-4 sm:space-y-6">
                {regularPosts.map((post) => (
                  <Link key={post.id} href={`/resources/${post.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all group">
                      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] gap-4 sm:gap-6">
                        <div className="aspect-video md:aspect-square bg-muted overflow-hidden">
                          <img
                            src={`/.jpg?height=300&width=300&query=${post.image}`}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </div>
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                                <img
                                  src={`/.jpg?height=100&width=100&query=${post.author.avatar}`}
                                  alt={post.author.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="text-sm">
                                <p className="font-medium">{post.author.name}</p>
                                <p className="text-muted-foreground text-xs">{post.author.role}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="group-hover:text-primary">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-md mx-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All Posts")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">Ready to Transform Your Space?</h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 px-4">
              Explore our complete collection of architectural lighting solutions
            </p>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
