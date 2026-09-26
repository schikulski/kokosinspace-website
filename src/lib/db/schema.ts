import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bands = pgTable("bands", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  blurb: text("blurb").notNull().default(""),
  photoUrl: text("photo_url"),
  instagram: text("instagram").notNull().default(""),
  spotify: text("spotify"),
  bandcamp: text("bandcamp").notNull().default(""),
  rotate: text("rotate").notNull().default("-2deg"),
  rotateLabel: text("rotate_label").notNull().default("1deg"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const releases = pgTable("releases", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  year: text("year").notNull().default(""),
  coverUrl: text("cover_url"),
  url: text("url").notNull().default(""),
  rotate: text("rotate").notNull().default("-2deg"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Band = typeof bands.$inferSelect;
export type NewBand = typeof bands.$inferInsert;
export type Release = typeof releases.$inferSelect;
export type NewRelease = typeof releases.$inferInsert;
