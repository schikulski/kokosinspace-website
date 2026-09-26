import Image from "next/image";
import { site } from "@/lib/site";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export const NAV_LINKS = [
  { href: "#bands", label: "Bands" },
  { href: "#releases", label: "Releases" },
  { href: "#playlist", label: "Playlist" },
  { href: "#about", label: "Kokos" },
  { href: "#newsletter", label: "Newsletter" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <a href="#top" className={styles.logo} aria-label="Kokos in Space Records, back to top">
        <span className={styles.circle}>
          <Image src="/images/kokos-bust.png" alt="" width={76} height={72} priority />
        </span>
        <span className={styles.wordmark}>Kokos in Space Records</span>
      </a>
      <nav className={styles.nav} aria-label="Main">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className={styles.link}>
            {l.label}
          </a>
        ))}
        <a href={`mailto:${site.bookingEmail}`} className={styles.booking}>
          Booking
        </a>
        <a href={`mailto:${site.labelEmail}`} className={styles.label}>
          Label
        </a>
      </nav>
      <MobileNav links={NAV_LINKS} bookingEmail={site.bookingEmail} labelEmail={site.labelEmail} />
    </header>
  );
}
