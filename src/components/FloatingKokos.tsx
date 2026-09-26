import styles from "./FloatingKokos.module.css";

/**
 * Kokos drifts around the bottom-right corner like an astronaut on a slow
 * spacewalk: an outer wrapper follows a wide, slow orbit while the image itself
 * tumbles and bobs on a shorter cycle, so the two never line up exactly.
 */
export function FloatingKokos() {
  return (
    <div className={styles.orbit} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/kokos-full.png" alt="" className={styles.kokos} width={520} height={658} />
    </div>
  );
}
