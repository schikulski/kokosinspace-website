"use server";

import { inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { TEXT_FIELDS, TEXT_PREFIX } from "@/lib/texts";

export type TextsState = { error?: string; ok?: boolean };

export async function updateTexts(_prev: TextsState, fd: FormData): Promise<TextsState> {
  await requireAdmin();
  const upserts: { key: string; value: string }[] = [];
  const resets: string[] = [];
  for (const f of TEXT_FIELDS) {
    const value = String(fd.get(f.key) ?? "")
      .replace(/\r\n/g, "\n")
      .trim();
    if (f.url && value && !/^https?:\/\/\S+$/.test(value)) {
      return { error: `${f.label} must be a full link starting with https://` };
    }
    // Empty or unchanged fields fall back to the default in texts.ts, so
    // future copy changes in code still reach them.
    if (!value || value === f.default) resets.push(TEXT_PREFIX + f.key);
    else upserts.push({ key: TEXT_PREFIX + f.key, value });
  }
  if (resets.length) await db.delete(settings).where(inArray(settings.key, resets));
  if (upserts.length) {
    await db
      .insert(settings)
      .values(upserts)
      .onConflictDoUpdate({ target: settings.key, set: { value: sql`excluded.value`, updatedAt: new Date() } });
  }
  revalidatePath("/", "layout");
  return { ok: true };
}
