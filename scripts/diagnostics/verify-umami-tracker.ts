/** Offline transport check against a downloaded copy of the actual tracker.
 * bun scripts/diagnostics/verify-umami-tracker.ts /tmp/tracker.js [--without-guard]
 * All fetches are intercepted in the VM; no telemetry leaves this process.
 */
import { readFileSync } from "node:fs"
import { runInNewContext } from "node:vm"
import { createHash } from "node:crypto"
import assert from "node:assert/strict"
import { filterDuplicateAnalyticsEvents, flushAnalyticsEvents, startOperation } from "../../src/lib/analytics"

const file = process.argv[2]
if (!file) throw new Error("Pass a downloaded tracker.js path")
const source = readFileSync(file, "utf8")
const requests: Array<{ type: string; payload: Record<string, unknown> }> = []
const attributes: Record<string, string> = {
  "data-website-id": "offline-test", "data-before-send": "imgsplitBeforeSend", "data-exclude-hash": "true",
}
const fakeWindow = {
  screen: { width: 1280, height: 800 },
  navigator: { language: "en" },
  location: new URL("https://imgsplit.com/zh-CN/?utm_source=release-qa"),
  document: {
    currentScript: { src: "https://analysis.zoohero.me/script.js", getAttribute: (name: string) => attributes[name] ?? null },
    title: "Offline test", referrer: "", readyState: "complete", addEventListener: () => {},
  },
  localStorage: { getItem: () => null },
  history: { pushState: () => {}, replaceState: () => {} },
  addEventListener: () => {},
  imgsplitBeforeSend: process.argv.includes("--without-guard") ? undefined : filterDuplicateAnalyticsEvents,
} as unknown as Window
Object.defineProperty(globalThis, "window", { value: fakeWindow, configurable: true })
runInNewContext(source, { window: fakeWindow, URL, setTimeout, clearTimeout, fetch: async (_url: string, options: { body: string }) => {
  requests.push(JSON.parse(options.body))
  return { json: async () => ({}) }
} })

startOperation("upload", { input_count: 1 })("failed", { error_code: "imageMemoryRisk", admission_reason: "single_image" })
await flushAnalyticsEvents()
const originals = requests.filter(item => item.payload.name)
assert.equal(originals.length, 2, "one start and one failure must produce two requests")
// Reproduce the observed duplicate identity at the real tracker's send boundary.
await fakeWindow.umami!.track(() => structuredClone(originals[1].payload))
assert.equal(requests.filter(item => item.payload.name).length, 2, "an identical event must not produce a second POST")
fakeWindow.history.pushState(null, "", "/workspace")
await new Promise(resolve => setTimeout(resolve, 350))
assert.equal(requests.filter(item => !item.payload.name).length, 2, "normal navigation pageviews remain intact")
startOperation("upload", { input_count: 1 })("succeeded")
await flushAnalyticsEvents()
assert.equal(requests.filter(item => item.payload.name).length, 4, "a new upload remains countable")
console.log(JSON.stringify({ status: "passed", network: "fully mocked", customEvents: 4, pageviews: 2, trackerSha256: createHash("sha256").update(source).digest("hex") }))
