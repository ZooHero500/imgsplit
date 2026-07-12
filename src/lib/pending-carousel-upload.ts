import { createPendingSlot } from "@/lib/pending-slot"

const slot = createPendingSlot<File>()

export function setPendingCarouselUpload(file: File) {
  slot.set(file)
}

export function consumePendingCarouselUpload(): File | null {
  return slot.consume()
}
