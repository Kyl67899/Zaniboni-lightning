"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Eye, LogOut, Plus, Search, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPostDate, type BlogPost } from "@/data/blog"
import { loadPosts, savePosts } from "@/lib/blog-store"

export function AdminDashboard() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [query, setQuery] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    // localStorage only exists in the browser, so this can't run during render.
    setPosts(loadPosts())
  }, [])

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/admin/login")
    router.refresh()
  }

  const handleDelete = (id: number) => {
    const updated = posts.filter((post) => post.id !== id)
    setPosts(updated)
    savePosts(updated)
    setDeleteId(null)
  }

  const term = query.trim().toLowerCase()
  const filtered = posts.filter(
    (post) => post.title.toLowerCase().includes(term) || post.category.toLowerCase().includes(term),
  )

  return (
    <div className="min-h-svh bg-muted/60">
      <header className="border-b border-border bg-background">
        <div className="shell flex h-20 items-center justify-between gap-4">
          <div>
            <p className="font-serif text-xl tracking-[0.12em]">ZANIBONI</p>
            <p className="text-xs text-muted-foreground">Content admin</p>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild className="hover:bg-muted hover:text-foreground">
              <Link href="/">View site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-muted hover:text-foreground">
              <LogOut />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <div className="shell py-10">
        <div className="border border-accent bg-accent/15 p-5 text-sm leading-relaxed">
          <strong className="font-medium">Drafts are saved in this browser only.</strong> Changes here don’t appear on
          the public journal, which reads from <code className="text-xs">data/blog.ts</code>. Publishing from this
          screen needs a database.
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="heading">Journal drafts</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/admin/blog/create">
              <Plus />
              New draft
            </Link>
          </Button>
        </div>

        <div className="relative mt-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="post-search" className="sr-only">
            Search posts
          </label>
          <Input
            id="post-search"
            type="search"
            placeholder="Search posts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 bg-background pl-9"
          />
        </div>

        <ul className="mt-6 space-y-3">
          {filtered.map((post) => (
            <li key={post.id} className="flex flex-col gap-4 border border-border bg-background p-4 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-muted">
                <Image src={post.image} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-serif text-xl">{post.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {post.category} · {formatPostDate(post.publishedAt)} · {post.readTime}
                  {post.featured ? " · Featured" : ""}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild className="hover:bg-muted hover:text-foreground">
                  <Link href={`/admin/blog/${post.id}/preview`} aria-label={`Preview ${post.title}`}>
                    <Eye />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="hover:bg-muted hover:text-foreground">
                  <Link href={`/admin/blog/${post.id}/edit`} aria-label={`Edit ${post.title}`}>
                    <Edit />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Delete ${post.title}`}
                  className="text-destructive hover:bg-muted hover:text-destructive"
                  onClick={() => setDeleteId(post.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
          {filtered.length === 0 && <li className="py-16 text-center text-muted-foreground">No posts found.</li>}
        </ul>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-light">Delete this draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from this browser. It doesn’t change the public journal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId !== null && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
