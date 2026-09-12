import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { ResultSheet } from "@/components/ResultSheet"

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: { count?: number }) =>
    params?.count === undefined ? key : `${key}: ${params.count}`,
}))

function replaceTranslatedText(root: Element, original: string) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let text: Node | null
  while ((text = walker.nextNode())) {
    if (text.textContent !== original) continue
    const outer = document.createElement("font")
    const inner = document.createElement("font")
    inner.textContent = `Translated ${original}`
    outer.appendChild(inner)
    text.parentNode!.replaceChild(outer, text)
    return
  }
  throw new Error(`Missing text to translate: ${original}`)
}

describe("ResultSheet with browser translation", () => {
  afterEach(() => vi.restoreAllMocks())

  it("updates result and download counts after translation replaces their text", () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:translation-preview")
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {})
    const props: React.ComponentProps<typeof ResultSheet> = {
      open: true,
      onClose: vi.fn(),
      results: [],
      originalFileName: "sample",
      fileExtension: "png",
      onDownloadSingle: vi.fn(),
      onDownloadAll: vi.fn(),
      selectedKeys: new Set(),
      onToggleSelect: vi.fn(),
      onSelectAll: vi.fn(),
      isAllSelected: false,
      onDownloadSelected: vi.fn(),
    }
    const { container, rerender, unmount } = render(<ResultSheet {...props} />)
    replaceTranslatedText(container, "imageCount: 0")
    replaceTranslatedText(container, "downloadSelected")

    rerender(
      <ResultSheet
        {...props}
        results={[{ row: 1, col: 1, width: 100, height: 100, blob: new Blob() }]}
        selectedKeys={new Set(["1-1"])}
      />
    )

    expect(screen.getByText("imageCount: 1")).toBeTruthy()
    expect(screen.getByRole("button", { name: "downloadSelectedCount: 1" })).toBeTruthy()
    unmount()
  })
})
