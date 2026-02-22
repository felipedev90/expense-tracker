import { formatCurrency, formatDate } from "../../utils/formatters";
import { CATEGORY_CONFIG } from "../../types/expense";
import styles from "./ExpenseItem.module.css";
import { Trash2 } from "lucide-react";
import type { Expense } from "../../types/expense";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const categoryInfo = CATEGORY_CONFIG[expense.category];

  return (
    <li className={styles.expenseCard}>
      <div className={styles.expenseInfo}>
        <span className={styles.expenseLabel}>Descrição:</span>{" "}
        <span className={styles.expenseValue}>{expense.description}</span>
      </div>
      <div className={styles.expenseInfo}>
        <span className={styles.expenseLabel}>Valor:</span>{" "}
        <span className={styles.expenseValue}>
          {formatCurrency(expense.amount)}
        </span>
      </div>
      <div className={styles.expenseInfo}>
        <span className={styles.expenseLabel}>Data:</span>
        <time dateTime={expense.date} className={styles.expenseValue}>
          {formatDate(expense.date)}
        </time>
      </div>
      <div className={styles.expenseInfo}>
        <span className={styles.expenseLabel}>Categoria:</span>
        <span
          className={styles.expenseValue}
          style={{ color: categoryInfo.color, fontWeight: "600" }}
        >
          {categoryInfo.icon} {expense.category}
        </span>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(expense.id)}
          aria-label={`Deletar despesa ${expense.description}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}
