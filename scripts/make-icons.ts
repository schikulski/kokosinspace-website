/** Builds favicon/app icons from the Kokos bust. Run with `pnpm tsx scripts/make-icons.ts`. */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "design_handoff_kokos_website/assets/kokos-bust.png";
const PAPER = { r: 0xef, g: 0xe9, b: 0xdb, alpha: 1 };

async function icon(size: number, round: boolean) {
  const inner = Math.round(size * 0.86);
  const bust = await sharp(SRC).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  const meta = await sharp(bust).metadata();
  const left = Math.round((size - (meta.width ?? inner)) / 2);
  const top = Math.round((size - (meta.height ?? inner)) / 2) + Math.round(size * 0.04);
  let img = sharp({ create: { width: size, height: size, channels: 4, background: PAPER } }).composite([{ input: bust, left, top }]);
  if (round) {
    const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`);
    img = sharp(await img.png().toBuffer()).composite([{ input: mask, blend: "dest-in" }]);
  }
  return img.png().toBuffer();
}

function ico(png: Buffer, size: number) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0);
  entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}

async function main() {
  await writeFile("src/app/icon.png", await icon(512, true));
  await writeFile("src/app/apple-icon.png", await icon(180, false));
  await writeFile("src/app/favicon.ico", ico(await icon(48, true), 48));
  console.log("icons written: icon.png (512), apple-icon.png (180), favicon.ico (48)");
}
main();
