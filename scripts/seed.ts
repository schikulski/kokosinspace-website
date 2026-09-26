/**
 * Seeds bands and releases from the design handoff. Safe to re-run: skips rows
 * whose slug already exists. Run with `pnpm db:seed` (reads .env.local).
 */
import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local", override: false });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { bands, releases, type NewBand, type NewRelease } from "../src/lib/db/schema";

const ig = (n: string) => `https://www.instagram.com/${n}`;

const BANDS: NewBand[] = [
  { slug: "twin-pines-mall", name: "Twin Pines Mall", blurb: "Dream pop with a flashlight under the covers. Ghost Orchid is out now.", photoUrl: "/images/band-tpm.webp", instagram: ig("twinpinesmall"), spotify: "", bandcamp: "", rotate: "-2deg", rotateLabel: "-1.5deg", sortOrder: 1 },
  { slug: "the-hallway", name: "The Hallway", blurb: "Indie rock from a rooftop at 2 a.m. Pitfalls of Modern Intimacy, on repeat.", photoUrl: "/images/cover-pomi.webp", instagram: ig("thehallway"), spotify: "", bandcamp: "", rotate: "1.5deg", rotateLabel: "1deg", sortOrder: 2 },
  { slug: "sad-chloe", name: "Sad Chloe", blurb: "Three people, one red bass, a lot of feedback. Bizarre Starr says the rest.", photoUrl: "/images/band-sadchloe.webp", instagram: ig("sadchloe"), spotify: "", bandcamp: "", rotate: "-1deg", rotateLabel: "2deg", sortOrder: 3 },
  { slug: "eight-minus", name: "Eight Minus", blurb: "Noise, arithmetic, no encore.", photoUrl: "/images/band-herman.webp", instagram: ig("eightminus"), spotify: "", bandcamp: "", rotate: "2deg", rotateLabel: "-1deg", sortOrder: 4 },
  { slug: "iwishiwasadinosaur", name: "Iwishiwasadinosaur", blurb: "Emo, loud, extinct in the best way.", photoUrl: null, instagram: ig("iwishiwasadinosaur"), spotify: "", bandcamp: "", rotate: "-1.5deg", rotateLabel: "1.5deg", sortOrder: 5 },
  { slug: "gaersint-baever", name: "Gærsint Bæver", blurb: "Newest on the roster. Not on Spotify yet, so go to Bandcamp like it's 2009.", photoUrl: null, instagram: ig("gaersintbaever"), spotify: null, bandcamp: "", rotate: "2deg", rotateLabel: "-2deg", sortOrder: 6 },
];

const RELEASES: NewRelease[] = [
  { slug: "ghost-orchid", title: "Ghost Orchid", artist: "Twin Pines Mall", year: "2025", coverUrl: "/images/cover-ghost-orchid.webp", url: "", rotate: "-2deg", sortOrder: 1 },
  { slug: "bizarre-starr", title: "Bizarre Starr", artist: "Sad Chloe", year: "2024", coverUrl: "/images/cover-bizarre-starr.webp", url: "", rotate: "1.5deg", sortOrder: 2 },
  { slug: "pitfalls-of-modern-intimacy", title: "Pitfalls of Modern Intimacy", artist: "The Hallway", year: "2024", coverUrl: "/images/cover-pomi.webp", url: "", rotate: "-1deg", sortOrder: 3 },
  { slug: "december", title: "December", artist: "Soothie", year: "2023", coverUrl: "/images/cover-december.webp", url: "", rotate: "2deg", sortOrder: 4 },
  { slug: "tba-eight-minus", title: "TBA", artist: "Eight Minus", year: "", coverUrl: null, url: "", rotate: "-1.5deg", sortOrder: 5 },
  { slug: "tba-iwishiwasadinosaur", title: "TBA", artist: "Iwishiwasadinosaur", year: "", coverUrl: null, url: "", rotate: "1deg", sortOrder: 6 },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  const db = drizzle(neon(url));

  for (const b of BANDS) {
    const [existing] = await db.select({ id: bands.id }).from(bands).where(eq(bands.slug, b.slug));
    if (existing) {
      console.log(`band exists: ${b.slug}`);
      continue;
    }
    await db.insert(bands).values(b);
    console.log(`band added: ${b.slug}`);
  }
  for (const r of RELEASES) {
    const [existing] = await db.select({ id: releases.id }).from(releases).where(eq(releases.slug, r.slug));
    if (existing) {
      console.log(`release exists: ${r.slug}`);
      continue;
    }
    await db.insert(releases).values(r);
    console.log(`release added: ${r.slug}`);
  }
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
