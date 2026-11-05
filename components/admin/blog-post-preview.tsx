"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArticleView } from "@/components/article-view"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/data/blog"
import { loadPosts } from "@/lib/blog-store"

export function BlogPostPreview({ postId }: { postId: number }) {
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined)

  useEffect(() => {
    // localStorage only exists in the browser, so this can't run during render.
    setPost(loadPosts().find((p) => p.id === postId) ?? null)
  }, [postId])

  if (post === undefined) return null

  if (post === null) {
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
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-accent px-5 py-3 text-sm text-accent-foreground">
        <span>Preview. This draft isn’t visible to the public.</span>
        <Link href={`/admin/blog/${post.id}/edit`} className="shrink-0 underline underline-offset-4">
          Back to editor
        </Link>
      </div>
      <ArticleView post={post} />
    </>
  )
}
