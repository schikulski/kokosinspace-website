import { site } from "@/lib/site";
import { Newsletter } from "./Newsletter";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="newsletter" className={`container ${styles.section}`}>
      <Newsletter />
      <div className={styles.right}>
        <p className={`hand ${styles.note}`}>Want a band on your stage? Want to talk to the label? Two buttons, one cat.</p>
        <div className={styles.buttons}>
          <a href={`mailto:${site.bookingEmail}`} className={styles.booking}>
            Booking →
          </a>
          <a href={`mailto:${site.labelEmail}`} className={styles.label}>
            Label contact →
          </a>
        </div>
        <div className={styles.socials}>
          <a href={site.instagram} target="_blank" rel="noopener" className="chip chip--ink">
            Instagram
          </a>
          <a href={site.spotifyPlaylist} target="_blank" rel="noopener" className="chip chip--teal">
            Spotify
          </a>
          {site.bandcamp && (
            <a href={site.bandcamp} target="_blank" rel="noopener" className="chip chip--outline">
              Bandcamp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
