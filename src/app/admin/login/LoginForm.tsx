"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="adm-form">
      <label className="adm-field">
        <span className="adm-label">Username</span>
        <input name="username" className="adm-input" autoComplete="username" defaultValue={state.username ?? ""} required autoFocus />
      </label>
      <label className="adm-field">
        <span className="adm-label">Password</span>
        <input name="password" type="password" className="adm-input" autoComplete="current-password" required />
      </label>
      <div className="adm-form-actions">
        <button type="submit" className="adm-btn adm-btn--primary adm-btn--lg" disabled={pending}>
          {pending ? "Checking…" : "Log in →"}
        </button>
        {state.error && <span className="adm-error">{state.error}</span>}
      </div>
    </form>
  );
}
