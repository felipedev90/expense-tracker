import { useState } from "react";
import type { Expense, ExpenseFormData } from "./types/expense";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

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

  return (
    <div>
      <Header />
      <p>Total de despesas: {expenses.length}</p>
      <ExpenseForm addExpense={addExpenseHandler} />
    </div>
  );
}

export default App;
