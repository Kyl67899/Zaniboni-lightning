import { notFound } from "next/navigation"
import { BlogPostPreview } from "@/components/admin/blog-post-preview"

export default async function PreviewBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postId = Number.parseInt(id, 10)
  if (Number.isNaN(postId)) notFound()

  return <BlogPostPreview postId={postId} />
}
