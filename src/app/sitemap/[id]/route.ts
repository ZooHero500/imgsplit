import { NextResponse } from "next/server"
import { getSitemapEntriesById, serializeSitemapXml } from "@/lib/seo/sitemap-xml"

export function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  return context.params.then(({ id }) => {
    const entries = getSitemapEntriesById(id)
    if (!entries) {
      return new NextResponse("Not Found", { status: 404 })
    }

    return new NextResponse(serializeSitemapXml(entries), {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  })
}
