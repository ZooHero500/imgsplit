import { StrictMode } from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { ResultSheet } from "@/components/ResultSheet"
import type { SplitResult } from "@/types"

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}))

describe("ResultSheet", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("keeps the rendered thumbnail object URL alive in React Strict Mode", async () => {
    let nextUrl = 0
    const revokedUrls: string[] = []

    vi.spyOn(URL, "createObjectURL").mockImplementation(
      () => `blob:result-preview-${++nextUrl}`
    )
    vi.spyOn(URL, "revokeObjectURL").mockImplementation((url) => {
      revokedUrls.push(url)
    })

    const result: SplitResult = {
      row: 1,
      col: 1,
      blob: new Blob(["preview"], { type: "image/png" }),
      width: 1200,
      height: 800,
    }

    const { unmount } = render(
      <StrictMode>
        <ResultSheet
          open
          onClose={vi.fn()}
          results={[result]}
          originalFileName="sample"
          fileExtension="png"
          onDownloadSingle={vi.fn()}
          onDownloadAll={vi.fn()}
          selectedKeys={new Set()}
          onToggleSelect={vi.fn()}
          onSelectAll={vi.fn()}
          isAllSelected={false}
          onDownloadSelected={vi.fn()}
        />
      </StrictMode>
    )

    const thumbnail = await screen.findByAltText("sample_r1_c1.png")

    await waitFor(() => {
      expect(thumbnail.getAttribute("src")).toMatch(/^blob:result-preview-/)
    })

    const activeUrl = thumbnail.getAttribute("src")
    expect(activeUrl).not.toBeNull()
    expect(revokedUrls).not.toContain(activeUrl)

    unmount()
    expect(revokedUrls).toContain(activeUrl)
  })
})
