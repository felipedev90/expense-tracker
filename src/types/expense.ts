export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
}

export type ExpenseFormData = Omit<Expense, "id">;
export type Category =
  | "Alimentação"
  | "Saúde"
  | "Lazer"
  | "Transporte"
  | "Educação"
  | "Casa"
  | "Outros";
export type Period = "Todos" | "Últimos 7 dias" | "Últimos 30 dias";

export const CATEGORY_CONFIG = {
  Alimentação: { color: "#FF6B6B", icon: "🍔" },
  Saúde: { color: "#4ECDC4", icon: "💊" },
  Lazer: { color: "#95E1D3", icon: "🎮" },
  Transporte: { color: "#F59E0B", icon: "🚗" },
  Educação: { color: "#8B5CF6", icon: "📚" },
  Casa: { color: "#EC4899", icon: "🏠" },
  Outros: { color: "#A8E6CF", icon: "📦" },
} as const;

export const categories: Category[] = Object.keys(
  CATEGORY_CONFIG,
) as Category[];
