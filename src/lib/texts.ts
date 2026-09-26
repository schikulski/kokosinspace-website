/**
 * Every piece of copy on the public site. The defaults below are what the site
 * shows until someone edits a field in the admin; edited values are stored in
 * the settings table under `text.<key>` (see getTexts / updateTexts).
 */
export const TEXT_GROUPS = [
  {
    id: "general",
    title: "General",
    fields: {
      siteName: { label: "Label name", default: "Kokos in Space Records", hint: "Header wordmark, browser tab title and link previews." },
      metaDescription: {
        label: "Search/share description",
        default: "Independent label and studio, Oslo. Six bands and a cat.",
        hint: "Shown by Google and when the site is shared on social media.",
        multiline: true,
      },
    },
  },
  {
    id: "nav",
    title: "Menu",
    fields: {
      navBands: { label: "Bands link", default: "Bands" },
      navReleases: { label: "Releases link", default: "Releases" },
      navPlaylist: { label: "Playlist link", default: "Playlist" },
      navKokos: { label: "Kokos link", default: "Kokos" },
      navNewsletter: { label: "Newsletter link", default: "Newsletter" },
      navBooking: { label: "Booking button", default: "Booking" },
      navLabel: { label: "Label button", default: "Label" },
    },
  },
  {
    id: "hero",
    title: "Top of the page",
    fields: {
      heroWord1: { label: "Headline word 1", default: "Kokos" },
      heroWord2: { label: "Headline word 2", default: "in" },
      heroWord3: { label: "Headline word 3", default: "Space" },
      heroWord4: { label: "Headline word 4", default: "Records" },
      tagline: { label: "Tagline", default: "Independent label and studio, Oslo. Six bands and a cat.", multiline: true },
      heroNote: {
        label: "Note above the playlist",
        default: "the cat drifting around down there is Kokos. he approves of the playlist. ↘",
        multiline: true,
      },
      playlistTitle: { label: "Playlist card title", default: "Label mixtape ▶" },
      playlistSub: { label: "Playlist card subtitle", default: "everyone on the roster, updated when we remember" },
    },
  },
  {
    id: "bands",
    title: "Bands section",
    fields: {
      bandsHeading: { label: "Heading", default: "The bands" },
      bandsPhotoPlaceholder: { label: "Placeholder when a band has no photo", default: "band photo" },
    },
  },
  {
    id: "releases",
    title: "Releases section",
    fields: {
      releasesHeading: { label: "Heading", default: "Releases" },
      releasesNote: { label: "Note next to the heading", default: "all on Spotify and Bandcamp. some on vinyl, ask nicely." },
      releasesCoverPlaceholder: { label: "Placeholder when a release has no cover", default: "cover art" },
    },
  },
  {
    id: "about",
    title: "Who is Kokos",
    fields: {
      aboutHeading1: { label: "Heading, first line", default: "Who is" },
      aboutHeading2: { label: "Heading, second line", default: "Kokos?" },
      aboutBody: {
        label: "Text",
        default:
          "Kokos is a yellow cat. He lives near the studio, has opinions about mixes, and once sat on a Marshall for an entire session. He has been to space exactly zero times. We named the label after him anyway.\n\nKokos in Space is a collective label and music studio in Oslo. We release records by friends and people who should be friends, book shows, and record in our own room.",
        hint: "Leave an empty line between paragraphs.",
        multiline: true,
        rows: 8,
      },
      aboutCaption: { label: "Photo caption", default: "Kokos, the original." },
      aboutPhotoAlt: { label: "Photo description (for screen readers)", default: "Kokos, the original cat" },
    },
  },
  {
    id: "newsletter",
    title: "Newsletter",
    fields: {
      newsletterHeading: { label: "Heading", default: "Get the newsletter, no spam, just space", multiline: true },
      newsletterNameLabel: { label: "Name field label", default: "Name" },
      newsletterNamePlaceholder: { label: "Name field placeholder", default: "optional" },
      newsletterEmailLabel: { label: "Email field label", default: "Email" },
      newsletterEmailPlaceholder: { label: "Email field placeholder", default: "you@somewhere.space" },
      newsletterButton: { label: "Button", default: "Sign up →" },
      newsletterSending: { label: "Button while sending", default: "Sending…" },
      newsletterSuccess: { label: "Message after signing up", default: "You're in. Kokos says hi." },
      newsletterAlready: { label: "Message when already signed up", default: "You're already on the list. Kokos remembers you." },
      newsletterInvalid: { label: "Message for an invalid email", default: "That doesn't look like an email address." },
      newsletterFull: {
        label: "Message when the list is full",
        default: "The list is full right now. Send us an email instead and we'll add you by hand.",
        multiline: true,
      },
      newsletterError: { label: "Message when something fails", default: "Something went wrong." },
    },
  },
  {
    id: "contact",
    title: "Contact",
    fields: {
      contactNote: {
        label: "Note above the buttons",
        default: "Want a band on your stage? Want to talk to the label? Two buttons, one cat.",
        multiline: true,
      },
      contactBooking: { label: "Booking button", default: "Booking →" },
      contactLabel: { label: "Label button", default: "Label contact →" },
    },
  },
  {
    id: "links",
    title: "Link buttons and profiles",
    fields: {
      instagramUrl: { label: "Label Instagram URL", default: "https://www.instagram.com/kokosinspace", url: true },
      spotifyPlaylistUrl: {
        label: "Label playlist URL (Spotify)",
        default: "https://open.spotify.com/playlist/7yHrfwi0oz244fqON0VYRC",
        hint: "Used for the Spotify button and the embedded player at the top.",
        url: true,
      },
      bandcampUrl: { label: "Label Bandcamp URL", default: "", hint: "The Bandcamp button is hidden while this is empty.", url: true },
      chipInstagram: { label: "Instagram button text", default: "Instagram" },
      chipSpotify: { label: "Spotify button text", default: "Spotify" },
      chipBandcamp: { label: "Bandcamp button text", default: "Bandcamp" },
    },
  },
  {
    id: "footer",
    title: "Footer and 404 page",
    fields: {
      footerCopyright: { label: "Copyright line", default: "Kokos in Space Records · Oslo", hint: "“© <year>” is added in front automatically." },
      footerNote: { label: "Footer note", default: "Kokos was not harmed in the making of this website." },
      notFoundText: { label: "404 page text", default: "Kokos looked everywhere. Nothing here." },
      notFoundLink: { label: "404 page button", default: "Back to the label" },
    },
  },
] as const satisfies readonly {
  id: string;
  title: string;
  fields: Record<string, { label: string; default: string; hint?: string; multiline?: boolean; rows?: number; url?: boolean }>;
}[];

type Group = (typeof TEXT_GROUPS)[number];
export type TextKey = Group extends infer G ? (G extends { fields: infer F } ? keyof F & string : never) : never;
export type Texts = Record<TextKey, string>;
export type TextField = { key: TextKey; label: string; default: string; hint?: string; multiline?: boolean; rows?: number; url?: boolean };

export const TEXT_FIELDS: TextField[] = TEXT_GROUPS.flatMap((g) =>
  Object.entries(g.fields).map(([key, f]) => ({ key: key as TextKey, ...(f as Omit<TextField, "key">) })),
);

export const DEFAULT_TEXTS = Object.fromEntries(TEXT_FIELDS.map((f) => [f.key, f.default])) as Texts;

export const TEXT_PREFIX = "text.";

/** Turns a Spotify playlist URL into its embed URL; returns null for anything else. */
export function spotifyEmbedUrl(url: string) {
  const m = url.match(/open\.spotify\.com\/(?:embed\/)?(playlist|album|artist)\/([A-Za-z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?theme=0` : null;
}
