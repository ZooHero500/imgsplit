/**
 * Lightweight in-memory sliding-window rate limiter (per key, typically per IP).
 *
 * LIMITATIONS:
 * - State lives in module memory. On serverless / multi-instance deployments
 *   (Vercel, multiple Node processes, etc.) each instance keeps its own
 *   counters, so the limit is only enforced **per instance**, not globally.
 *   A determined attacker hitting many cold instances can exceed the nominal
 *   limit. This is intentionally a cheap abuse brake for the paid AI
 *   endpoints; swap in a shared store (Redis / Upstash) if a global limit is
 *   ever needed.
 * - Keying relies on proxy-provided headers (see `getClientIp`). If the app
 *   is exposed directly without a trusted reverse proxy, those headers are
 *   client-controllable and per-IP limits cannot be trusted.
 */

export interface RateLimiterOptions {
  /** Sliding window length in milliseconds. */
  windowMs: number
  /** Maximum number of allowed calls per key within the window. */
  max: number
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; remaining: 0; retryAfterMs: number }

export interface RateLimiter {
  /**
   * Record an attempt for `key` and report whether it is allowed.
   * `now` is injectable for tests; defaults to `Date.now()`.
   */
  check: (key: string, now?: number) => RateLimitResult
  /** Number of keys currently tracked (exposed for tests / diagnostics). */
  size: () => number
}

/**
 * Hard cap on distinct tracked keys per limiter instance. Bounds memory even
 * if an attacker fabricates a new key per request (e.g. spoofed forwarding
 * headers on a misconfigured deployment). When the cap is hit, unseen keys
 * are rejected (fail closed) until a slot frees up at the end of the window.
 */
const MAX_TRACKED_KEYS = 5_000

export function createRateLimiter({ windowMs, max }: RateLimiterOptions): RateLimiter {
  // key -> ascending list of hit timestamps within the current window
  const hits = new Map<string, number[]>()
  let lastSweep = 0

  // Drop expired timestamps and empty keys so the Map cannot grow unbounded.
  // Runs opportunistically at most once per window.
  function sweep(now: number): void {
    const cutoff = now - windowMs
    for (const [key, timestamps] of hits) {
      const alive = timestamps.filter((t) => t > cutoff)
      if (alive.length === 0) {
        hits.delete(key)
      } else {
        hits.set(key, alive)
      }
    }
    lastSweep = now
  }

  function check(key: string, now: number = Date.now()): RateLimitResult {
    if (now - lastSweep >= windowMs) {
      sweep(now)
    }

    // Bound the map: brand-new keys are rejected once the cap is reached
    // (after forcing a sweep to reclaim expired slots first).
    if (!hits.has(key) && hits.size >= MAX_TRACKED_KEYS) {
      sweep(now)
      if (hits.size >= MAX_TRACKED_KEYS) {
        return { ok: false, remaining: 0, retryAfterMs: windowMs }
      }
    }

    const cutoff = now - windowMs
    const alive = (hits.get(key) ?? []).filter((t) => t > cutoff)

    if (alive.length >= max) {
      hits.set(key, alive)
      const oldest = alive[0]
      return {
        ok: false,
        remaining: 0,
        retryAfterMs: Math.max(0, oldest + windowMs - now),
      }
    }

    alive.push(now)
    hits.set(key, alive)
    return { ok: true, remaining: max - alive.length }
  }

  return { check, size: () => hits.size }
}

/**
 * Best-effort client IP extraction for rate-limit keying.
 *
 * Uses the **last** entry of `x-forwarded-for`, then `x-real-ip`, then a
 * shared "unknown" bucket. The first XFF entry is client-supplied and
 * trivially spoofable behind append-style proxies (each request could mint a
 * fresh rate-limit bucket); the last entry is the one appended by the proxy
 * closest to us, so it is the hardest to forge. On Vercel the header is
 * sanitized to the single verified client IP, so first == last there. If the
 * app is exposed directly with no trusted proxy, no header can be trusted —
 * see the module doc-comment.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) {
    const entries = forwarded
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0)
    const last = entries[entries.length - 1]
    if (last) return last
  }
  const realIp = headers.get("x-real-ip")?.trim()
  if (realIp) return realIp
  return "unknown"
}
