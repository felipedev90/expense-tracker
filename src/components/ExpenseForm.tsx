import { useState } from "react";
import {
  type ExpenseFormData,
  type Category,
  CATEGORY_CONFIG,
} from "../types/expense";

const categories: Category[] = [
  "Alimentação",
  "Saúde",
  "Lazer",
  "Bike",
  "Outros",
];

interface ExpenseFormProps {
  addExpense: (expenseData: ExpenseFormData) => void;
}

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Outros");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!description || !amount || !date || !category) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (Number(amount) <= 0) {
      alert("O valor da despesa deve ser maior que zero.");
      return;
    }

    addExpense({
      description,
      amount: Number(amount),
      date,
      category,
    });

    setDescription("");
    setAmount("");
    setDate("");
    setCategory("Outros");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Descrição:</label>
      <input
        placeholder="Descrição da despesa"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Valor:</label>
      <input
        placeholder="Valor da despesa"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label>Data:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>Categoria:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {CATEGORY_CONFIG[cat].icon} {cat}
          </option>
        ))}
      </select>
      <button type="submit">Adicionar Despesa</button>
    </form>
  );
}
