import styles from "./Marquee.module.css";

export function Marquee({ names }: { names: string[] }) {
  const items = [...names, ...names];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {items.map((n, i) => (
          <span key={i} className={styles.item}>
            <span>{n}</span>
            <span className={styles.star}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
