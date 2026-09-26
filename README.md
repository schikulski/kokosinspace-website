# Kokos in Space Records — kokosinspace.com

One-page site for the Oslo label/studio, plus a small admin for bands and releases.

- **Stack**: Next.js 16 (App Router), Drizzle ORM + Neon Postgres, Vercel Blob for images, MailerLite for the newsletter.
- **Design reference**: `design_handoff_kokos_website/` (Claude Design handoff, kept for reference).

## Develop

```bash
pnpm install
cp .env.example .env.local   # fill in values
pnpm db:migrate              # apply migrations to DATABASE_URL
pnpm db:seed                 # seed handoff data (idempotent)
pnpm dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (username/password from `ADMIN_USERNAME` / `ADMIN_PASSWORD`)

## Content

Bands, releases, the booking/label emails and all site copy live in Postgres and are edited at `/admin`. Every text field, with its default, is declared in `src/lib/texts.ts`; edited values are stored in the `settings` table as `text.<key>`, and an empty field falls back to the default. To add new copy, add a field there and read it from `getTexts()`.

## Schema changes

Edit `src/lib/db/schema.ts`, then `pnpm db:generate` and commit the migration. Production deploys on Vercel run `drizzle-kit migrate` before `next build` (see `vercel-build`); run `pnpm db:migrate` yourself only for other databases.

## Images

Handoff images are optimised into `public/images` with `pnpm assets`. Images uploaded through the admin go to Vercel Blob.
