export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
}

export type Category = "Alimentação" | "Saúde" | "Lazer" | "Bike" | "Outros";

export type ExpenseFormData = Omit<Expense, "id">;
