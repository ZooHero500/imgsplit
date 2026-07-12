import { createPendingSlot } from "@/lib/pending-slot"

const slot = createPendingSlot<File>()

export function setPendingGridUpload(file: File) {
  slot.set(file)
}

export function consumePendingGridUpload(): File | null {
  return slot.consume()
}
