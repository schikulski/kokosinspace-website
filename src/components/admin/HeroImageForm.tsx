"use client";

import { useActionState } from "react";
import type { HeroState } from "@/app/admin/(panel)/hero/actions";
import { ImageUpload } from "./ImageUpload";

export function HeroImageForm({ action }: { action: (prev: HeroState, fd: FormData) => Promise<HeroState> }) {
  // `round` counts successful adds; it keys the upload widget so it remounts (clears) after each add.
  const [state, formAction, pending] = useActionState<HeroState & { round: number }, FormData>(
    async (prev, fd) => {
      const next = await action(prev, fd);
      return { ...next, round: next.ok ? prev.round + 1 : prev.round };
    },
    { round: 0 },
  );

  return (
    <form action={formAction} className="adm-form">
      <ImageUpload key={state.round} name="url" label="New hero photo" folder="hero" />
      <label className="adm-field">
        <span className="adm-label">Alt text</span>
        <input name="alt" className="adm-input" placeholder="Who or what is in the photo (for screen readers)" />
      </label>
      <div className="adm-form-actions">
        <button type="submit" className="adm-btn adm-btn--primary adm-btn--lg" disabled={pending}>
          {pending ? "Adding…" : "Add to rotation"}
        </button>
        {state.error && <span className="adm-error">{state.error}</span>}
        {state.ok && <span className="adm-ok">Added. It&apos;s in the rotation now.</span>}
      </div>
    </form>
  );
}
