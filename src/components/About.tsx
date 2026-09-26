import Image from "next/image";
import { site } from "@/lib/site";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={`container ${styles.section}`}>
      <div className={styles.left}>
        <div className={`paper ${styles.card}`}>
          <Image
            src="/images/kokos-photo.webp"
            alt="Kokos, the original cat"
            width={1119}
            height={1356}
            sizes="(max-width: 639px) 100vw, 460px"
            className={styles.photo}
          />
          <Image src="/images/kokos-bust.png" alt="" width={400} height={378} className={styles.sticker} />
          <div className={`hand ${styles.caption}`}>Kokos, the original.</div>
        </div>
        <div className="tape" style={{ left: "8%", top: -10 }} />
      </div>
      <div>
        <h2 className={styles.h2}>
          <span className={styles.who}>Who is</span>
          <br />
          <span className={styles.kokos}>Kokos?</span>
        </h2>
        <div className={`hand ${styles.body}`}>
          {site.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
