import { createPendingSlot } from "@/lib/pending-slot"
import type { UploadResult } from "@/types"

const slot = createPendingSlot<UploadResult[]>()

export function setPendingUpload(data: UploadResult[]) {
  slot.set(data)
}

export function consumePendingUpload(): UploadResult[] | null {
  return slot.consume()
}
