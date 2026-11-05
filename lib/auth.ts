/**
 * Admin session handling: a signed, expiring token kept in an httpOnly cookie.
 * Uses Web Crypto so the same code runs in route handlers and in proxy.ts.
 */
export const SESSION_COOKIE = "zl_admin_session"
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60

const encoder = new TextEncoder()

function credentials() {
  const username = process.env.ADMIN_CREDENTIALS_USERNAME
  const password = process.env.ADMIN_CREDENTIALS_PASSWORD
  return username && password ? { username, password } : null
}

export function isAuthConfigured() {
  return credentials() !== null
}

function signingSecret() {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET
  const creds = credentials()
  // Deriving from the credentials means changing the password ends every session.
  return creds ? `zaniboni-session:${creds.username}:${creds.password}` : null
}

function toBase64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

async function sign(secret: string, data: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ])
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(data)))
}

async function sha256(value: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)))
}

export async function credentialsMatch(username: string, password: string) {
  const creds = credentials()
  if (!creds) return false
  // Hash first so the comparison takes the same time whatever the input length.
  const [userOk, passOk] = await Promise.all([
    Promise.all([sha256(username), sha256(creds.username)]).then(([a, b]) => timingSafeEqual(a, b)),
    Promise.all([sha256(password), sha256(creds.password)]).then(([a, b]) => timingSafeEqual(a, b)),
  ])
  return userOk && passOk
}

export async function createSessionToken(username: string) {
  const secret = signingSecret()
  if (!secret) throw new Error("Admin credentials are not configured")
  const payload = toBase64Url(
    encoder.encode(JSON.stringify({ username, exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 })),
  )
  return `${payload}.${toBase64Url(await sign(secret, payload))}`
}

export async function verifySessionToken(token: string | undefined) {
  const secret = signingSecret()
  if (!secret || !token) return null

  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null

  const expected = toBase64Url(await sign(secret, payload))
  if (!timingSafeEqual(encoder.encode(expected), encoder.encode(signature))) return null

  try {
    const session = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as {
      username: string
      exp: number
    }
    return session.exp > Date.now() ? session : null
  } catch {
    return null
  }
}
