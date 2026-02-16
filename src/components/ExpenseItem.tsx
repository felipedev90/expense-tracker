import type { Expense } from "../types/expense";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  return (
    <li>
      <div>
        <strong>Descrição: </strong>
        {expense.description} <br />
      </div>
      <div>
        <strong>Valor:</strong>{" "}
        <span>
          {expense.amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>{" "}
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
        <strong>Categoria:</strong> {expense.category}
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
