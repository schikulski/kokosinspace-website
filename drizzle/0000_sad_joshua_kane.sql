CREATE TABLE "bands" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"blurb" text DEFAULT '' NOT NULL,
	"photo_url" text,
	"instagram" text DEFAULT '' NOT NULL,
	"spotify" text,
	"bandcamp" text DEFAULT '' NOT NULL,
	"rotate" text DEFAULT '-2deg' NOT NULL,
	"rotate_label" text DEFAULT '1deg' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bands_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "releases" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"artist" text NOT NULL,
	"year" text DEFAULT '' NOT NULL,
	"cover_url" text,
	"url" text DEFAULT '' NOT NULL,
	"rotate" text DEFAULT '-2deg' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "releases_slug_unique" UNIQUE("slug")
);
