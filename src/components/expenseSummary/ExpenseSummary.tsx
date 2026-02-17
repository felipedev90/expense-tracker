import { formatCurrency } from "../../utils/currencyFormatter";

export default function ExpenseSummary({
  totalExpenses,
  totalAmount,
}: {
  totalExpenses: number;
  totalAmount: number;
}) {
  return (
    <div>
      <p>Total de despesas: {totalExpenses}</p>
      <p>Total gasto: {formatCurrency(totalAmount)}</p>
    </div>
  );
}
