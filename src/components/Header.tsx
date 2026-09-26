import Image from "next/image";
import type { ContactEmails } from "@/lib/db/queries";
import type { Texts } from "@/lib/texts";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export function Header({ bookingEmail, labelEmail, t }: ContactEmails & { t: Texts }) {
  const links = [
    { href: "#bands", label: t.navBands },
    { href: "#releases", label: t.navReleases },
    { href: "#playlist", label: t.navPlaylist },
    { href: "#about", label: t.navKokos },
    { href: "#newsletter", label: t.navNewsletter },
  ];
  return (
    <header className={styles.header}>
      <a href="#top" className={styles.logo} aria-label={`${t.siteName}, back to top`}>
        <span className={styles.circle}>
          <Image src="/images/kokos-bust.png" alt="" width={76} height={72} priority />
        </span>
        <span className={styles.wordmark}>{t.siteName}</span>
      </a>
      <nav className={styles.nav} aria-label="Main">
        {links.map((l) => (
          <a key={l.href} href={l.href} className={styles.link}>
            {l.label}
          </a>
        ))}
        <a href={`mailto:${bookingEmail}`} className={styles.booking}>
          {t.navBooking}
        </a>
        <a href={`mailto:${labelEmail}`} className={styles.label}>
          {t.navLabel}
        </a>
      </nav>
      <MobileNav
        links={links}
        bookingEmail={bookingEmail}
        labelEmail={labelEmail}
        bookingText={t.navBooking}
        labelText={t.navLabel}
      />
    </header>
  );
}
