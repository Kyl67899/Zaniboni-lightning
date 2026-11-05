/**
 * Fixed-window limiter held in memory. On serverless hosting each instance keeps
 * its own count, so this slows abuse rather than setting a hard global limit.
 */
const hits = new Map<string, { count: number; resetAt: number }>()

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now()

  if (hits.size > 5000) {
    for (const [k, entry] of hits) if (entry.resetAt <= now) hits.delete(k)
  }

  const entry = hits.get(key)
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  entry.count += 1
  return entry.count > limit
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}
