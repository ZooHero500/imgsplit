import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act, waitFor } from "@testing-library/react"
import { useAiSegment } from "../use-ai-segment"
import type { RecognizedElement, SegmentResultItem } from "@/types"

const mocks = vi.hoisted(() => {
  let layerIdCounter = 0
  return {
    loadImage: vi.fn<(url: string) => Promise<HTMLImageElement>>(),
    blobToBase64DataUrl: vi.fn(() =>
      Promise.resolve("data:image/png;base64,mock")
    ),
    generateLayerId: vi.fn(() => `layer-${++layerIdCounter}`),
  }
})

vi.mock("@/lib/ai-segmentation", () => ({
  loadImage: mocks.loadImage,
  blobToBase64DataUrl: mocks.blobToBase64DataUrl,
  generateLayerId: mocks.generateLayerId,
}))

const mockLabels: RecognizedElement[] = [
  { label_en: "cat", label_zh: "猫", confidence: 0.95 },
  { label_en: "sofa", label_zh: "沙发", confidence: 0.8 },
]

const mockSegments: SegmentResultItem[] = [
  { label_en: "cat", label_zh: "猫", maskUrl: "https://cdn/mask-cat.png", color: "#3B82F6" },
  { label_en: "sofa", label_zh: "沙发", maskUrl: "https://cdn/mask-sofa.png", color: "#22C55E" },
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
  mocks.loadImage.mockImplementation(() =>
    Promise.resolve(document.createElement("img"))
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe("useAiSegment", () => {
  it("should initialize with empty state", () => {
    const { result } = renderHook(() => useAiSegment())

    expect(result.current.layers).toHaveLength(0)
    expect(result.current.isSegmenting).toBe(false)
    expect(result.current.progress).toEqual({ current: 0, total: 0 })
    expect(result.current.error).toBeNull()
  })

  it("should create one visible layer per segment on success", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ segments: mockSegments }))
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })

    expect(result.current.layers).toHaveLength(2)
    expect(result.current.layers[0]).toMatchObject({
      label_en: "cat",
      label_zh: "猫",
      maskUrl: "https://cdn/mask-cat.png",
      color: "#3B82F6",
      visible: true,
    })
    expect(result.current.layers[0].maskImage).toBeInstanceOf(HTMLImageElement)
    expect(result.current.layers[0].id).not.toBe(result.current.layers[1].id)
    expect(result.current.progress).toEqual({ current: 2, total: 2 })
    expect(result.current.isSegmenting).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it("should POST image and stripped labels to /api/segment", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ segments: [] }))
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    const [url, init] = mockFetch.mock.calls[0]
    expect(url).toBe("/api/segment")
    expect(init?.method).toBe("POST")
    expect(init?.signal).toBeInstanceOf(AbortSignal)

    const body = JSON.parse(init?.body as string) as {
      image: string
      labels: Array<{ label_en: string; label_zh: string }>
    }
    expect(body.image).toBe("data:image/png;base64,mock")
    // confidence must not be sent to the API
    expect(body.labels).toEqual([
      { label_en: "cat", label_zh: "猫" },
      { label_en: "sofa", label_zh: "沙发" },
    ])
  })

  it("should be segmenting while the request is in flight", async () => {
    let resolveFetch!: (response: Response) => void
    mockFetch.mockImplementation(
      () => new Promise<Response>((resolve) => (resolveFetch = resolve))
    )
    const { result } = renderHook(() => useAiSegment())

    let segmentPromise!: Promise<void>
    act(() => {
      segmentPromise = result.current.segment(createImageBlob(), mockLabels)
    })

    expect(result.current.isSegmenting).toBe(true)
    expect(result.current.progress).toEqual({ current: 0, total: 2 })
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))

    await act(async () => {
      resolveFetch(jsonResponse({ segments: mockSegments }))
      await segmentPromise
    })

    expect(result.current.isSegmenting).toBe(false)
    expect(result.current.layers).toHaveLength(2)
  })

  it("should keep the layer with a null maskImage when the mask fails to load", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
    mockFetch.mockResolvedValue(jsonResponse({ segments: [mockSegments[0]] }))
    mocks.loadImage.mockRejectedValue(new Error("broken mask"))
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })

    expect(result.current.layers).toHaveLength(1)
    expect(result.current.layers[0].maskImage).toBeNull()
    expect(result.current.error).toBeNull()
    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })

  it("should surface server error message on HTTP error", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ error: "Too many requests" }, false))
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })

    expect(result.current.error).toBe("Too many requests")
    expect(result.current.layers).toHaveLength(0)
    expect(result.current.isSegmenting).toBe(false)
  })

  it("should fall back to default message when HTTP error has no error field", async () => {
    mockFetch.mockResolvedValue(jsonResponse({}, false))
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })

    expect(result.current.error).toBe("Failed to segment image")
  })

  it("should set error message when fetch throws", async () => {
    mockFetch.mockRejectedValue(new Error("Network down"))
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })

    expect(result.current.error).toBe("Network down")
    expect(result.current.isSegmenting).toBe(false)
  })

  it("should silently stop on abort without setting error", async () => {
    mockFetch.mockRejectedValue(
      new DOMException("The operation was aborted", "AbortError")
    )
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })

    expect(result.current.error).toBeNull()
    expect(result.current.layers).toHaveLength(0)
    expect(result.current.isSegmenting).toBe(false)
  })

  it("should not build layers when reset aborts an in-flight segment", async () => {
    let resolveFetch!: (response: Response) => void
    mockFetch.mockImplementation(
      () => new Promise<Response>((resolve) => (resolveFetch = resolve))
    )
    const { result } = renderHook(() => useAiSegment())

    let segmentPromise!: Promise<void>
    act(() => {
      segmentPromise = result.current.segment(createImageBlob(), mockLabels)
    })
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))

    act(() => result.current.reset())

    await act(async () => {
      resolveFetch(jsonResponse({ segments: mockSegments }))
      await segmentPromise
    })

    expect(result.current.layers).toHaveLength(0)
    expect(result.current.isSegmenting).toBe(false)
  })

  it("should toggle layer visibility by id", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ segments: mockSegments }))
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })

    const targetId = result.current.layers[0].id
    act(() => result.current.toggleLayerVisibility(targetId))

    expect(result.current.layers[0].visible).toBe(false)
    expect(result.current.layers[1].visible).toBe(true)

    act(() => result.current.toggleLayerVisibility(targetId))
    expect(result.current.layers[0].visible).toBe(true)
  })

  it("should reset layers, error and progress", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ segments: mockSegments }))
    const { result } = renderHook(() => useAiSegment())

    await act(async () => {
      await result.current.segment(createImageBlob(), mockLabels)
    })
    expect(result.current.layers).toHaveLength(2)

    act(() => result.current.reset())

    expect(result.current.layers).toHaveLength(0)
    expect(result.current.error).toBeNull()
    expect(result.current.isSegmenting).toBe(false)
    expect(result.current.progress).toEqual({ current: 0, total: 0 })
  })
})
