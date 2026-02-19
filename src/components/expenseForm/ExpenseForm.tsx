import { useState } from "react";
import styles from "./ExpenseForm.module.css";
import { CATEGORY_CONFIG, categories } from "../../types/expense";
import type { ExpenseFormData, Category } from "../../types/expense";

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
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Adicionar despesa:</h2>
      <label htmlFor="description" className={styles.label}>
        Descrição:
      </label>
      <input
        id="description"
        className={styles.input}
        placeholder="Descrição da despesa"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="amount" className={styles.label}>
        Valor:
      </label>
      <input
        id="amount"
        className={styles.input}
        placeholder="Valor da despesa"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label htmlFor="date" className={styles.label}>
        Data:
      </label>
      <input
        id="date"
        className={styles.input}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor="category" className={styles.label}>
        Categoria:
      </label>
      <select
        id="category"
        className={styles.input}
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {CATEGORY_CONFIG[cat].icon} {cat}
          </option>
        ))}
      </select>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonAdd} type="submit">
          Adicionar Despesa
        </button>
      </div>
    </form>
  );
}
