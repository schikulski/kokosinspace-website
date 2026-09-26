import styles from "./FloatingKokos.module.css";

export function FloatingKokos() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/kokos-full.png" alt="" aria-hidden="true" className={styles.kokos} width={520} height={658} />
  );
}
