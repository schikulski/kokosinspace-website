import { del } from "@vercel/blob";

export function isBlobUrl(url: string | null | undefined): url is string {
  return !!url && /\.public\.blob\.vercel-storage\.com\//.test(url);
}

/** Best-effort delete of a Blob-hosted file; ignores errors and non-Blob URLs. */
export async function deleteBlobIfOwned(url: string | null | undefined) {
  if (!isBlobUrl(url) || !process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await del(url);
  } catch {
    // ignore
  }
}
