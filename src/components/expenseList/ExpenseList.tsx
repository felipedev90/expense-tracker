import type React from "react";
import ExpenseItem from "../expenseItem/ExpenseItem";
import Filters from "../filters/Filters";
import styles from "./ExpenseList.module.css";
import type { Expense, Category, Period } from "../../types/expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;

  showFilters: boolean;

  selectedCategory: Category | "Todas";
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | "Todas">>;

  selectedPeriod: Period;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<Period>>;
}

export default function ExpenseList({
  expenses,
  onDelete,
  showFilters,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
}: ExpenseListProps) {
  return (
    <div className={styles.expenseListContainer}>
      <div className={styles.expenseTitle}>
        <h2>Lista de Despesas</h2>
      </div>

      {showFilters && (
        <div className={styles.filtersWrapper}>
          <Filters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
        </div>
      )}
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
