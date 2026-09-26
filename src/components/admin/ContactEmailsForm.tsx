"use client";

import { useActionState } from "react";
import type { ContactEmails } from "@/lib/db/queries";
import { updateContactEmails, type FormState } from "@/app/admin/(panel)/settings/actions";

export function ContactEmailsForm({ bookingEmail, labelEmail }: ContactEmails) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(updateContactEmails, {});
  return (
    <form action={formAction} className="adm-form">
      <div className="adm-row">
        <label className="adm-field">
          <span className="adm-label">Booking email *</span>
          <input name="bookingEmail" type="email" className="adm-input" defaultValue={bookingEmail} required />
          <span className="adm-hint">Used by the Booking buttons in the header and contact section.</span>
        </label>
        <label className="adm-field">
          <span className="adm-label">Label email *</span>
          <input name="labelEmail" type="email" className="adm-input" defaultValue={labelEmail} required />
          <span className="adm-hint">Used by the Label and Label contact buttons.</span>
        </label>
      </div>
      <div className="adm-form-actions">
        <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>
          {pending ? "Saving…" : "Save emails"}
        </button>
        {state.error && <span className="adm-error">{state.error}</span>}
        {state.ok && !pending && <span className="adm-ok">Saved. The site is updated.</span>}
      </div>
    </form>
  );
}
