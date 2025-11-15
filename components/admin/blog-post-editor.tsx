"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Loader2, Eye } from "lucide-react"
import { blogPosts, blogCategories, type BlogPost } from "@/data/blog"
import Link from "next/link"
import { toast } from "sonner"

interface BlogPostEditorProps {
  postId?: number
}

export function BlogPostEditor({ postId }: BlogPostEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Design Trends",
    featured: false,
    readTime: "5 min read",
    image: "",
    authorName: "",
    authorRole: "",
    authorAvatar: "",
  })

  const isEditing = postId !== undefined

  // Load existing post if editing
  useEffect(() => {
    if (isEditing) {
      const savedPosts = localStorage.getItem("zaniboni_blog_posts")
      const posts: BlogPost[] = savedPosts ? JSON.parse(savedPosts) : blogPosts

      const post = posts.find((p) => p.id === postId)
      if (post) {
        setFormData({
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
          authorAvatar: post.author.avatar,
        })
      }
    }
  }, [postId, isEditing])

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
        toast.error("Please fill in all required fields")
        setLoading(false)
        return
      }

      // Get existing posts
      const savedPosts = localStorage.getItem("zaniboni_blog_posts")
      const posts: BlogPost[] = savedPosts ? JSON.parse(savedPosts) : [...blogPosts]

      const newPost: BlogPost = {
        id: isEditing ? postId : Math.max(...posts.map((p) => p.id), 0) + 1,
        slug: formData.slug,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        featured: formData.featured,
        readTime: formData.readTime,
        image: formData.image || "modern architectural lighting",
        publishedAt: isEditing
          ? posts.find((p) => p.id === postId)?.publishedAt || new Date().toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        author: {
          name: formData.authorName || "Admin",
          role: formData.authorRole || "Content Manager",
          avatar: formData.authorAvatar || "professional portrait",
        },
      }

      let updatedPosts: BlogPost[]
      if (isEditing) {
        updatedPosts = posts.map((p) => (p.id === postId ? newPost : p))
      } else {
        updatedPosts = [newPost, ...posts]
      }

      // Save to localStorage
      localStorage.setItem("zaniboni_blog_posts", JSON.stringify(updatedPosts))

      // Trigger storage event for real-time updates
      window.dispatchEvent(new Event("storage"))

      toast.success(isEditing ? "Post updated successfully!" : "Post created successfully!")

      // Redirect to admin dashboard
      setTimeout(() => {
        router.push("/admin")
      }, 500)
    } catch (error) {
      console.error("Error saving post:", error)
      toast.error("Failed to save post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-serif font-bold">{isEditing ? "Edit Post" : "Create New Post"}</h1>
              <p className="text-muted-foreground">
                {isEditing ? "Update your blog post" : "Write a new blog post for your audience"}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                  <CardDescription>The main content of your blog post</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter post title..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">
                      Slug <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="post-url-slug"
                      required
                    />
                    <p className="text-xs text-muted-foreground">URL: /resources/{formData.slug || "your-post-slug"}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">
                      Excerpt <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="A brief summary of your post..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">
                      Content <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your full post content here..."
                      rows={15}
                      required
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Write your content in plain text. Formatting will be applied automatically.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Author Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Author Information</CardTitle>
                  <CardDescription>Who wrote this post?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="authorName">Author Name</Label>
                      <Input
                        id="authorName"
                        value={formData.authorName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, authorName: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authorRole">Author Role</Label>
                      <Input
                        id="authorRole"
                        value={formData.authorRole}
                        onChange={(e) => setFormData((prev) => ({ ...prev, authorRole: e.target.value }))}
                        placeholder="Content Manager"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authorAvatar">Author Avatar Description</Label>
                    <Input
                      id="authorAvatar"
                      value={formData.authorAvatar}
                      onChange={(e) => setFormData((prev) => ({ ...prev, authorAvatar: e.target.value }))}
                      placeholder="professional portrait"
                    />
                    <p className="text-xs text-muted-foreground">Describe the author's photo for image generation</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {blogCategories
                          .filter((cat) => cat !== "All Posts")
                          .map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="readTime">Read Time</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                      placeholder="5 min read"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Featured Post</Label>
                      <p className="text-xs text-muted-foreground">Show on homepage</p>
                    </div>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Image Description</Label>
                    <Textarea
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="modern architectural lighting showcase"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">Describe the image for generation</p>
                  </div>

                  {formData.image && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={`/.jpg?height=400&width=600&query=${formData.image}`}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isEditing ? "Update Post" : "Publish Post"}
                      </>
                    )}
                  </Button>
                  {isEditing && formData.slug && (
                    <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={`/resources/${formData.slug}`} target="_blank">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
