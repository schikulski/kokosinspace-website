"use client";

import { useActionState } from "react";
import { updateTexts, type TextsState } from "@/app/admin/(panel)/text/actions";
import { TEXT_FIELDS, TEXT_GROUPS, type Texts } from "@/lib/texts";

export function TextsForm({ texts }: { texts: Texts }) {
  const [state, formAction, pending] = useActionState<TextsState, FormData>(updateTexts, {});
  return (
    <form action={formAction}>
      {TEXT_GROUPS.map((g) => (
        <section key={g.id} id={g.id} className="adm-section">
          <div className="adm-section-head">
            <h2 className="adm-h2">{g.title}</h2>
          </div>
          <div className="adm-card">
            <div className="adm-form">
              {TEXT_FIELDS.filter((f) => f.key in g.fields).map((f) => (
                <label key={f.key} className="adm-field">
                  <span className="adm-label">{f.label}</span>
                  {f.multiline ? (
                    <textarea
                      name={f.key}
                      className="adm-textarea"
                      defaultValue={texts[f.key]}
                      placeholder={f.default}
                      rows={f.rows ?? 3}
                    />
                  ) : (
                    <input
                      name={f.key}
                      type={f.url ? "url" : "text"}
                      className="adm-input"
                      defaultValue={texts[f.key]}
                      placeholder={f.default}
                    />
                  )}
                  {f.hint && <span className="adm-hint">{f.hint}</span>}
                </label>
              ))}
            </div>
          </div>
        </section>
      ))}
      <div className="adm-form-actions adm-sticky-save">
        <button type="submit" className="adm-btn adm-btn--primary adm-btn--lg" disabled={pending}>
          {pending ? "Saving…" : "Save text"}
        </button>
        {state.error && <span className="adm-error">{state.error}</span>}
        {state.ok && !pending && <span className="adm-ok">Saved. The site is updated.</span>}
      </div>
    </form>
  );
}
