"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ShareButton } from "@/components/share-button"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import { blogPosts, type BlogPost } from "@/data/blog"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BlogPostContentProps {
  slug: string
}

export function BlogPostContent({ slug }: BlogPostContentProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem("zaniboni_blog_posts")
    const posts: BlogPost[] = savedPosts ? JSON.parse(savedPosts) : blogPosts

    const foundPost = posts.find((p) => p.slug === slug)
    if (foundPost) {
      setPost(foundPost)
      // Get related posts
      const related = posts.filter((p) => p.category === foundPost.category && p.id !== foundPost.id).slice(0, 3)
      setRelatedPosts(related)
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedPosts = localStorage.getItem("zaniboni_blog_posts")
      if (updatedPosts) {
        const parsedPosts: BlogPost[] = JSON.parse(updatedPosts)
        const updatedPost = parsedPosts.find((p) => p.slug === slug)
        if (updatedPost) {
          setPost(updatedPost)
          const related = parsedPosts
            .filter((p) => p.category === updatedPost.category && p.id !== updatedPost.id)
            .slice(0, 3)
          setRelatedPosts(related)
        } else {
          // Post was deleted
          router.push("/resources")
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [slug, router])

  if (!post) {
    return (
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
            <Button asChild>
              <Link href="/resources">Back to Resources</Link>
            </Button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <>
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" size="sm" asChild className="mb-8">
              <Link href="/resources">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>

            {/* Article Header */}
            <div className="space-y-6 mb-12">
              <Badge variant="secondary">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-balance">{post.title}</h1>
              <p className="text-xl text-muted-foreground text-pretty">{post.excerpt}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground py-6 border-y border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    <img
                      src={`/.jpg?height=100&width=100&query=${post.author.avatar}`}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{post.author.name}</p>
                    <p className="text-xs">{post.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <ShareButton
                  url={`/resources/${post.slug}`}
                  title={post.title}
                  description={post.excerpt}
                  className="ml-auto"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted mb-12">
              <img
                src={`/.jpg?height=800&width=1200&query=${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-muted-foreground leading-relaxed mb-8 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/resources/${relatedPost.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all group h-full">
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img
                          src={`/.jpg?height=400&width=600&query=${relatedPost.image}`}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <Badge variant="secondary" className="text-xs mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {relatedPost.readTime}
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Explore our lighting solutions or get in touch with our team to discuss your project
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
