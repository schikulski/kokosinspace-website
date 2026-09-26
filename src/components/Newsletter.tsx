"use client";

import { useState, type FormEvent } from "react";
import styles from "./Newsletter.module.css";

type Status = { state: "idle" } | { state: "loading" } | { state: "ok"; message: string } | { state: "error"; message: string };

export function Newsletter() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), name: data.get("name"), website: data.get("website") }),
      });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(json.message || "Something went wrong.");
      setStatus({ state: "ok", message: json.message || "You're in. Kokos says hi." });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <div className={`paper ${styles.card}`}>
      <h2 className={styles.heading}>Get the newsletter, no spam, just space</h2>
      {status.state === "ok" ? (
        <p className={`hand ${styles.success}`} role="status">
          {status.message}
        </p>
      ) : (
        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input name="name" type="text" autoComplete="name" className={styles.input} placeholder="optional" />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input name="email" type="email" required autoComplete="email" className={styles.input} placeholder="you@somewhere.space" />
          </label>
          {/* Honeypot: real people never see this */}
          <input name="website" type="text" tabIndex={-1} autoComplete="off" className={styles.honey} aria-hidden="true" />
          <div className={styles.row}>
            <button type="submit" className={styles.button} disabled={status.state === "loading"}>
              {status.state === "loading" ? "Sending…" : "Sign up →"}
            </button>
            {status.state === "error" && (
              <span className={`hand ${styles.error}`} role="alert">
                {status.message}
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
