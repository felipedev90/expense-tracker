import type { Category } from "../../types/expense";
import { categories, CATEGORY_CONFIG } from "../../types/expense";
import type { Period } from "../../types/expense";

interface FiltersProps {
  selectedCategory: Category | "Todas";
  setSelectedCategory: (category: Category | "Todas") => void;
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
}

export default function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
}: FiltersProps) {
  return (
    <div>
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
      <div>
        <label htmlFor="period">Filtrar por período:</label>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as Period)}
        >
          <option value="Todos">📅 Todos</option>
          <option value="Últimos 7 dias">📅 Últimos 7 dias</option>
          <option value="Últimos 30 dias">📅 Últimos 30 dias</option>
        </select>
      </div>
    </div>
  );
}
