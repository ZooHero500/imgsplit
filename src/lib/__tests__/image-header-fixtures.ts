/** Minimal headers for preflight tests, not decodable image fixtures. */
export function pngHeader(width = 100, height = 50, size?: number, frames = 1): File {
  const bytes = new Uint8Array(frames > 1 ? 65 : 45)
  const view = new DataView(bytes.buffer)
  bytes.set([137, 80, 78, 71, 13, 10, 26, 10])
  view.setUint32(8, 13)
  bytes.set([73, 72, 68, 82], 12)
  view.setUint32(16, width)
  view.setUint32(20, height)
  bytes[24] = 8
  bytes[25] = 2
  let offset = 33
  if (frames > 1) {
    view.setUint32(offset, 8)
    bytes.set([97, 99, 84, 76], offset + 4)
    view.setUint32(offset + 8, frames)
    offset += 20
  }
  bytes.set([73, 68, 65, 84], offset + 4)
  const file = new File([bytes], "sample.png", { type: "image/png" })
  if (size) Object.defineProperty(file, "size", { value: size })
  return file
}

export function jpegHeader(width: number, height: number, progressive = false): File {
  const bytes = new Uint8Array([255, 216, 255, 225, 0, 4, 0, 0, 255, progressive ? 194 : 192, 0, 11, 8, 0, 0, 0, 0, 1, 1, 17, 0, 255, 217])
  const view = new DataView(bytes.buffer)
  view.setUint16(13, height)
  view.setUint16(15, width)
  return new File([bytes], "sample.jpg", { type: "image/jpeg" })
}

export function webpHeader(kind: "VP8 " | "VP8L" | "VP8X", width: number, height: number): File {
  const size = kind === "VP8L" ? 6 : 10
  const bytes = new Uint8Array(20 + size)
  const view = new DataView(bytes.buffer)
  bytes.set(new TextEncoder().encode("RIFF"))
  view.setUint32(4, bytes.length - 8, true)
  bytes.set(new TextEncoder().encode("WEBP"), 8)
  bytes.set(new TextEncoder().encode(kind), 12)
  view.setUint32(16, kind === "VP8L" ? 5 : size, true)
  if (kind === "VP8 ") {
    bytes.set([0x9d, 1, 0x2a], 23)
    view.setUint16(26, width, true)
    view.setUint16(28, height, true)
  } else if (kind === "VP8L") {
    bytes[20] = 0x2f
    view.setUint32(21, (width - 1) | ((height - 1) << 14), true)
  } else {
    view.setUint32(24, width - 1, true)
    bytes[27] = (height - 1) & 255
    bytes[28] = ((height - 1) >>> 8) & 255
    bytes[29] = ((height - 1) >>> 16) & 255
  }
  return new File([bytes], "sample.webp", { type: "image/webp" })
}
