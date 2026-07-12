import { describe, it, expect } from "vitest"
import {
  getFileExtension,
  getFileNameWithoutExtension,
  stripExtension,
} from "../utils"

describe("getFileExtension", () => {
  it("maps jpeg to jpg and png to png", () => {
    expect(getFileExtension("image/jpeg")).toBe("jpg")
    expect(getFileExtension("image/png")).toBe("png")
  })

  it("maps webp and unknown types to png", () => {
    expect(getFileExtension("image/webp")).toBe("png")
    expect(getFileExtension("image/gif")).toBe("png")
    expect(getFileExtension("")).toBe("png")
  })
})

describe("getFileNameWithoutExtension", () => {
  it("removes the last extension only", () => {
    expect(getFileNameWithoutExtension("photo.png")).toBe("photo")
    expect(getFileNameWithoutExtension("archive.tar.gz")).toBe("archive.tar")
  })

  it("leaves names without extension untouched", () => {
    expect(getFileNameWithoutExtension("photo")).toBe("photo")
  })

  it("may return an empty string (no fallback)", () => {
    expect(getFileNameWithoutExtension(".png")).toBe("")
  })
})

describe("stripExtension", () => {
  it("removes the extension", () => {
    expect(stripExtension("photo.png")).toBe("photo")
    expect(stripExtension("my.photo.jpg")).toBe("my.photo")
  })

  it('falls back to "image" by default when the result is empty', () => {
    expect(stripExtension(".png")).toBe("image")
    expect(stripExtension("")).toBe("image")
  })

  it("honors a custom fallback", () => {
    expect(stripExtension(".png", "social-export")).toBe("social-export")
    expect(stripExtension("", "")).toBe("")
  })
})
