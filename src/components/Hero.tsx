import type { HeroImage } from "@/lib/db/schema";
import { site } from "@/lib/site";
import { HeroCollage } from "./HeroCollage";
import styles from "./Hero.module.css";

const FALLBACK: HeroImage[] = [
  { id: 0, url: "/images/band-sadchloe.webp", alt: "Sad Chloe on stage", sortOrder: 0, createdAt: new Date(0) },
];

export function Hero({ images }: { images: HeroImage[] }) {
  return (
    <section id="top" className={`container ${styles.hero}`}>
      <div className={styles.left}>
        <HeroCollage images={images.length ? images : FALLBACK} />
        <h1 className={styles.headline}>
          <span className={styles.w1}>Kokos</span>
          <span className={styles.w2}>in</span>
          <span className={styles.w3}>Space</span>
          <span className={styles.w4}>Records</span>
        </h1>
        <p className={`hand ${styles.tagline}`}>{site.tagline}</p>
      </div>
      <div className={styles.right}>
        <p className={`hand ${styles.note}`}>the cat drifting around down there is Kokos. he approves of the playlist. ↘</p>
        <div id="playlist" className={`paper ${styles.card}`}>
          <div className={styles.cardHead}>
            <span>Label mixtape ▶</span>
            <span className={`hand ${styles.cardSub}`}>everyone on the roster, updated when we remember</span>
          </div>
          <iframe
            title="Kokos in Space label mixtape on Spotify"
            src={site.spotifyEmbed}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className={styles.iframe}
          />
        </div>
      </div>
    </section>
  );
}
