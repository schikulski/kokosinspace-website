import type { ContactEmails } from "@/lib/db/queries";
import type { Texts } from "@/lib/texts";
import { Newsletter } from "./Newsletter";
import styles from "./Contact.module.css";

export function Contact({ bookingEmail, labelEmail, t }: ContactEmails & { t: Texts }) {
  return (
    <section id="newsletter" className={`container ${styles.section}`}>
      <Newsletter
        t={{
          heading: t.newsletterHeading,
          nameLabel: t.newsletterNameLabel,
          namePlaceholder: t.newsletterNamePlaceholder,
          emailLabel: t.newsletterEmailLabel,
          emailPlaceholder: t.newsletterEmailPlaceholder,
          button: t.newsletterButton,
          sending: t.newsletterSending,
          success: t.newsletterSuccess,
          error: t.newsletterError,
        }}
      />
      <div className={styles.right}>
        <p className={`hand ${styles.note}`}>{t.contactNote}</p>
        <div className={styles.buttons}>
          <a href={`mailto:${bookingEmail}`} className={styles.booking}>
            {t.contactBooking}
          </a>
          <a href={`mailto:${labelEmail}`} className={styles.label}>
            {t.contactLabel}
          </a>
        </div>
        <div className={styles.socials}>
          {t.instagramUrl && (
            <a href={t.instagramUrl} target="_blank" rel="noopener" className="chip chip--ink">
              {t.chipInstagram}
            </a>
          )}
          {t.spotifyPlaylistUrl && (
            <a href={t.spotifyPlaylistUrl} target="_blank" rel="noopener" className="chip chip--teal">
              {t.chipSpotify}
            </a>
          )}
          {t.bandcampUrl && (
            <a href={t.bandcampUrl} target="_blank" rel="noopener" className="chip chip--outline">
              {t.chipBandcamp}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
