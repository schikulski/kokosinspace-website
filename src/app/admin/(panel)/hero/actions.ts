"use server";

import { asc, eq, gt, lt, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { deleteBlobIfOwned } from "@/lib/blob";
import { db } from "@/lib/db";
import { heroImages } from "@/lib/db/schema";

export type HeroState = { error?: string; ok?: boolean };

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function addHeroImage(_prev: HeroState, fd: FormData): Promise<HeroState> {
  await requireAdmin();
  const url = String(fd.get("url") ?? "").trim();
  const alt = String(fd.get("alt") ?? "").trim();
  if (!url) return { error: "Upload a photo first." };
  const [{ max }] = await db.select({ max: sql<number>`coalesce(max(${heroImages.sortOrder}), 0)` }).from(heroImages);
  await db.insert(heroImages).values({ url, alt, sortOrder: Number(max) + 1 });
  revalidate();
  return { ok: true };
}

export async function deleteHeroImage(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const [current] = await db.select().from(heroImages).where(eq(heroImages.id, id));
  if (current) {
    await db.delete(heroImages).where(eq(heroImages.id, id));
    await deleteBlobIfOwned(current.url);
  }
  revalidate();
}

export async function moveHeroImage(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const dir = fd.get("dir") === "up" ? "up" : "down";
  const [current] = await db.select().from(heroImages).where(eq(heroImages.id, id));
  if (!current) return;
  const [neighbor] = await db
    .select()
    .from(heroImages)
    .where(dir === "up" ? lt(heroImages.sortOrder, current.sortOrder) : gt(heroImages.sortOrder, current.sortOrder))
    .orderBy(dir === "up" ? sql`${heroImages.sortOrder} desc` : asc(heroImages.sortOrder))
    .limit(1);
  if (!neighbor) return;
  await db.update(heroImages).set({ sortOrder: neighbor.sortOrder }).where(eq(heroImages.id, current.id));
  await db.update(heroImages).set({ sortOrder: current.sortOrder }).where(eq(heroImages.id, neighbor.id));
  revalidate();
}
