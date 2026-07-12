import { describe, it, expect } from "vitest"
import { createRateLimiter, getClientIp } from "../rate-limit"

describe("createRateLimiter", () => {
  it("allows requests under the limit", () => {
    const limiter = createRateLimiter({ windowMs: 60_000, max: 3 })
    expect(limiter.check("1.1.1.1", 0)).toEqual({ ok: true, remaining: 2 })
    expect(limiter.check("1.1.1.1", 10)).toEqual({ ok: true, remaining: 1 })
    expect(limiter.check("1.1.1.1", 20)).toEqual({ ok: true, remaining: 0 })
  })

  it("blocks requests over the limit with retryAfterMs", () => {
    const limiter = createRateLimiter({ windowMs: 60_000, max: 2 })
    limiter.check("1.1.1.1", 0)
    limiter.check("1.1.1.1", 1_000)

    const result = limiter.check("1.1.1.1", 2_000)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      // Oldest hit at t=0 expires at t=60_000, so retry after 58_000ms
      expect(result.retryAfterMs).toBe(58_000)
      expect(result.remaining).toBe(0)
    }
  })

  it("does not count blocked attempts against the window", () => {
    const limiter = createRateLimiter({ windowMs: 60_000, max: 1 })
    limiter.check("1.1.1.1", 0)
    // Hammering while blocked must not extend the block
    limiter.check("1.1.1.1", 10_000)
    limiter.check("1.1.1.1", 30_000)
    expect(limiter.check("1.1.1.1", 60_001).ok).toBe(true)
  })

  it("allows again once old hits slide out of the window", () => {
    const limiter = createRateLimiter({ windowMs: 60_000, max: 2 })
    limiter.check("1.1.1.1", 0)
    limiter.check("1.1.1.1", 30_000)
    expect(limiter.check("1.1.1.1", 59_999).ok).toBe(false)
    // t=0 hit has expired; t=30_000 hit is still alive
    expect(limiter.check("1.1.1.1", 60_001).ok).toBe(true)
    expect(limiter.check("1.1.1.1", 60_002).ok).toBe(false)
  })

  it("tracks keys independently", () => {
    const limiter = createRateLimiter({ windowMs: 60_000, max: 1 })
    expect(limiter.check("1.1.1.1", 0).ok).toBe(true)
    expect(limiter.check("1.1.1.1", 1).ok).toBe(false)
    expect(limiter.check("2.2.2.2", 1).ok).toBe(true)
  })

  it("sweeps expired keys so the map does not grow unbounded", () => {
    const limiter = createRateLimiter({ windowMs: 1_000, max: 5 })
    limiter.check("a", 0)
    limiter.check("b", 0)
    limiter.check("c", 0)
    expect(limiter.size()).toBe(3)
    // A check a full window later triggers the sweep; only the new key remains
    limiter.check("d", 2_000)
    expect(limiter.size()).toBe(1)
  })

  it("reports zero retryAfterMs as ok on the boundary", () => {
    const limiter = createRateLimiter({ windowMs: 1_000, max: 1 })
    limiter.check("1.1.1.1", 0)
    const blocked = limiter.check("1.1.1.1", 999)
    expect(blocked.ok).toBe(false)
    if (!blocked.ok) {
      expect(blocked.retryAfterMs).toBe(1)
    }
  })

  it("rejects brand-new keys once the tracked-key cap is reached", () => {
    const limiter = createRateLimiter({ windowMs: 60_000, max: 5 })
    for (let i = 0; i < 5_000; i++) {
      expect(limiter.check(`key-${i}`, 0).ok).toBe(true)
    }
    expect(limiter.size()).toBe(5_000)

    // A never-seen key is rejected while the map is full...
    const rejected = limiter.check("fresh-key", 1)
    expect(rejected.ok).toBe(false)
    if (!rejected.ok) {
      expect(rejected.retryAfterMs).toBe(60_000)
    }
    expect(limiter.size()).toBe(5_000)

    // ...but already-tracked keys keep working within their own budget.
    expect(limiter.check("key-42", 1).ok).toBe(true)

    // Once old keys expire, the forced sweep frees slots for new keys.
    expect(limiter.check("fresh-key", 60_001).ok).toBe(true)
  })
})

describe("getClientIp", () => {
  it("takes the last (proxy-appended) entry of x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" })
    expect(getClientIp(headers)).toBe("10.0.0.1")
  })

  it("ignores spoofed client-supplied entries prepended to x-forwarded-for", () => {
    const headers = new Headers({
      "x-forwarded-for": "6.6.6.6, 7.7.7.7, 203.0.113.7",
    })
    expect(getClientIp(headers)).toBe("203.0.113.7")
  })

  it("uses a single-entry x-forwarded-for as-is", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7" })
    expect(getClientIp(headers)).toBe("203.0.113.7")
  })

  it("trims whitespace around the forwarded IP", () => {
    const headers = new Headers({ "x-forwarded-for": "10.0.0.1,  203.0.113.7  " })
    expect(getClientIp(headers)).toBe("203.0.113.7")
  })

  it("skips empty trailing entries in x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, ," })
    expect(getClientIp(headers)).toBe("203.0.113.7")
  })

  it("falls back to x-real-ip when x-forwarded-for is missing", () => {
    const headers = new Headers({ "x-real-ip": "198.51.100.4" })
    expect(getClientIp(headers)).toBe("198.51.100.4")
  })

  it("falls back to x-real-ip when x-forwarded-for is empty", () => {
    const headers = new Headers({
      "x-forwarded-for": " , ",
      "x-real-ip": "198.51.100.4",
    })
    expect(getClientIp(headers)).toBe("198.51.100.4")
  })

  it("returns the shared unknown bucket when no headers are present", () => {
    expect(getClientIp(new Headers())).toBe("unknown")
  })
})
