import Image from "next/image";
import type { Band } from "@/lib/db/schema";
import styles from "./Bands.module.css";

export function Bands({ bands }: { bands: Band[] }) {
  return (
    <section id="bands" className={`container ${styles.section}`}>
      <h2 className={styles.h2}>The bands</h2>
      <div className={styles.grid}>
        {bands.map((b) => (
          <article key={b.id} className={styles.card}>
            <div className={styles.photoWrap}>
              {b.photoUrl ? (
                <Image
                  src={b.photoUrl}
                  alt={b.name}
                  width={800}
                  height={600}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={styles.photo}
                  style={{ transform: `rotate(${b.rotate})` }}
                />
              ) : (
                <div className={styles.placeholder} style={{ transform: `rotate(${b.rotate})` }}>
                  band photo
                  <br />
                  {b.name}
                </div>
              )}
              <div className="tape tape--sm" style={{ left: "14%", top: -14 }} />
            </div>
            <h3 className={styles.name}>
              <span style={{ transform: `rotate(${b.rotateLabel})` }}>{b.name}</span>
            </h3>
            {b.blurb && <p className={`hand ${styles.blurb}`}>{b.blurb}</p>}
            <div className={styles.chips}>
              {b.instagram && (
                <a href={b.instagram} target="_blank" rel="noopener" className="chip chip--ink">
                  Instagram
                </a>
              )}
              {b.spotify && (
                <a href={b.spotify} target="_blank" rel="noopener" className="chip chip--teal">
                  Spotify
                </a>
              )}
              {b.bandcamp && (
                <a href={b.bandcamp} target="_blank" rel="noopener" className="chip chip--outline">
                  Bandcamp
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
