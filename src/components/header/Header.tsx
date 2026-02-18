import styles from "./Header.module.css";
import { DollarSign } from "lucide-react";

export default function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          <h1>
            <DollarSign size={28} /> Expense Tracker <DollarSign size={28} />
          </h1>
        </div>
        <div className={styles.subtitle}>
          <p>Gerencie suas despesas de forma fácil e eficiente.</p>
        </div>
      </div>
    </header>
  );
}
