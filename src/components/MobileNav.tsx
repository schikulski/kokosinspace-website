"use client";

import { useEffect, useState } from "react";
import styles from "./MobileNav.module.css";

type Props = {
  links: { href: string; label: string }[];
  bookingEmail: string;
  labelEmail: string;
};

export function MobileNav({ links, bookingEmail, labelEmail }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.burger}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      {open && (
        <div id="mobile-menu" className={styles.overlay} role="dialog" aria-modal="true">
          <nav className={styles.menu} aria-label="Main" onClick={() => setOpen(false)}>
            {links.map((l, i) => (
              <a key={l.href} href={l.href} className={styles.item} style={{ transform: `rotate(${i % 2 ? 1 : -1.5}deg)` }}>
                {l.label}
              </a>
            ))}
            <div className={styles.chips}>
              <a href={`mailto:${bookingEmail}`} className={styles.booking}>
                Booking
              </a>
              <a href={`mailto:${labelEmail}`} className={styles.label}>
                Label
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
