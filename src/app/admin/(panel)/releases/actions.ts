"use server";

import { asc, eq, gt, lt, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { deleteBlobIfOwned } from "@/lib/blob";
import { db } from "@/lib/db";
import { releases } from "@/lib/db/schema";
import { slugify } from "@/lib/slug";

export type FormState = { error?: string };

function str(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim();
}

function parse(fd: FormData) {
  const title = str(fd, "title");
  const artist = str(fd, "artist");
  if (!title) return { error: "Title is required." } as const;
  if (!artist) return { error: "Artist is required." } as const;
  return {
    values: {
      title,
      artist,
      year: str(fd, "year"),
      coverUrl: str(fd, "coverUrl") || null,
      url: str(fd, "url"),
      rotate: str(fd, "rotate") || "-2deg",
    },
  } as const;
}

async function uniqueSlug(base: string, excludeId?: number) {
  let slug = slugify(base);
  for (let i = 2; ; i++) {
    const [hit] = await db.select({ id: releases.id }).from(releases).where(eq(releases.slug, slug));
    if (!hit || hit.id === excludeId) return slug;
    slug = `${slugify(base)}-${i}`;
  }
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createRelease(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(fd);
  if ("error" in parsed) return { error: parsed.error };
  const [{ max }] = await db.select({ max: sql<number>`coalesce(max(${releases.sortOrder}), 0)` }).from(releases);
  await db.insert(releases).values({
    ...parsed.values,
    slug: await uniqueSlug(`${parsed.values.artist} ${parsed.values.title}`),
    sortOrder: Number(max) + 1,
  });
  revalidate();
  redirect("/admin#releases");
}

export async function updateRelease(id: number, _prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(fd);
  if ("error" in parsed) return { error: parsed.error };
  const [current] = await db.select().from(releases).where(eq(releases.id, id));
  if (!current) return { error: "Release not found." };
  await db
    .update(releases)
    .set({ ...parsed.values, updatedAt: new Date() })
    .where(eq(releases.id, id));
  if (current.coverUrl && current.coverUrl !== parsed.values.coverUrl) await deleteBlobIfOwned(current.coverUrl);
  revalidate();
  redirect("/admin#releases");
}

export async function deleteRelease(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const [current] = await db.select().from(releases).where(eq(releases.id, id));
  if (current) {
    await db.delete(releases).where(eq(releases.id, id));
    await deleteBlobIfOwned(current.coverUrl);
  }
  revalidate();
}

export async function moveRelease(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const dir = fd.get("dir") === "up" ? "up" : "down";
  const [current] = await db.select().from(releases).where(eq(releases.id, id));
  if (!current) return;
  const [neighbor] = await db
    .select()
    .from(releases)
    .where(dir === "up" ? lt(releases.sortOrder, current.sortOrder) : gt(releases.sortOrder, current.sortOrder))
    .orderBy(dir === "up" ? sql`${releases.sortOrder} desc` : asc(releases.sortOrder))
    .limit(1);
  if (!neighbor) return;
  await db.update(releases).set({ sortOrder: neighbor.sortOrder }).where(eq(releases.id, current.id));
  await db.update(releases).set({ sortOrder: current.sortOrder }).where(eq(releases.id, neighbor.id));
  revalidate();
}
