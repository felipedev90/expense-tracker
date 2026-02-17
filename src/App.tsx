import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { formatCurrency } from "./utils/currencyFormatter";
import { CATEGORY_CONFIG, categories } from "./types/expense";
import type { Expense, ExpenseFormData, Category } from "./types/expense";

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    "expense-tracker-expenses",
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | "Todas">(
    "Todas",
  );

  const filteredExpenses =
    selectedCategory === "Todas"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  function addExpenseHandler(expenseData: ExpenseFormData) {
    const newId = crypto.randomUUID();

    setExpenses((prevExpenses) => {
      return [...prevExpenses, { ...expenseData, id: newId }];
    });
  }

  function deleteExpenseHandler(id: string) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  const totalDeGastos = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  return (
    <div>
      <Header />
      <div>
        <label htmlFor="category">Filtrar por categoria:</label>
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as Category | "Todas")
          }
        >
          <option value="Todas">📊 Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_CONFIG[category].icon} {category}
            </option>
          ))}
        </select>
      </div>
      <p>Total de despesas: {expenses.length}</p>
      <ExpenseForm addExpense={addExpenseHandler} />
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpenseHandler}
      />
      {totalDeGastos === 0 ? (
        ""
      ) : (
        <span>Total gasto: {formatCurrency(totalDeGastos)}</span>
      )}
      <Footer />
    </div>
  );
}

export default App;
