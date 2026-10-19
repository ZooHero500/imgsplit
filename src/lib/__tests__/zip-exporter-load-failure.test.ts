import { expect, it, vi } from "vitest"
import { exportAsZip } from "../zip-exporter"

vi.mock("jszip", () => { throw new Error("Failed to fetch dynamically imported module") })

it("reports a lazy ZIP module load failure separately from packing", async () => {
  await expect(exportAsZip({ originalFileName: "photo", results: [], fileExtension: "png" }))
    .rejects.toMatchObject({ code: "zip_load_failed" })
})
