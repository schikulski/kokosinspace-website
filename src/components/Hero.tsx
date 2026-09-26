import type { HeroImage } from "@/lib/db/schema";
import { spotifyEmbedUrl, type Texts } from "@/lib/texts";
import { HeroCollage } from "./HeroCollage";
import styles from "./Hero.module.css";

const FALLBACK: HeroImage[] = [
  { id: 0, url: "/images/band-sadchloe.webp", alt: "Sad Chloe on stage", sortOrder: 0, createdAt: new Date(0) },
];

export function Hero({ images, t }: { images: HeroImage[]; t: Texts }) {
  const embed = spotifyEmbedUrl(t.spotifyPlaylistUrl);
  return (
    <section id="top" className={`container ${styles.hero}`}>
      <div className={styles.left}>
        <HeroCollage images={images.length ? images : FALLBACK} />
        <h1 className={styles.headline}>
          <span className={styles.w1}>{t.heroWord1}</span>
          <span className={styles.w2}>{t.heroWord2}</span>
          <span className={styles.w3}>{t.heroWord3}</span>
          <span className={styles.w4}>{t.heroWord4}</span>
        </h1>
        <p className={`hand ${styles.tagline}`}>{t.tagline}</p>
      </div>
      <div className={styles.right}>
        <p className={`hand ${styles.note}`}>{t.heroNote}</p>
        <div id="playlist" className={`paper ${styles.card}`}>
          <div className={styles.cardHead}>
            <span>{t.playlistTitle}</span>
            <span className={`hand ${styles.cardSub}`}>{t.playlistSub}</span>
          </div>
          {embed && (
            <iframe
              title={`${t.siteName} playlist on Spotify`}
              src={embed}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className={styles.iframe}
            />
          )}
        </div>
      </div>
    </section>
  );
}
