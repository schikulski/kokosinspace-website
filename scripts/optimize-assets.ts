/**
 * One-off: converts the handoff images in design_handoff_kokos_website/assets
 * into web-sized files under public/images. Run with `pnpm assets`.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("design_handoff_kokos_website/assets");
const OUT = path.resolve("public/images");

type Job = { file: string; out: string; width: number; png?: boolean };

const jobs: Job[] = [
  { file: "kokos-full.png", out: "kokos-full.png", width: 520, png: true },
  { file: "kokos-bust.png", out: "kokos-bust.png", width: 400, png: true },
  { file: "patch-color.png", out: "patch-color.png", width: 900, png: true },
  { file: "patch-black.png", out: "patch-black.png", width: 900, png: true },
  { file: "kokos-photo.jpg", out: "kokos-photo.webp", width: 1200 },
  { file: "band-tpm.jpg", out: "band-tpm.webp", width: 1600 },
  { file: "band-sadchloe.jpg", out: "band-sadchloe.webp", width: 1600 },
  { file: "band-herman.jpg", out: "band-herman.webp", width: 1600 },
  { file: "cover-ghost-orchid.jpg", out: "cover-ghost-orchid.webp", width: 1000 },
  { file: "cover-bizarre-starr.jpg", out: "cover-bizarre-starr.webp", width: 1000 },
  { file: "cover-pomi.jpg", out: "cover-pomi.webp", width: 1000 },
  { file: "cover-december.jpg", out: "cover-december.webp", width: 1000 },
];

async function main() {
await mkdir(OUT, { recursive: true });
for (const j of jobs) {
  const img = sharp(path.join(SRC, j.file)).rotate().resize({ width: j.width, withoutEnlargement: true });
  const dest = path.join(OUT, j.out);
  if (j.png) await img.png({ compressionLevel: 9, palette: false }).toFile(dest);
  else await img.webp({ quality: 82 }).toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(`${j.out}: ${meta.width}x${meta.height}`);
}
}
main();
