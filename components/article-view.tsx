import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ShareButton } from "@/components/share-button"
import { formatPostDate, type BlogPost } from "@/data/blog"

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
  )
}

/** Renders post content as React elements, so nothing an editor types is treated as HTML. */
export function ArticleBody({ content }: { content: string }) {
  const blocks: React.ReactNode[] = []

  content.split(/\n{2,}/).forEach((rawBlock, index) => {
    const block = rawBlock.trim()
    if (!block) return

    if (block.startsWith("## ")) {
      blocks.push(<h2 key={index}>{block.slice(3)}</h2>)
    } else if (block.split("\n").every((line) => line.startsWith("- "))) {
      blocks.push(
        <ul key={index}>
          {block.split("\n").map((line, itemIndex) => (
            <li key={itemIndex}>{renderInline(line.slice(2))}</li>
          ))}
        </ul>,
      )
    } else {
      blocks.push(
        <p key={index} className="whitespace-pre-line">
          {renderInline(block)}
        </p>,
      )
    }
  })

  return <div className="prose-zl">{blocks}</div>
}

export function ArticleView({ post }: { post: BlogPost }) {
  return (
    <article className="pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="shell">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>

        <header className="mt-10 max-w-4xl">
          <p className="eyebrow text-secondary">{post.category}</p>
          <h1 className="display mt-6 lg:text-[4rem]">{post.title}</h1>
          <p className="lede mt-7 max-w-2xl">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>{post.author.name}</span>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden bg-muted md:mt-16">
          <Image src={post.image} alt="" fill priority sizes="(min-width: 1320px) 1224px, 100vw" className="object-cover" />
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[1fr_3fr]">
          <div>
            <ShareButton path={`/resources/${post.slug}`} title={post.title} />
          </div>
          <ArticleBody content={post.content} />
        </div>
      </div>
    </article>
  )
}
