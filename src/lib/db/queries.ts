import { asc, eq } from "drizzle-orm";
import { db } from ".";
import { bands, releases } from "./schema";

export function getBands() {
  return db.select().from(bands).orderBy(asc(bands.sortOrder), asc(bands.id));
}

export function getReleases() {
  return db.select().from(releases).orderBy(asc(releases.sortOrder), asc(releases.id));
}

export async function getBand(id: number) {
  const [row] = await db.select().from(bands).where(eq(bands.id, id));
  return row ?? null;
}

export async function getRelease(id: number) {
  const [row] = await db.select().from(releases).where(eq(releases.id, id));
  return row ?? null;
}
