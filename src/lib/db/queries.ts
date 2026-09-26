import { asc, eq, like } from "drizzle-orm";
import { cache } from "react";
import { db } from ".";
import { site } from "@/lib/site";
import { DEFAULT_TEXTS, TEXT_PREFIX, type TextKey, type Texts } from "@/lib/texts";
import { bands, heroImages, releases, settings } from "./schema";

export function getBands() {
  return db.select().from(bands).orderBy(asc(bands.sortOrder), asc(bands.id));
}

export function getReleases() {
  return db.select().from(releases).orderBy(asc(releases.sortOrder), asc(releases.id));
}

export function getHeroImages() {
  return db.select().from(heroImages).orderBy(asc(heroImages.sortOrder), asc(heroImages.id));
}

export async function getBand(id: number) {
  const [row] = await db.select().from(bands).where(eq(bands.id, id));
  return row ?? null;
}

export async function getRelease(id: number) {
  const [row] = await db.select().from(releases).where(eq(releases.id, id));
  return row ?? null;
}

export type ContactEmails = { bookingEmail: string; labelEmail: string };

export async function getContactEmails(): Promise<ContactEmails> {
  const rows = await db.select().from(settings);
  const map = new Map(rows.map((r) => [r.key, r.value]));
  return {
    bookingEmail: map.get("bookingEmail") || site.bookingEmail,
    labelEmail: map.get("labelEmail") || site.labelEmail,
  };
}

/** All site copy: admin-edited values from the settings table, falling back to the defaults in texts.ts. */
export const getTexts = cache(async (): Promise<Texts> => {
  const rows = await db.select().from(settings).where(like(settings.key, `${TEXT_PREFIX}%`));
  const texts = { ...DEFAULT_TEXTS };
  for (const r of rows) {
    const key = r.key.slice(TEXT_PREFIX.length) as TextKey;
    if (key in texts && r.value) texts[key] = r.value;
  }
  return texts;
});
