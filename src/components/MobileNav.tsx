"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MobileNav.module.css";

type Props = {
  links: { href: string; label: string }[];
  bookingEmail: string;
  labelEmail: string;
  bookingText: string;
  labelText: string;
};

export function MobileNav({ links, bookingEmail, labelEmail, bookingText, labelText }: Props) {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const burger = burgerRef.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        type="button"
        ref={burgerRef}
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
      {/* Portalled to <body>: the sticky header uses backdrop-filter, which would
          otherwise trap this position: fixed overlay inside the header's box. */}
      {open &&
        createPortal(
          <div id="mobile-menu" className={styles.overlay} role="dialog" aria-modal="true">
            <button
              ref={closeRef}
              type="button"
              className={`${styles.burger} ${styles.close}`}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span />
              <span />
            </button>
            <nav className={styles.menu} aria-label="Main" onClick={() => setOpen(false)}>
              {links.map((l, i) => (
                <a key={l.href} href={l.href} className={styles.item} style={{ transform: `rotate(${i % 2 ? 1 : -1.5}deg)` }}>
                  {l.label}
                </a>
              ))}
              <div className={styles.chips}>
                <a href={`mailto:${bookingEmail}`} className={styles.booking}>
                  {bookingText}
                </a>
                <a href={`mailto:${labelEmail}`} className={styles.label}>
                  {labelText}
                </a>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
