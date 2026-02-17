import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { formatCurrency } from "./utils/currencyFormatter";
import type { Expense, ExpenseFormData } from "./types/expense";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const saved = localStorage.getItem("expense-tracker-expenses");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Erro ao carregar do localStorage:", error);
      return [];
    }
  });

  const STORAGE_KEY = "expense-tracker-expenses";

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }, [expenses]);

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

  const totalDeGastos = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  return (
    <div>
      <Header />
      <p>Total de despesas: {expenses.length}</p>
      <ExpenseForm addExpense={addExpenseHandler} />
      <ExpenseList expenses={expenses} onDelete={deleteExpenseHandler} />
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
