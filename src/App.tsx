import { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ExpenseForm from "./components/expenseForm/ExpenseForm";
import ExpenseList from "./components/expenseList/ExpenseList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type {
  Expense,
  ExpenseFormData,
  Category,
  Period,
} from "./types/expense";
import ExpenseSummary from "./components/expenseSummary/ExpenseSummary";
import Filters from "./components/filters/Filters";

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    "expense-tracker-expenses",
    [],
  );

  const [selectedCategory, setSelectedCategory] = useState<Category | "Todas">(
    "Todas",
  );

  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Todos");

  const hoje = new Date();

  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);

  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(hoje.getDate() - 30);

  const filteredPeriod =
    selectedPeriod === "Todos"
      ? expenses
      : expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          if (selectedPeriod === "Últimos 7 dias") {
            return expenseDate >= seteDiasAtras && expenseDate <= hoje;
          }
          if (selectedPeriod === "Últimos 30 dias") {
            return expenseDate >= trintaDiasAtras && expenseDate <= hoje;
          }
          return false;
        });

  const filteredExpenses =
    selectedCategory === "Todas"
      ? filteredPeriod
      : filteredPeriod.filter(
          (expense) => expense.category === selectedCategory,
        );

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
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <ExpenseSummary
        totalExpenses={filteredExpenses.length}
        totalAmount={totalDeGastos}
      />

      <ExpenseForm addExpense={addExpenseHandler} />
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpenseHandler}
      />

      <Footer />
    </div>
  );
}

export default App;
