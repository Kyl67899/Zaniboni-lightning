import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleCard } from "@/components/article-card"
import { ArticleView } from "@/components/article-view"
import { CtaBand } from "@/components/cta-band"
import { blogPosts } from "@/data/blog"
import { pageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: "Article not found" }
  return pageMetadata(post.title, post.excerpt, `/resources/${post.slug}`, post.image)
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = [
    ...blogPosts.filter((p) => p.category === post.category && p.id !== post.id),
    ...blogPosts.filter((p) => p.category !== post.category),
  ].slice(0, 3)

  return (
    <main id="main">
      <ArticleView post={post} />
      <section className="border-t border-border py-16 md:py-24">
        <div className="shell">
          <h2 className="heading">Keep reading</h2>
          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.id} post={item} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  )
}
