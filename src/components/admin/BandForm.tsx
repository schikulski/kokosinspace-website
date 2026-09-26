"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Band } from "@/lib/db/schema";
import type { FormState } from "@/app/admin/(panel)/bands/actions";
import { ImageUpload } from "./ImageUpload";
import { RotateSelect } from "./RotateSelect";

type Props = {
  band?: Band;
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
};

export function BandForm({ band, action }: Props) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  return (
    <form action={formAction} className="adm-form">
      <label className="adm-field">
        <span className="adm-label">Name *</span>
        <input name="name" className="adm-input" defaultValue={band?.name ?? ""} required />
      </label>
      <label className="adm-field">
        <span className="adm-label">Blurb</span>
        <textarea name="blurb" className="adm-textarea" defaultValue={band?.blurb ?? ""} />
        <span className="adm-hint">One or two hand-written sentences. Shown under the band name.</span>
      </label>
      <ImageUpload name="photoUrl" label="Photo" initialUrl={band?.photoUrl} folder="bands" />
      <label className="adm-field">
        <span className="adm-label">Instagram URL</span>
        <input name="instagram" type="url" className="adm-input" defaultValue={band?.instagram ?? ""} placeholder="https://www.instagram.com/…" />
      </label>
      <label className="adm-field">
        <span className="adm-label">Spotify URL</span>
        <input name="spotify" type="url" className="adm-input" defaultValue={band?.spotify ?? ""} placeholder="https://open.spotify.com/artist/…" />
        <span className="adm-hint">Leave empty to hide the Spotify chip.</span>
      </label>
      <label className="adm-field">
        <span className="adm-label">Bandcamp URL</span>
        <input name="bandcamp" type="url" className="adm-input" defaultValue={band?.bandcamp ?? ""} placeholder="https://….bandcamp.com" />
      </label>
      <div className="adm-row">
        <RotateSelect name="rotate" label="Photo tilt" value={band?.rotate ?? "-2deg"} />
        <RotateSelect name="rotateLabel" label="Name tilt" value={band?.rotateLabel ?? "1deg"} />
      </div>
      <div className="adm-form-actions">
        <button type="submit" className="adm-btn adm-btn--primary adm-btn--lg" disabled={pending}>
          {pending ? "Saving…" : band ? "Save band" : "Add band"}
        </button>
        <Link href="/admin#bands" className="adm-btn">
          Cancel
        </Link>
        {state.error && <span className="adm-error">{state.error}</span>}
      </div>
    </form>
  );
}
