"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Release } from "@/lib/db/schema";
import type { FormState } from "@/app/admin/(panel)/releases/actions";
import { ImageUpload } from "./ImageUpload";
import { RotateSelect } from "./RotateSelect";

type Props = {
  release?: Release;
  artists: string[];
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
};

export function ReleaseForm({ release, artists, action }: Props) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  return (
    <form action={formAction} className="adm-form">
      <label className="adm-field">
        <span className="adm-label">Title *</span>
        <input name="title" className="adm-input" defaultValue={release?.title ?? ""} required />
      </label>
      <div className="adm-row">
        <label className="adm-field">
          <span className="adm-label">Artist *</span>
          <input name="artist" className="adm-input" defaultValue={release?.artist ?? ""} list="artist-list" required />
          <datalist id="artist-list">
            {artists.map((a) => (
              <option key={a} value={a} />
            ))}
          </datalist>
        </label>
        <label className="adm-field">
          <span className="adm-label">Year</span>
          <input name="year" className="adm-input" defaultValue={release?.year ?? ""} placeholder="2026" inputMode="numeric" />
        </label>
      </div>
      <ImageUpload name="coverUrl" label="Cover" initialUrl={release?.coverUrl} folder="releases" square />
      <label className="adm-field">
        <span className="adm-label">Link</span>
        <input name="url" type="url" className="adm-input" defaultValue={release?.url ?? ""} placeholder="https://… (Bandcamp, Spotify, …)" />
        <span className="adm-hint">Where the cover should link to. Leave empty for TBA releases.</span>
      </label>
      <div className="adm-row">
        <RotateSelect name="rotate" label="Cover tilt" value={release?.rotate ?? "-2deg"} />
      </div>
      <div className="adm-form-actions">
        <button type="submit" className="adm-btn adm-btn--primary adm-btn--lg" disabled={pending}>
          {pending ? "Saving…" : release ? "Save release" : "Add release"}
        </button>
        <Link href="/admin#releases" className="adm-btn">
          Cancel
        </Link>
        {state.error && <span className="adm-error">{state.error}</span>}
      </div>
    </form>
  );
}
