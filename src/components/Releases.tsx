import Image from "next/image";
import type { Release } from "@/lib/db/schema";
import type { Texts } from "@/lib/texts";
import styles from "./Releases.module.css";

export function Releases({ releases, t }: { releases: Release[]; t: Texts }) {
  return (
    <section id="releases" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.h2}>{t.releasesHeading}</h2>
          <span className={`hand ${styles.note}`}>{t.releasesNote}</span>
        </div>
        <div className={styles.grid}>
          {releases.map((r) => {
            const Tag = r.url ? "a" : "div";
            return (
              <Tag
                key={r.id}
                {...(r.url ? { href: r.url, target: "_blank", rel: "noopener" } : {})}
                className={styles.item}
              >
                <div className={styles.cover} style={{ transform: `rotate(${r.rotate})` }}>
                  {r.coverUrl ? (
                    <Image
                      src={r.coverUrl}
                      alt={`${r.title} cover`}
                      width={600}
                      height={600}
                      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 260px"
                      className={styles.img}
                    />
                  ) : (
                    <div className={styles.placeholder}>
                      {t.releasesCoverPlaceholder}
                      <br />
                      {r.title}
                    </div>
                  )}
                </div>
                <div className={styles.title}>{r.title}</div>
                <div className={`hand ${styles.meta}`}>
                  {r.artist}
                  {r.year && <> · {r.year}</>}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
