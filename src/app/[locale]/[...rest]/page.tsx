import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NOT_FOUND_METADATA } from "@/lib/seo/metadata"

export function generateMetadata(): Metadata {
  return NOT_FOUND_METADATA
}

export default function CatchAllPage() {
  notFound()
}
