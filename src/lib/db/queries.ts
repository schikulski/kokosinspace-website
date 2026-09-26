import { asc, eq } from "drizzle-orm";
import { db } from ".";
import { site } from "@/lib/site";
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
