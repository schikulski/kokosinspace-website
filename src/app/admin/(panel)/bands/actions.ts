"use server";

import { and, asc, eq, gt, lt, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { deleteBlobIfOwned } from "@/lib/blob";
import { db } from "@/lib/db";
import { bands } from "@/lib/db/schema";
import { slugify } from "@/lib/slug";

export type FormState = { error?: string };

function str(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim();
}

function parse(fd: FormData) {
  const name = str(fd, "name");
  if (!name) return { error: "Name is required." } as const;
  return {
    values: {
      name,
      blurb: str(fd, "blurb"),
      photoUrl: str(fd, "photoUrl") || null,
      instagram: str(fd, "instagram"),
      spotify: str(fd, "spotify") || null,
      bandcamp: str(fd, "bandcamp"),
      rotate: str(fd, "rotate") || "-2deg",
      rotateLabel: str(fd, "rotateLabel") || "1deg",
    },
  } as const;
}

async function uniqueSlug(base: string, excludeId?: number) {
  let slug = slugify(base);
  for (let i = 2; ; i++) {
    const [hit] = await db.select({ id: bands.id }).from(bands).where(eq(bands.slug, slug));
    if (!hit || hit.id === excludeId) return slug;
    slug = `${slugify(base)}-${i}`;
  }
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createBand(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(fd);
  if ("error" in parsed) return { error: parsed.error };
  const [{ max }] = await db.select({ max: sql<number>`coalesce(max(${bands.sortOrder}), 0)` }).from(bands);
  await db.insert(bands).values({
    ...parsed.values,
    slug: await uniqueSlug(parsed.values.name),
    sortOrder: Number(max) + 1,
  });
  revalidate();
  redirect("/admin#bands");
}

export async function updateBand(id: number, _prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(fd);
  if ("error" in parsed) return { error: parsed.error };
  const [current] = await db.select().from(bands).where(eq(bands.id, id));
  if (!current) return { error: "Band not found." };
  await db
    .update(bands)
    .set({ ...parsed.values, updatedAt: new Date() })
    .where(eq(bands.id, id));
  if (current.photoUrl && current.photoUrl !== parsed.values.photoUrl) await deleteBlobIfOwned(current.photoUrl);
  revalidate();
  redirect("/admin#bands");
}

export async function deleteBand(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const [current] = await db.select().from(bands).where(eq(bands.id, id));
  if (current) {
    await db.delete(bands).where(eq(bands.id, id));
    await deleteBlobIfOwned(current.photoUrl);
  }
  revalidate();
}

export async function moveBand(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const dir = fd.get("dir") === "up" ? "up" : "down";
  const [current] = await db.select().from(bands).where(eq(bands.id, id));
  if (!current) return;
  const [neighbor] = await db
    .select()
    .from(bands)
    .where(dir === "up" ? lt(bands.sortOrder, current.sortOrder) : gt(bands.sortOrder, current.sortOrder))
    .orderBy(dir === "up" ? sql`${bands.sortOrder} desc` : asc(bands.sortOrder))
    .limit(1);
  if (!neighbor) return;
  await db.update(bands).set({ sortOrder: neighbor.sortOrder }).where(eq(bands.id, current.id));
  await db.update(bands).set({ sortOrder: current.sortOrder }).where(and(eq(bands.id, neighbor.id)));
  revalidate();
}
