# Handoff: Kokos in Space Records — website (kokosinspace.com)

## Overview
One-page website for the Oslo record label / studio Kokos in Space Records. Zine-collage aesthetic: paper background, photocopy grain, taped-on photos, cut-out headline type, hand-written annotations. The mascot Kokos (an orange cat in a spacesuit) floats around the viewport as a fixed element.

Must work on desktop and mobile. Content must be data-driven (bands, releases) so the label can add entries without touching layout.

## About the design files
`Kokos in Space - Forside.dc.html` is a **design reference built in HTML** — a prototype showing intended look and behaviour, not production code. Recreate it in whatever stack you choose (recommendation: Astro or Next.js static export, plain CSS or CSS modules, deployable on Netlify/Vercel). Inline styles in the prototype should become proper CSS classes/tokens. `support.js` is the prototype runtime — ignore it. `Kokos in Space - Retninger.dc.html` shows earlier explored directions; only 1d (zine) was chosen. Ignore the rest.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy and animations are final unless noted `[TODO]`. Recreate pixel-close on desktop (≥1024) and adapt sensibly on mobile per the Responsive section.

## Global

**Page**: `background:#EFE9DB`, `color:#111`, `max-width` of content containers 1440px, side padding 32px (16px on mobile).

**Grain overlay** (fixed, full-viewport, `pointer-events:none`, `z-index:50`): `background-image: radial-gradient(rgba(0,0,0,.14) .6px, transparent .7px); background-size:3px 3px; opacity:.7`. Respect `prefers-reduced-motion`? Not needed for grain; needed for animations (below).

**Floating Kokos** (`assets/kokos-full.png`): `position:fixed; right:clamp(12px,3vw,48px); bottom:clamp(60px,10vh,120px); width:clamp(90px,9vw,130px); z-index:30; pointer-events:none; filter:drop-shadow(3px 5px 0 #111)`. Animation `kfloat 18s ease-in-out infinite`:
```
0%   translate(0,0)        rotate(-6deg)
25%  translate(-70px,-90px) rotate(8deg)
50%  translate(-160px,-30px) rotate(-4deg)
75%  translate(-60px,50px)  rotate(10deg)
100% translate(0,0)        rotate(-6deg)
```
On mobile (<640px) scale the translate values by ~0.5 so he stays within the viewport. Disable all animations under `prefers-reduced-motion: reduce`.

**Links**: `a { color: inherit } a:hover { color: #1E4F66 }`. Chip-buttons get `transform: translate(-2px,-2px)` + `box-shadow: 6px 6px 0 #111` on hover (adds "lift" — extension of prototype).

**Recurring primitives**
- *Cut-out label*: `display:inline-block; padding:0 10px (or 4px 16px for h2); background:<colour>; color:<colour>; transform:rotate(±1–3deg)`. Rotations listed per element.
- *Taped photo*: `box-shadow: 4px 6px 0 #111; transform: rotate(±1–3deg)`; plus a *tape strip* `width:120–140px; height:30–34px; background:rgba(233,223,166,.9); transform:rotate(-6deg)` absolutely positioned over the top edge.
- *Paper card*: `background:#fff; border:3px solid #111; box-shadow:6px 6px 0 #111; padding:16–22px; transform:rotate(±1.5deg)`.
- *Chip link*: `padding:5px 10px; font:Anton 15px; text-transform:uppercase; letter-spacing:.06em`. Variants: solid black (`#111`/`#EFE9DB`), teal (`#1F8A8C`/`#fff`), outline (`border:3px solid #111; padding:2px 10px`).

## Sections (top to bottom)

### 1. Header (sticky)
`position:sticky; top:0; z-index:40; background:rgba(239,233,219,.92); border-bottom:3px solid #111; padding:18px 32px; display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap`.
- Logo link (→ `#top`): 64px circle `background:#111; border:3px solid #111; overflow:hidden` containing `assets/kokos-bust.png` at width 76px offset `left:-4px; top:2px`; next to it the wordmark "Kokos in Space Records" as cut-out label black/paper, `rotate(-2deg)`, Anton 18px uppercase, letter-spacing .04em.
- Nav (Anton 18px uppercase): Bands `#bands`, Releases `#releases`, Playlist `#playlist`, Kokos `#about`, Newsletter `#newsletter`; then **Booking** (cut-out, `#1E4F66`/`#fff`, `padding:5px 12px`, `rotate(1.5deg)`, `mailto:booking@kokosinspace.com` `[TODO confirm address]`) and **Label** (outline `border:3px solid #111; padding:2px 12px; rotate(-1deg)`, `mailto:label@kokosinspace.com` `[TODO confirm]`).
- Mobile: collapse nav links into a hamburger → full-screen paper overlay with the same links stacked (Anton 34px). Keep Booking/Label visible as two chips under the logo, or inside the overlay. Logo circle 48px.

### 2. Hero `#top`
Grid `minmax(0,1.1fr) minmax(0,.9fr)`, gap 40px, padding `40px 32px 60px`.
**Left column**
- Collage block 600×400 max: band photo `assets/band-sadchloe.jpg` (75% width, 320px tall, `object-fit:cover`, `filter:grayscale(1) contrast(1.9) brightness(1.1)`, `rotate(-2.5deg)`, taped-photo shadow), tape strip at `left:28%; top:-14px`, and the round patch `assets/patch-color.png` at `right:0; bottom:0; width:58%; rotate(6deg); filter:drop-shadow(4px 6px 0 #111)` overlapping the photo (z above).
- Headline: four cut-out words, `font-size:clamp(56px,7.5vw,110px); line-height:.9; gap:8px; flex-wrap:wrap`:
  KOKOS (`#111`/`#EFE9DB`, -2deg) · IN (`#EE8A1C`/`#111`, 1.5deg) · SPACE (`#1F8A8C`/`#fff`, -1deg) · RECORDS (`#1E4F66`/`#fff`, 2deg).
- Tagline, Shadows Into Light 26px/1.25, `#1E4F66`, `rotate(-1.5deg)`, max-width 520px: "Independent label and studio, Oslo. Six bands and a cat."
**Right column**
- Hand note, Shadows Into Light 24px, `#1E4F66`, `rotate(-3deg)`: "the cat drifting around down there is Kokos. he approves of the playlist. ↘"
- Paper card `#playlist` (`rotate(1.5deg)`): row with "Label mixtape ▶" (Anton 18px uppercase, ls .06em) and "everyone on the roster, updated when we remember" (Shadows 16px `#555`); below, Spotify embed iframe:
  `https://open.spotify.com/embed/playlist/7yHrfwi0oz244fqON0VYRC?theme=0`, `width:100%; height:352; border-radius:8px`, `allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"`, `loading="lazy"`.
- Mobile: single column; collage block scales to width, height ~65vw; headline wraps naturally; playlist card full width, iframe height 352.

### 3. Marquee
`background:#1F8A8C; color:#fff; border-top/bottom:3px solid #111; padding:10px 0; overflow:hidden; white-space:nowrap`. Anton 28px uppercase, ls .06em. Content = band names separated by `★` in `#E9DFA6`, gap 48px, duplicated once; animate `translateX(0 → -50%)` linear 30s infinite. Pause on hover optional. Generate from the bands array.

### 4. The bands `#bands`
Padding `70px 32px 40px`. H2 "The bands" cut-out `#1E4F66`/`#fff`, `font-size:clamp(48px,6vw,88px); line-height:.9; padding:4px 16px; rotate(-1.5deg)`, margin-bottom 40px.
Grid `repeat(auto-fit, minmax(300px,1fr))`, gap `44px 36px`. Each card (flex column, gap 14px):
- Photo: `aspect-ratio:4/3; object-fit:cover` (no filter), taped-photo shadow, rotation from data (`rot`); tape strip at `left:14%; top:-14px`, 120×30. If no photo: striped placeholder `repeating-linear-gradient(45deg,#ddd 0 10px,#ccc 10px 20px)`.
- Name: Anton 34px uppercase inside white cut-out `border:3px solid #111; padding:2px 10px`, rotation `rot2`.
- Blurb: Shadows Into Light 22px/1.25 `#333`.
- Chips: Instagram (black), Spotify (teal — omit when band has no Spotify URL), Bandcamp (outline). `target="_blank" rel="noopener"`.

### 5. Releases `#releases`
`background:#1E4F66; color:#EFE9DB; padding:70px 32px 80px; border-top:3px solid #111; margin-top:40px`. Header row (flex, space-between, wrap): H2 "Releases" cut-out `#EE8A1C`/`#111` `rotate(1deg)` + note "all on Spotify and Bandcamp. some on vinyl, ask nicely." (Shadows 24px `#E9DFA6`).
Grid `repeat(auto-fill, minmax(220px,1fr))`, gap `36px 28px`. Each item is a link: square cover (`aspect-ratio:1; object-fit:cover; box-shadow:4px 6px 0 #111`, rotation from data; placeholder stripes `#2a5f78/#1E4F66` with mono label when no art), title Anton 22px uppercase, meta "Artist · Year" Shadows 18px `#EE8A1C`. Mobile: 2 columns (`minmax(150px,1fr)`).

### 6. Who is Kokos? `#about`
Grid 1fr 1fr, gap 40px, padding `80px 32px`, `align-items:center`.
- Left: paper card `width:min(100%,460px); aspect-ratio:4/5; rotate(-3deg); overflow:hidden` with `assets/kokos-photo.jpg` cover-fit; sticker `assets/kokos-bust.png` at `right:-14px; bottom:-10px; width:34%; rotate(-10deg)` with white sticker edge (`drop-shadow(0 0 0 #fff)` ×4 + `drop-shadow(2px 4px 0 #111)`; in production use a pre-rendered PNG with a white outline instead of stacked filters); caption "Kokos, the original." Shadows 20px white with `text-shadow:0 1px 3px rgba(0,0,0,.7)` at `left:12px; bottom:10px`. Tape strip at `left:8%; top:-10px`.
- Right: H2 two cut-outs stacked: "Who is" (`#1E4F66`/`#fff`, -1deg) / "Kokos?" (`#EE8A1C`/`#111`, 1.5deg, margin-top 8px). Body Shadows Into Light 26px/1.35 `#222`, paragraphs gap 16px:
  1. "Kokos is a yellow cat. He lives near the studio, has opinions about mixes, and once sat on a Marshall for an entire session. He has been to space exactly zero times. We named the label after him anyway." `[TODO: replace with true story]`
  2. "Kokos in Space is a collective label and music studio in Oslo. We release records by friends and people who should be friends, book shows, and record in our own room."
- Mobile: single column, card first.

### 7. Newsletter + contact `#newsletter`
Grid `repeat(auto-fit, minmax(320px,1fr))`, gap 40px, padding `20px 32px 100px`.
- Left paper card (`rotate(-1.5deg)`, `box-shadow:-6px 6px 0 #111`, padding 22px): heading Anton 26px uppercase ls .04em "Get the newsletter, no spam, just space"; below, MailerLite embed:
  ```html
  <div class="ml-embedded" data-form="8FoZR8"></div>
  ```
  with the MailerLite Universal script in `<head>` (account `606162`):
  ```html
  <script>(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');ml('account','606162');</script>
  ```
  Style the injected form to match: input `border:3px solid #111; background:#fff; font:system-ui 16px`, button = black chip. Reserve `min-height:120px` to avoid layout shift.
- Right: note "Want a band on your stage? Want to talk to the label? Two buttons, one cat." (Shadows 26px/1.3 `#1E4F66`, -1deg); buttons Anton 22px uppercase: **Booking →** (`#1E4F66`/`#fff`, `padding:14px 22px`, 1.5deg, `box-shadow:4px 4px 0 #111`, mailto booking) and **Label contact →** (outline on paper, `padding:11px 22px`, -1deg, same shadow, mailto label). Below: label socials chips — Instagram `https://www.instagram.com/kokosinspace`, Spotify `https://open.spotify.com/playlist/7yHrfwi0oz244fqON0VYRC`, Bandcamp `[TODO url]`.

### 8. Footer
`background:#1E4F66; color:#EFE9DB; padding:26px 32px; border-top:3px solid #111; flex space-between wrap`. Left: "© 2026 Kokos in Space Records · Oslo" (Anton 15px uppercase ls .08em). Right: "Kokos was not harmed in the making of this website." (Shadows 18px `#E9DFA6`).

## Responsive summary
- Breakpoints: ≥1024 desktop layout as specified; 640–1023 same grids collapse via auto-fit; <640: single column everywhere, side padding 16px, section padding halved, headline `clamp(44px, 13vw, 72px)`, H2 `clamp(40px, 11vw, 60px)`, band name 28px, body hand-text 20px, chips 14px. Floating Kokos width 80px, translate amplitude ×0.5.
- Rotated elements: give parents `overflow-x: clip` on `body` to avoid horizontal scroll from rotations/shadows.
- Fixed Kokos must never intercept taps (`pointer-events:none`) and must sit below the header (z 30 < 40).
- Anchor links: `scroll-margin-top: 110px` on sections (sticky header height).

## Interactions & behaviour
- Smooth-scroll anchors within page.
- mailto buttons open the mail client.
- Marquee and Kokos animations loop forever; disabled under `prefers-reduced-motion`.
- Chip hover lift (see Global). Rotated labels do not un-rotate on hover.
- Optional: header nav stays sticky; add `backdrop-filter: blur(4px)`.

## Data model (drive from JSON/MD/CMS)
```ts
type Band = { slug: string; name: string; blurb: string; photo?: string; instagram: string; spotify?: string; bandcamp: string; rotate: string; rotateLabel: string }
type Release = { title: string; artist: string; year: string; cover?: string; url: string; rotate: string }
```
Current data (`[TODO]` = confirm with label):
- Twin Pines Mall — "Dream pop with a flashlight under the covers. Ghost Orchid is out now." photo `band-tpm.jpg` `[TODO verify]`, rot -2deg / -1.5deg
- The Hallway — "Indie rock from a rooftop at 2 a.m. Pitfalls of Modern Intimacy, on repeat." photo `cover-pomi.jpg` (stand-in), rot 1.5 / 1
- Sad Chloe — "Three people, one red bass, a lot of feedback. Bizarre Starr says the rest." photo `band-sadchloe.jpg`, rot -1 / 2
- Eight Minus — "Noise, arithmetic, no encore." photo `band-herman.jpg` `[TODO verify]`, rot 2 / -1
- Iwishiwasadinosaur — "Emo, loud, extinct in the best way." no photo, rot -1.5 / 1.5
- Gærsint Bæver — "Newest on the roster. Not on Spotify yet, so go to Bandcamp like it's 2009." no photo, **no Spotify**, rot 2 / -2
All blurbs, genres, Instagram handles, Spotify/Bandcamp URLs are placeholders `[TODO]`.

Releases: Ghost Orchid — Twin Pines Mall — 2025 (`cover-ghost-orchid.jpg`, -2deg); Bizarre Starr — Sad Chloe — 2024 (`cover-bizarre-starr.jpg`, 1.5deg); Pitfalls of Modern Intimacy — The Hallway — 2024 (`cover-pomi.jpg`, -1deg); December — Soothie `[TODO artist]` — 2023 (`cover-december.jpg`, 2deg); two TBA placeholders. Years are `[TODO]`.

## Design tokens
Colours (from the label patch):
- Paper `#EFE9DB` · Ink `#111111` · White `#FFFFFF`
- Orange (Kokos) `#EE8A1C` · Teal (suit details) `#1F8A8C` · Patch blue `#1E4F66` · Moon yellow `#E9DFA6`
- Tape `rgba(233,223,166,.9)` · Muted text `#333` / `#555` · Release placeholder stripe `#2A5F78`

Type (Google Fonts): **Anton** 400 (all display/UI, uppercase) · **Shadows Into Light** 400 (annotations/body) · system `ui-monospace` 13px for placeholder labels only.
Scale: headline clamp(56,7.5vw,110) · H2 clamp(48,6vw,88) · marquee 28 · band name 34 · hand body 26/22/24 · chips 15 · nav 18 · footer 15.

Spacing: section padding 70–80px top, 32px sides; grid gaps 36–44px; card padding 16–22px. Borders 3px solid ink. Shadows: hard offset, no blur — `4px 6px 0 #111` (photos), `6px 6px 0 #111` (cards), `4px 4px 0 #111` (buttons). Radius: 0 everywhere except Spotify iframe 8px and logo circle.

## Assets (in `assets/`)
- `kokos-full.png` — mascot full figure, transparent (floating element)
- `kokos-bust.png` — mascot head/shoulders, transparent (logo, sticker)
- `patch-color.png`, `patch-black.png` — round label patch (colour / mono)
- `kokos-photo.jpg` — hero "real Kokos" photo for About
- `band-tpm.jpg`, `band-sadchloe.jpg`, `band-herman.jpg` — band photos (attribution: Herman Hulleberg for the latter)
- `cover-ghost-orchid.jpg`, `cover-bizarre-starr.jpg`, `cover-pomi.jpg`, `cover-december.jpg` — release covers
Serve as optimised WebP/AVIF with `srcset`; covers need ≥600px square.

## Third-party
- Spotify embed (iframe, see Hero).
- MailerLite Universal script + form `8FoZR8`, account `606162`.
- Google Fonts Anton + Shadows Into Light (`display=swap`); consider self-hosting.

## Files
- `Kokos in Space - Forside.dc.html` — the chosen design (reference)
- `Kokos in Space - Retninger.dc.html` — earlier directions (context only)
- `assets/` — all images above
