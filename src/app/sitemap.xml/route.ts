import { NextResponse } from "next/server"
import { SITE_BASE_URL } from "@/lib/seo/metadata"
import { serializeSitemapIndexXml } from "@/lib/seo/sitemap-xml"

export function GET() {
  const xml = serializeSitemapIndexXml([
    `${SITE_BASE_URL}/sitemap/0.xml`,
    `${SITE_BASE_URL}/sitemap/1.xml`,
  ])

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
