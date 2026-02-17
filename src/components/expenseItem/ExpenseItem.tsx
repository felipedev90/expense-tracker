import { formatCurrency } from "../../utils/currencyFormatter";
import { CATEGORY_CONFIG } from "../../types/expense";
import type { Expense } from "../../types/expense";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const categoryInfo = CATEGORY_CONFIG[expense.category];

  return (
    <li>
      <div>
        <strong>Descrição: </strong>
        {expense.description} <br />
      </div>
      <div>
        <strong>Valor:</strong> <span>{formatCurrency(expense.amount)}</span>{" "}
        <br />
      </div>
      <div>
        <strong>Data:</strong>{" "}
        <time dateTime={expense.date}>
          {new Date(expense.date).toLocaleDateString("pt-BR")}
        </time>{" "}
        <br />
      </div>
      <div>
        <strong>Categoria:</strong>
        <span style={{ color: categoryInfo.color }}>
          {categoryInfo.icon} {expense.category}
        </span>
        <br />
      </div>
      <div>
        <button
          onClick={() => onDelete(expense.id)}
          aria-label={`Deletar despesa ${expense.description}`}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
