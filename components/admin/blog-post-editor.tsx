"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, Save } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { blogCategories, blogImages, type BlogPost } from "@/data/blog"
import { loadPosts, savePosts } from "@/lib/blog-store"

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Design Trends",
  featured: false,
  readTime: "3 min read",
  image: blogImages[0].value,
  authorName: "Zaniboni Lighting",
  authorRole: "Editorial",
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function BlogPostEditor({ postId }: { postId?: number }) {
  const router = useRouter()
  const isEditing = postId !== undefined
  const [form, setForm] = useState(emptyForm)
  const [notFound, setNotFound] = useState(false)

  const set = <K extends keyof typeof emptyForm>(field: K, value: (typeof emptyForm)[K]) =>
    setForm((current) => ({ ...current, [field]: value }))

  useEffect(() => {
    if (!isEditing) return
    // localStorage only exists in the browser, so this can't run during render.
    const post = loadPosts().find((p) => p.id === postId)
    if (!post) {
      setNotFound(true)
      return
    }
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      featured: post.featured,
      readTime: post.readTime,
      image: post.image,
      authorName: post.author.name,
      authorRole: post.author.role,
    })
  }, [isEditing, postId])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const posts = loadPosts()

      if (posts.some((p) => p.slug === form.slug && p.id !== postId)) {
        toast.error("Another post already uses that URL slug")
        return
      }

      const today = new Date().toISOString().split("T")[0]
      const post: BlogPost = {
        id: postId ?? Math.max(0, ...posts.map((p) => p.id)) + 1,
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        featured: form.featured,
        readTime: form.readTime,
        image: form.image,
        publishedAt: posts.find((p) => p.id === postId)?.publishedAt ?? today,
        author: { name: form.authorName, role: form.authorRole },
      }

      savePosts(isEditing ? posts.map((p) => (p.id === postId ? post : p)) : [post, ...posts])
      toast.success("Draft saved in this browser")
      router.push("/admin")
    } catch {
      toast.error("Couldn’t save the draft. Please try again.")
    }
  }

  if (notFound) {
    return (
      <div className="shell py-32 text-center">
        <h1 className="heading">Draft not found</h1>
        <Button asChild size="lg" className="mt-8">
          <Link href="/admin">Back to dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-muted/60">
      <div className="shell py-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
        <h1 className="heading mt-6">{isEditing ? "Edit draft" : "New draft"}</h1>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 border border-border bg-background p-6 lg:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="h-11"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                    // Keep an existing URL stable when a published title is reworded.
                    slug: isEditing ? current.slug : slugify(event.target.value),
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL slug</Label>
              <Input
                id="slug"
                className="h-11"
                value={form.slug}
                onChange={(event) => set("slug", slugify(event.target.value))}
                required
              />
              <p className="text-xs text-muted-foreground">/resources/{form.slug || "your-post"}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                rows={3}
                value={form.excerpt}
                onChange={(event) => set("excerpt", event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={18}
                className="font-mono text-sm"
                value={form.content}
                onChange={(event) => set("content", event.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Leave a blank line between paragraphs. Start a line with “## ” for a heading or “- ” for a list item,
                and wrap text in ** for bold.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-6 border border-border bg-background p-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form.category} onValueChange={(value) => set("category", value)}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories
                      .filter((category) => category !== "All Posts")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Select value={form.image} onValueChange={(value) => set("image", value)}>
                  <SelectTrigger id="image" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {blogImages.map((image) => (
                      <SelectItem key={image.value} value={image.value}>
                        {image.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative mt-3 aspect-video overflow-hidden bg-muted">
                  <Image src={form.image} alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read time</Label>
                <Input id="readTime" value={form.readTime} onChange={(event) => set("readTime", event.target.value)} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="featured">Featured</Label>
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(checked) => set("featured", checked)}
                />
              </div>
            </div>

            <div className="space-y-4 border border-border bg-background p-6">
              <div className="space-y-2">
                <Label htmlFor="authorName">Author</Label>
                <Input
                  id="authorName"
                  value={form.authorName}
                  onChange={(event) => set("authorName", event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorRole">Role</Label>
                <Input
                  id="authorRole"
                  value={form.authorRole}
                  onChange={(event) => set("authorRole", event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button type="submit" size="lg" className="w-full">
                <Save />
                Save draft
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" size="lg" className="w-full bg-transparent" asChild>
                  <Link href={`/admin/blog/${postId}/preview`}>
                    <Eye />
                    Preview
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
