import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
        maximumSizeInBytes: 15 * 1024 * 1024,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ pathname }),
      }),
    });
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : "Upload failed" }, { status: 400 });
  }
}
