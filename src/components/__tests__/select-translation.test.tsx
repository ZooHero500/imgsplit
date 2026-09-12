import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function LanguageSelect({ value = "en" }: { value?: string }) {
  return (
    <Select value={value}>
      <SelectTrigger aria-label="Language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh-CN">中文</SelectItem>
      </SelectContent>
    </Select>
  )
}

function translateSelectedText() {
  const trigger = screen.getByRole("combobox", { name: "Language" })
  const walker = document.createTreeWalker(trigger, NodeFilter.SHOW_TEXT)
  let text: Node | null
  while ((text = walker.nextNode())) {
    if (text.textContent !== "English") continue
    // Chrome Translate replaces the original text node with nested font elements.
    const outer = document.createElement("font")
    const inner = document.createElement("font")
    inner.textContent = "英语"
    outer.appendChild(inner)
    text.parentNode!.replaceChild(outer, text)
    return
  }
  throw new Error("Expected the selected option's portaled text in the trigger")
}

describe("Select with browser translation", () => {
  it("can unmount after Chrome Translate replaces the selected text", () => {
    const { unmount } = render(<LanguageSelect />)
    translateSelectedText()

    expect(() => unmount()).not.toThrow()
  })

  it("can change the selected option after its text is translated", () => {
    const { rerender, unmount } = render(<LanguageSelect />)
    translateSelectedText()

    expect(() => rerender(<LanguageSelect value="zh-CN" />)).not.toThrow()
    expect(screen.getByRole("combobox", { name: "Language" }).textContent).toBe("中文")
    unmount()
  })
})
