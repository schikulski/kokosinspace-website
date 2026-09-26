import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Kokos in Space Records · Oslo</span>
      <span className={`hand ${styles.note}`}>Kokos was not harmed in the making of this website.</span>
    </footer>
  );
}
