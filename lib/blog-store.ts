import { blogPosts, type BlogPost } from "@/data/blog"

/**
 * Admin drafts live in this browser's localStorage until a database is added.
 * The public journal always reads from data/blog.ts.
 */
const STORAGE_KEY = "zaniboni_blog_drafts_v2"

export function loadPosts(): BlogPost[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : null
    return Array.isArray(parsed) ? parsed : blogPosts
  } catch {
    return blogPosts
  }
}

export function savePosts(posts: BlogPost[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}
