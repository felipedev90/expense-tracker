export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
}

export type Category = "Alimentação" | "Saúde" | "Lazer" | "Bike" | "Outros";

export type ExpenseFormData = Omit<Expense, "id">;

export const CATEGORY_CONFIG = {
  Alimentação: { color: "#FF6B6B", icon: "🍔" },
  Saúde: { color: "#4ECDC4", icon: "💊" },
  Lazer: { color: "#95E1D3", icon: "🎮" },
  Bike: { color: "#F38181", icon: "🚴" },
  Outros: { color: "#A8E6CF", icon: "📦" },
} as const;
