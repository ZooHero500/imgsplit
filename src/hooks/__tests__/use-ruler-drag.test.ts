import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { toast } from "sonner"
import { useRulerDrag } from "../use-ruler-drag"

vi.mock("sonner", () => ({
  toast: { error: vi.fn() },
}))

function mockRect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  }
}

const messages = {
  horizontalLimitReached: "h-limit",
  verticalLimitReached: "v-limit",
}

// Geometry used everywhere below:
// editor rect: left 20, top 40 / stage rect: left 120, top 140, 600x400
// viewport: scale 2, position { x: 10, y: 20 }
function setup(overrides?: Partial<Parameters<typeof useRulerDrag>[0]>) {
  const editor = document.createElement("div")
  editor.getBoundingClientRect = () => mockRect(20, 40, 800, 600)
  const stage = document.createElement("div")
  stage.getBoundingClientRect = () => mockRect(120, 140, 600, 400)

  const addLineAtPosition = vi.fn()
  const calculateSnap = vi.fn((position: number) => position)

  const options: Parameters<typeof useRulerDrag>[0] = {
    editorRef: { current: editor },
    stageContainerRef: { current: stage },
    viewportScale: 2,
    viewportPosition: { x: 10, y: 20 },
    addLineAtPosition,
    calculateSnap,
    canAddHorizontal: true,
    canAddVertical: true,
    rulerThickness: 24,
    messages,
    ...overrides,
  }

  const view = renderHook(() => useRulerDrag(options))
  return { ...view, addLineAtPosition, calculateSnap, editor, stage }
}

function dispatchMouse(type: "mousemove" | "mouseup", clientX: number, clientY: number) {
  act(() => {
    document.dispatchEvent(new MouseEvent(type, { clientX, clientY }))
  })
}

beforeEach(() => {
  // Make requestAnimationFrame synchronous so preview math is deterministic
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    cb(0)
    return 1
  })
  vi.stubGlobal("cancelAnimationFrame", vi.fn())
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe("useRulerDrag - startDrag", () => {
  it("should initialize idle", () => {
    const { result } = setup()

    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOrientation).toBeNull()
    expect(result.current.previewPosition).toBe(0)
  })

  it("should start a horizontal drag when allowed", () => {
    const { result } = setup()

    act(() => result.current.startDrag("horizontal"))

    expect(result.current.isDragging).toBe(true)
    expect(result.current.dragOrientation).toBe("horizontal")
  })

  it("should block horizontal drag and toast when limit reached", () => {
    const { result } = setup({ canAddHorizontal: false })

    act(() => result.current.startDrag("horizontal"))

    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOrientation).toBeNull()
    expect(vi.mocked(toast.error)).toHaveBeenCalledWith("h-limit")
  })

  it("should block vertical drag and toast when limit reached", () => {
    const { result } = setup({ canAddVertical: false })

    act(() => result.current.startDrag("vertical"))

    expect(result.current.isDragging).toBe(false)
    expect(vi.mocked(toast.error)).toHaveBeenCalledWith("v-limit")
  })
})

describe("useRulerDrag - preview position math", () => {
  it("should map mousemove to image coords and back to editor coords (horizontal)", () => {
    const { result, calculateSnap } = setup()

    act(() => result.current.startDrag("horizontal"))
    dispatchMouse("mousemove", 300, 340)

    // stageScreenY = 340 - 140 = 200; imagePos = (200 - 20) / 2 = 90
    expect(calculateSnap).toHaveBeenCalledWith(90, "horizontal")
    // screenPos = 90 * 2 + 20 + (140 - 40) = 300
    expect(result.current.previewPosition).toBe(300)
  })

  it("should map mousemove to image coords and back to editor coords (vertical)", () => {
    const { result, calculateSnap } = setup()

    act(() => result.current.startDrag("vertical"))
    dispatchMouse("mousemove", 320, 300)

    // stageScreenX = 320 - 120 = 200; imagePos = (200 - 10) / 2 = 95
    expect(calculateSnap).toHaveBeenCalledWith(95, "vertical")
    // screenPos = 95 * 2 + 10 + (120 - 20) = 300
    expect(result.current.previewPosition).toBe(300)
  })

  it("should use the snapped position for the preview", () => {
    const { result } = setup({
      // snap everything down to a multiple of 100 image pixels
      calculateSnap: (position: number) => Math.floor(position / 100) * 100,
    })

    act(() => result.current.startDrag("horizontal"))
    dispatchMouse("mousemove", 300, 340)

    // imagePos = 90 -> snapped to 0 -> screenPos = 0 * 2 + 20 + (140 - 40) = 120
    expect(result.current.previewPosition).toBe(120)
  })

  it("should ignore mousemove when not dragging", () => {
    const { result, calculateSnap } = setup()

    dispatchMouse("mousemove", 300, 340)

    expect(calculateSnap).not.toHaveBeenCalled()
    expect(result.current.previewPosition).toBe(0)
  })
})

describe("useRulerDrag - drop (mouseup)", () => {
  it("should add a horizontal line when dropped inside the canvas", () => {
    const { result, addLineAtPosition } = setup()

    act(() => result.current.startDrag("horizontal"))
    dispatchMouse("mouseup", 300, 340)

    // imagePos = (340 - 140 - 20) / 2 = 90
    expect(addLineAtPosition).toHaveBeenCalledWith("horizontal", 90)
    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOrientation).toBeNull()
  })

  it("should add a vertical line when dropped inside the canvas", () => {
    const { result, addLineAtPosition } = setup()

    act(() => result.current.startDrag("vertical"))
    dispatchMouse("mouseup", 320, 300)

    // imagePos = (320 - 120 - 10) / 2 = 95
    expect(addLineAtPosition).toHaveBeenCalledWith("vertical", 95)
  })

  it("should round the snapped position before adding a line", () => {
    const { result, addLineAtPosition } = setup({
      calculateSnap: (position: number) => position + 0.6,
    })

    act(() => result.current.startDrag("horizontal"))
    dispatchMouse("mouseup", 300, 340)

    // snapped = 90 + 0.6 = 90.6 -> rounded to 91
    expect(addLineAtPosition).toHaveBeenCalledWith("horizontal", 91)
  })

  it("should not add a line when dropped outside the canvas", () => {
    const { result, addLineAtPosition } = setup()

    act(() => result.current.startDrag("horizontal"))
    // stage starts at x=120; drop far left of it
    dispatchMouse("mouseup", 10, 340)

    expect(addLineAtPosition).not.toHaveBeenCalled()
    expect(result.current.isDragging).toBe(false)
  })

  it("should ignore mouseup when no drag is active", () => {
    const { addLineAtPosition } = setup()

    dispatchMouse("mouseup", 300, 340)

    expect(addLineAtPosition).not.toHaveBeenCalled()
  })
})

describe("useRulerDrag - isNearRulerZone", () => {
  it("should detect the horizontal ruler zone below the editor top edge", () => {
    const { result } = setup()

    // editor top = 40, thickness = 24
    expect(result.current.isNearRulerZone(50, "horizontal")).toBe(true)
    expect(result.current.isNearRulerZone(70, "horizontal")).toBe(false)
  })

  it("should detect the vertical ruler zone right of the editor left edge", () => {
    const { result } = setup()

    // editor left = 20, thickness = 24
    expect(result.current.isNearRulerZone(30, "vertical")).toBe(true)
    expect(result.current.isNearRulerZone(60, "vertical")).toBe(false)
  })

  it("should return false when the editor ref is empty", () => {
    const { result } = setup({ editorRef: { current: null } })

    expect(result.current.isNearRulerZone(50, "horizontal")).toBe(false)
  })
})

describe("useRulerDrag - cleanup", () => {
  it("should remove document listeners and cancel pending frame on unmount", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener")
    const cancelSpy = vi.fn()
    vi.stubGlobal("cancelAnimationFrame", cancelSpy)

    const { result, unmount, addLineAtPosition } = setup()
    act(() => result.current.startDrag("horizontal"))

    unmount()

    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith("mouseup", expect.any(Function))
    expect(cancelSpy).toHaveBeenCalled()

    // Listeners are gone: events no longer reach the handlers
    dispatchMouse("mouseup", 300, 340)
    expect(addLineAtPosition).not.toHaveBeenCalled()

    removeSpy.mockRestore()
  })
})
