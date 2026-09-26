import Image from "next/image";
import { site } from "@/lib/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={`container ${styles.hero}`}>
      <div className={styles.left}>
        <div className={styles.collage}>
          <Image
            src="/images/band-sadchloe.webp"
            alt="Sad Chloe on stage"
            width={1600}
            height={1076}
            sizes="(max-width: 639px) 75vw, 450px"
            className={styles.photo}
            priority
          />
          <div className="tape" style={{ left: "28%", top: -14 }} />
          <Image
            src="/images/patch-color.png"
            alt="Kokos in Space Records patch"
            width={900}
            height={900}
            sizes="(max-width: 639px) 58vw, 350px"
            className={styles.patch}
            priority
          />
        </div>
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
