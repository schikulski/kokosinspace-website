"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";

export type FormState = { error?: string; ok?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIELDS = [
  { key: "bookingEmail", label: "Booking email" },
  { key: "labelEmail", label: "Label email" },
] as const;

export async function updateContactEmails(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const values: { key: string; value: string }[] = [];
  for (const f of FIELDS) {
    const value = String(fd.get(f.key) ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(value)) return { error: `${f.label} doesn't look like an email address.` };
    values.push({ key: f.key, value });
  }
  for (const v of values) {
    await db
      .insert(settings)
      .values(v)
      .onConflictDoUpdate({ target: settings.key, set: { value: v.value, updatedAt: new Date() } });
  }
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}
