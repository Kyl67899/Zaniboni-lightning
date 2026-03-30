import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/data/blog"
import { BlogPostContent } from "@/components/blog-post-content"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Article Not Found - Zaniboni Lighting",
    }
  }

  return {
    title: `${post.title} - Zaniboni Lighting Resources`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  return (
    <main className="min-h-screen bg-background">
      <BlogPostContent slug={slug} />
    </main>
  )
}
