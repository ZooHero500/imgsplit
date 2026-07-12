import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act, waitFor } from "@testing-library/react"
import { useAiAnalyze } from "../use-ai-analyze"
import type { RecognizedElement } from "@/types"

const mockElements: RecognizedElement[] = [
  { label_en: "cat", label_zh: "猫", confidence: 0.95 },
  { label_en: "sofa", label_zh: "沙发", confidence: 0.8 },
]

function jsonResponse(body: unknown, ok = true): Response {
  return {
    ok,
    json: () => Promise.resolve(body),
  } as Response
}

function createImageBlob(): Blob {
  return new Blob(["test"], { type: "image/png" })
}

const mockFetch = vi.fn<typeof fetch>()

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe("useAiAnalyze", () => {
  it("should initialize with empty state", () => {
    const { result } = renderHook(() => useAiAnalyze())

    expect(result.current.elements).toHaveLength(0)
    expect(result.current.isAnalyzing).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it("should set elements and return them on success", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ elements: mockElements }))
    const { result } = renderHook(() => useAiAnalyze())

    let returned: RecognizedElement[] = []
    await act(async () => {
      returned = await result.current.analyze(createImageBlob())
    })

    expect(returned).toEqual(mockElements)
    expect(result.current.elements).toEqual(mockElements)
    expect(result.current.isAnalyzing).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it("should POST the image as a base64 data URL to /api/analyze", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ elements: [] }))
    const { result } = renderHook(() => useAiAnalyze())

    await act(async () => {
      await result.current.analyze(createImageBlob())
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    const [url, init] = mockFetch.mock.calls[0]
    expect(url).toBe("/api/analyze")
    expect(init?.method).toBe("POST")
    expect(init?.signal).toBeInstanceOf(AbortSignal)

    const body = JSON.parse(init?.body as string) as { image: string }
    expect(body.image.startsWith("data:image/png;base64,")).toBe(true)
  })

  it("should be analyzing while the request is in flight", async () => {
    let resolveFetch!: (response: Response) => void
    mockFetch.mockImplementation(
      () => new Promise<Response>((resolve) => (resolveFetch = resolve))
    )
    const { result } = renderHook(() => useAiAnalyze())

    let analyzePromise!: Promise<RecognizedElement[]>
    act(() => {
      analyzePromise = result.current.analyze(createImageBlob())
    })

    expect(result.current.isAnalyzing).toBe(true)
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))

    await act(async () => {
      resolveFetch(jsonResponse({ elements: mockElements }))
      await analyzePromise
    })

    expect(result.current.isAnalyzing).toBe(false)
    expect(result.current.elements).toEqual(mockElements)
  })

  it("should surface server error message on HTTP error", async () => {
    mockFetch.mockResolvedValue(
      jsonResponse({ error: "Rate limit exceeded" }, false)
    )
    const { result } = renderHook(() => useAiAnalyze())

    let returned: RecognizedElement[] = [mockElements[0]]
    await act(async () => {
      returned = await result.current.analyze(createImageBlob())
    })

    expect(returned).toEqual([])
    expect(result.current.error).toBe("Rate limit exceeded")
    expect(result.current.elements).toHaveLength(0)
    expect(result.current.isAnalyzing).toBe(false)
  })

  it("should fall back to default message when HTTP error has no error field", async () => {
    mockFetch.mockResolvedValue(jsonResponse({}, false))
    const { result } = renderHook(() => useAiAnalyze())

    await act(async () => {
      await result.current.analyze(createImageBlob())
    })

    expect(result.current.error).toBe("Failed to analyze image")
  })

  it("should set error message when fetch throws", async () => {
    mockFetch.mockRejectedValue(new Error("Network down"))
    const { result } = renderHook(() => useAiAnalyze())

    let returned: RecognizedElement[] = [mockElements[0]]
    await act(async () => {
      returned = await result.current.analyze(createImageBlob())
    })

    expect(returned).toEqual([])
    expect(result.current.error).toBe("Network down")
  })

  it("should report unknown error for non-Error rejection", async () => {
    mockFetch.mockRejectedValue("boom")
    const { result } = renderHook(() => useAiAnalyze())

    await act(async () => {
      await result.current.analyze(createImageBlob())
    })

    expect(result.current.error).toBe("Unknown error")
  })

  it("should silently return empty result on abort", async () => {
    mockFetch.mockRejectedValue(
      new DOMException("The operation was aborted", "AbortError")
    )
    const { result } = renderHook(() => useAiAnalyze())

    let returned: RecognizedElement[] = [mockElements[0]]
    await act(async () => {
      returned = await result.current.analyze(createImageBlob())
    })

    expect(returned).toEqual([])
    expect(result.current.error).toBeNull()
    expect(result.current.isAnalyzing).toBe(false)
  })

  it("should reset state", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ elements: mockElements }))
    const { result } = renderHook(() => useAiAnalyze())

    await act(async () => {
      await result.current.analyze(createImageBlob())
    })
    expect(result.current.elements).toHaveLength(2)

    act(() => result.current.reset())

    expect(result.current.elements).toHaveLength(0)
    expect(result.current.error).toBeNull()
    expect(result.current.isAnalyzing).toBe(false)
  })
})
