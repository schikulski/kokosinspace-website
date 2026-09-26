import type { Texts } from "@/lib/texts";
import styles from "./Footer.module.css";

export function Footer({ t }: { t: Texts }) {
  return (
    <footer className={styles.footer}>
      <span>
        © {new Date().getFullYear()} {t.footerCopyright}
      </span>
      <span className={`hand ${styles.note}`}>{t.footerNote}</span>
    </footer>
  );
}
