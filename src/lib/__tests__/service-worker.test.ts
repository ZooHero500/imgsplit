import { readFileSync } from "node:fs"
import { runInNewContext } from "node:vm"
import { describe, expect, it, vi } from "vitest"

function fetchHandler() {
  const listeners = new Map<string, (event: unknown) => void>()
  runInNewContext(readFileSync("public/sw.js", "utf8"), {
    self: { location: { origin: "https://imgsplit.com" }, addEventListener: (name: string, callback: (event: unknown) => void) => listeners.set(name, callback) },
    URL,
    caches: { match: vi.fn().mockResolvedValue(new Response("stale script")) },
  })
  return listeners.get("fetch")!
}

describe("service worker request ownership", () => {
  it("does not permanently serve a cached third-party analytics script", () => {
    const respondWith = vi.fn()
    fetchHandler()({ request: new Request("https://analysis.zoohero.me/script.js"), respondWith })
    expect(respondWith).not.toHaveBeenCalled()
  })
  it("does not intercept analytics POST requests", () => {
    const respondWith = vi.fn()
    fetchHandler()({ request: new Request("https://analysis.zoohero.me/api/send", { method: "POST" }), respondWith })
    expect(respondWith).not.toHaveBeenCalled()
  })
})
