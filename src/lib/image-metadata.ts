export interface ImageMetadata {
  width: number
  height: number
  frames: number
}

function dimensions(width: number, height: number, frames = 1): ImageMetadata {
  if (![width, height, frames].every((value) => Number.isSafeInteger(value) && value > 0)) {
    throw new Error("Invalid image dimensions")
  }
  return { width, height, frames }
}

/** Read small header slices; never decode pixels or read an entire large file. */
export async function readImageMetadata(file: Blob): Promise<ImageMetadata> {
  let reads = 0
  const read = async (offset: number, length: number): Promise<DataView> => {
    if (++reads > 2048 || offset < 0 || offset + length > file.size) throw new Error("Invalid image header")
    const slice = file.slice(offset, offset + length)
    const buffer = typeof slice.arrayBuffer === "function" ? await slice.arrayBuffer() : await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = () => reject(reader.error)
      reader.onabort = () => reject(new Error("Image header read canceled"))
      reader.readAsArrayBuffer(slice)
    })
    return new DataView(buffer)
  }
  const text = (view: DataView, offset: number, length: number) =>
    String.fromCharCode(...Array.from({ length }, (_, i) => view.getUint8(offset + i)))
  const uint24 = (view: DataView, offset: number) => view.getUint8(offset) + view.getUint8(offset + 1) * 256 + view.getUint8(offset + 2) * 65536
  const signature = await read(0, 12)

  if (signature.getUint32(0) === 0x89504e47 && signature.getUint32(4) === 0x0d0a1a0a) {
    const header = await read(8, 25)
    if (header.getUint32(0) !== 13 || text(header, 4, 4) !== "IHDR") throw new Error("Invalid PNG header")
    const size = dimensions(header.getUint32(8), header.getUint32(12))
    let offset = 33
    while (offset + 8 <= file.size) {
      const chunk = await read(offset, 8)
      const length = chunk.getUint32(0)
      const type = text(chunk, 4, 4)
      if (offset + length + 12 > file.size) throw new Error("Truncated PNG")
      if (type === "IDAT") return size
      if (type === "acTL") {
        if (length !== 8) throw new Error("Invalid APNG header")
        size.frames = dimensions(size.width, size.height, (await read(offset + 8, 8)).getUint32(0)).frames
      }
      if (type === "IEND") break
      offset += length + 12
    }
    throw new Error("Missing PNG data")
  }

  if (signature.getUint16(0) === 0xffd8) {
    let offset = 2
    const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf])
    while (offset + 4 <= file.size) {
      const marker = await read(offset, 4)
      if (marker.getUint8(0) !== 0xff) throw new Error("Invalid JPEG marker")
      const type = marker.getUint8(1)
      if (type === 0xff) { offset++; continue }
      if (type === 0xda || type === 0xd9) break
      if (type === 0x01 || (type >= 0xd0 && type <= 0xd7)) { offset += 2; continue }
      const length = marker.getUint16(2)
      if (length < 2 || offset + 2 + length > file.size) throw new Error("Invalid JPEG segment")
      if (frameMarkers.has(type)) {
        if (length < 8) throw new Error("Invalid JPEG frame")
        const frame = await read(offset + 4, 6)
        return dimensions(frame.getUint16(3), frame.getUint16(1))
      }
      offset += length + 2
    }
    throw new Error("Missing JPEG dimensions")
  }

  if (text(signature, 0, 4) === "RIFF" && text(signature, 8, 4) === "WEBP") {
    const end = signature.getUint32(4, true) + 8
    if (end > file.size || end < 20) throw new Error("Truncated WebP")
    let offset = 12
    let animatedSize: ImageMetadata | undefined
    let frameCount = 0
    while (offset + 8 <= end) {
      const chunk = await read(offset, 8)
      const type = text(chunk, 0, 4)
      const length = chunk.getUint32(4, true)
      if (offset + 8 + length + (length % 2) > end) throw new Error("Invalid WebP chunk")
      if (type === "VP8X") {
        if (length !== 10) throw new Error("Invalid WebP extended header")
        const header = await read(offset + 8, 10)
        const size = dimensions(uint24(header, 4) + 1, uint24(header, 7) + 1)
        if (!(header.getUint8(0) & 2)) return size
        animatedSize = size
      } else if (type === "ANMF" && animatedSize) {
        if (length < 16) throw new Error("Invalid WebP frame")
        frameCount++
      } else if (type === "VP8 " && !animatedSize) {
        if (length < 10) throw new Error("Invalid VP8 header")
        const header = await read(offset + 8, 10)
        if ((header.getUint8(0) & 1) || text(header, 3, 3) !== "\x9d\x01\x2a") throw new Error("Invalid VP8 frame")
        return dimensions(header.getUint16(6, true) & 0x3fff, header.getUint16(8, true) & 0x3fff)
      } else if (type === "VP8L" && !animatedSize) {
        if (length < 5) throw new Error("Invalid VP8L header")
        const header = await read(offset + 8, 5)
        if (header.getUint8(0) !== 0x2f) throw new Error("Invalid VP8L signature")
        const bits = header.getUint32(1, true)
        return dimensions((bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1)
      }
      offset += length + 8 + (length % 2)
    }
    if (animatedSize && frameCount) return { ...animatedSize, frames: frameCount }
  }
  throw new Error("Unsupported or unreadable image header")
}
