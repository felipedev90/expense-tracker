import ExpenseItem from "../expenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";
import type { Expense } from "../../types/expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <div className={styles.expenseListContainer}>
      <div className={styles.expenseTitle}>
        <h2>Lista de Despesas</h2>
      </div>
      <div className={styles.expenseText}>
        {expenses.length === 0 ? (
          <p>Nenhuma despesa registrada.</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
