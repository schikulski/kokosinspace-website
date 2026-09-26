"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroImage } from "@/lib/db/schema";
import styles from "./Hero.module.css";

const INTERVAL_MS = 7000;

/**
 * The taped-on band photo in the hero. With several images it slowly
 * crossfades through them; with one it is just a photo.
 */
export function HeroCollage({ images }: { images: HeroImage[] }) {
  const [index, setIndex] = useState(0);
  const many = images.length > 1;

  useEffect(() => {
    if (!many) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [many, images.length]);

  return (
    <div className={styles.collage}>
      <div className={styles.photoStack}>
        {images.map((img, i) => (
          <Image
            key={img.id}
            src={img.url}
            alt={img.alt}
            width={1600}
            height={1076}
            sizes="(max-width: 639px) 75vw, 450px"
            className={`${styles.photo} ${i === index ? styles.photoActive : ""}`}
            priority={i === 0}
            aria-hidden={i !== index}
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
