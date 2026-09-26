"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";

type Props = {
  name: string;
  label: string;
  initialUrl?: string | null;
  folder: "bands" | "releases";
  square?: boolean;
};

export function ImageUpload({ name, label, initialUrl, folder, square }: Props) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").toLowerCase();
      const blob = await upload(`${folder}/${safe}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      setUrl(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="adm-field adm-upload">
      <span className="adm-label">{label}</span>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className={`adm-upload-preview${square ? " adm-upload-preview--sq" : ""}`} />
      ) : (
        <div className={`adm-upload-preview${square ? " adm-upload-preview--sq" : ""}`} />
      )}
      <input type="hidden" name={name} value={url} />
      <div className="adm-upload-row">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          disabled={busy}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        {url && (
          <button type="button" className="adm-btn adm-btn--danger" onClick={() => setUrl("")} disabled={busy}>
            Remove
          </button>
        )}
        {busy && <span className="adm-hint">Uploading…</span>}
      </div>
      {error && <span className="adm-error">{error}</span>}
      <span className="adm-hint">JPG, PNG or WebP, up to 15 MB. {square ? "Square covers look best." : "Landscape 4:3 works best."}</span>
    </div>
  );
}
