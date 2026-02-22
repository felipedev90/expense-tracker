import { formatCurrency } from "../../utils/formatters";
import styles from "./ExpenseSummary.module.css";

export default function ExpenseSummary({
  totalExpenses,
  totalAmount,
}: {
  totalExpenses: number;
  totalAmount: number;
}) {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryInfo}>
        <p className={styles.summaryText}>TOTAL DE DESPESAS</p>
        <span className={styles.summarySpanExpense}>{totalExpenses}</span>
      </div>
      <div className={styles.summaryInfo}>
        <p className={styles.summaryText}>TOTAL GASTO </p>
        <span className={styles.summarySpanTotal}>
          {formatCurrency(totalAmount)}
        </span>
      </div>
    </div>
  );
}
