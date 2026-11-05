import { notFound } from "next/navigation"
import { BlogPostEditor } from "@/components/admin/blog-post-editor"

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postId = Number.parseInt(id, 10)
  if (Number.isNaN(postId)) notFound()

  return <BlogPostEditor postId={postId} />
}
