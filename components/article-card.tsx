import Image from "next/image"
import Link from "next/link"
import { formatPostDate, type BlogPost } from "@/data/blog"

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/resources/${post.slug}`} className="group block">
      <div className="relative aspect-3/2 overflow-hidden bg-muted">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="eyebrow mt-5 text-muted-foreground">{post.category}</p>
      <h3 className="mt-3 text-2xl leading-snug transition-colors group-hover:text-secondary">{post.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <p className="mt-4 text-xs text-muted-foreground">
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> · {post.readTime}
      </p>
    </Link>
  )
}
