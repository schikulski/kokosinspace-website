/** Static site content that is not managed through the admin. */
export const site = {
  name: "Kokos in Space Records",
  tagline: "Independent label and studio, Oslo. Six bands and a cat.",
  bookingEmail: "booking@kokosinspace.com",
  labelEmail: "label@kokosinspace.com",
  instagram: "https://www.instagram.com/kokosinspace",
  spotifyPlaylist: "https://open.spotify.com/playlist/7yHrfwi0oz244fqON0VYRC",
  spotifyEmbed: "https://open.spotify.com/embed/playlist/7yHrfwi0oz244fqON0VYRC?theme=0",
  bandcamp: "", // TODO: label Bandcamp URL
  about: [
    "Kokos is a yellow cat. He lives near the studio, has opinions about mixes, and once sat on a Marshall for an entire session. He has been to space exactly zero times. We named the label after him anyway.",
    "Kokos in Space is a collective label and music studio in Oslo. We release records by friends and people who should be friends, book shows, and record in our own room.",
  ],
} as const;

export const ROTATIONS = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg", "-2.5deg", "2.5deg"];
