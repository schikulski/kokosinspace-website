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

Bands, releases and the booking/label emails live in Postgres and are edited at `/admin`. Static copy (about text, social links) lives in `src/lib/site.ts`.

## Schema changes

Edit `src/lib/db/schema.ts`, then `pnpm db:generate` and commit the migration. Production deploys on Vercel run `drizzle-kit migrate` before `next build` (see `vercel-build`); run `pnpm db:migrate` yourself only for other databases.

## Images

Handoff images are optimised into `public/images` with `pnpm assets`. Images uploaded through the admin go to Vercel Blob.
