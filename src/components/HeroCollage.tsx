"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroImage } from "@/lib/db/schema";
import styles from "./Hero.module.css";

const INTERVAL_MS = 7000;

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * The taped-on band photo in the hero. Every page view picks a random photo
 * to start with, then slowly crossfades through the rest in a shuffled order.
 * The page is statically cached, so the pick happens in the browser on mount.
 */
export function HeroCollage({ images }: { images: HeroImage[] }) {
  const [order, setOrder] = useState<number[] | null>(null);
  const [pos, setPos] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Random pick must happen after hydration (the HTML is cached), so a
    // synchronous setState here is intentional: one extra render on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(shuffle(images.map((_, i) => i)));
    // Enable fade transitions only after the first photo is on screen.
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, [images]);

  useEffect(() => {
    if (!order || order.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setPos((p) => (p + 1) % order.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [order]);

  const active = order ? order[pos] : -1;

  return (
    <div className={styles.collage}>
      <div className={`${styles.photoStack} ${ready ? styles.photoStackReady : ""}`}>
        {images.map((img, i) => (
          <Image
            key={img.id}
            src={img.url}
            alt={img.alt}
            width={1600}
            height={1076}
            sizes="(max-width: 639px) 75vw, 450px"
            className={`${styles.photo} ${i === active ? styles.photoActive : ""}`}
            priority
            aria-hidden={i !== active}
          />
        ))}
      </div>
      <div className="tape" style={{ left: "28%", top: -14 }} />
      <Image
        src="/images/patch-color.png"
        alt="Kokos in Space Records patch"
        width={900}
        height={900}
        sizes="(max-width: 639px) 58vw, 350px"
        className={styles.patch}
        priority
      />
    </div>
  );
}
