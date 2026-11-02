import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { UploadZone } from "../UploadZone"
import { SingleImageUploadZone } from "../SingleImageUploadZone"
import { pngHeader } from "@/lib/__tests__/image-header-fixtures"

vi.mock("next-intl", () => ({ useTranslations: () => (key: string, values?: Record<string, unknown>) =>
  values?.count === undefined ? key : `${key} ${values.count}` }))
vi.mock("sonner", () => ({ toast: { warning: vi.fn() } }))

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

function mockDecode(auto = true) {
  const pending: Array<(outcome?: "success" | "failure") => void> = []
  vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test")
  vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {})
  vi.stubGlobal("Image", class {
    naturalWidth = 100
    naturalHeight = 50
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    set src(value: string) {
      if (!value) return
      const resolve = (outcome?: "success" | "failure") => outcome === "failure" ? this.onerror?.() : this.onload?.()
      if (auto) queueMicrotask(resolve)
      else pending.push(resolve)
    }
  })
  return pending
}

describe("upload failure recovery", () => {
  it("lets the user explicitly open the safe part of a rejected batch without decoding the unsafe image", async () => {
    mockDecode()
    const onImagesLoaded = vi.fn()
    const { container } = render(<UploadZone onImagesLoaded={onImagesLoaded} />)
    const safe = pngHeader()
    const unsafe = pngHeader(10000, 10000)
    fireEvent.change(container.querySelector('input[type="file"]')!, { target: { files: [safe, unsafe] } })
    const recover = await screen.findByRole("button", { name: "openSafeImages 1" })
    expect(URL.createObjectURL).not.toHaveBeenCalled()
    expect(onImagesLoaded).not.toHaveBeenCalled()
    fireEvent.click(recover)
    await waitFor(() => expect(onImagesLoaded).toHaveBeenCalledTimes(1))
    expect(onImagesLoaded.mock.calls[0][0]).toHaveLength(1)
    expect(onImagesLoaded.mock.calls[0][0][0].file).toBe(safe)
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole("alert")).toBeNull()
  })

  it("does not start another decode while a selection is still loading", async () => {
    const pending = mockDecode(false)
    const onImagesLoaded = vi.fn()
    const { container } = render(<UploadZone onImagesLoaded={onImagesLoaded} />)
    const dropZone = container.firstElementChild!
    const files = [pngHeader()]
    fireEvent.drop(dropZone, { dataTransfer: { files } })
    await waitFor(() => expect(pending).toHaveLength(1))
    fireEvent.drop(dropZone, { dataTransfer: { files } })
    // Resolve the real in-flight operation before checking for a second callback.
    await act(async () => { pending.forEach(resolve => resolve()) })
    await waitFor(() => expect(onImagesLoaded).toHaveBeenCalledTimes(1))
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
  })

  it("keeps a single-image failure after picker cancellation and retries the original file", async () => {
    const pending = mockDecode(false)
    const onImageLoaded = vi.fn()
    const { container } = render(<SingleImageUploadZone namespace="gridUpload" onImageLoaded={onImageLoaded} />)
    const input = container.querySelector('input[type="file"]')!
    const file = pngHeader()
    fireEvent.change(input, { target: { files: [file] } })
    await waitFor(() => expect(pending).toHaveLength(1))
    await act(async () => { pending[0]("failure") })
    expect((await screen.findByRole("alert")).textContent).toBe("loadFailed")
    fireEvent.change(input, { target: { files: [] } })
    expect(screen.getByRole("alert").textContent).toBe("loadFailed")
    fireEvent.click(screen.getByRole("button", { name: "retrySelection" }))
    await waitFor(() => expect(pending).toHaveLength(2))
    await act(async () => { pending[1]() })
    expect(onImageLoaded).toHaveBeenCalledTimes(1)
    expect(onImageLoaded.mock.calls[0][1]).toBe(file)
    expect(screen.queryByRole("alert")).toBeNull()
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(2)
  })
})
