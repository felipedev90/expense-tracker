import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          <h1>Expense Tracker</h1>
        </div>
        <div className={styles.subtitle}>
          <p>Gerencie suas despesas de forma fácil e eficiente.</p>
        </div>
      </div>
    </header>
  );
}
