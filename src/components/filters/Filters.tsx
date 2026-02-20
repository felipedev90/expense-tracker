import { useState, useEffect, useRef } from "react";
import { CalendarDays, Tags, Check, X } from "lucide-react";
import styles from "./Filters.module.css";
import { categories, CATEGORY_CONFIG } from "../../types/expense";
import type { Category } from "../../types/expense";
import type { Period } from "../../types/expense";

interface FiltersProps {
  selectedCategory: Category | "Todas";
  setSelectedCategory: (category: Category | "Todas") => void;
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
}

const periodOptions: Period[] = ["Todos", "Últimos 7 dias", "Últimos 30 dias"];

export default function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
}: FiltersProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const hasActiveFilters =
    selectedCategory !== "Todas" || selectedPeriod !== "Todos";

  const categoryMenuRef = useRef<HTMLDivElement | null>(null);
  const periodMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(target)
      ) {
        setIsCategoryOpen(false);
      }
      if (periodMenuRef.current && !periodMenuRef.current.contains(target)) {
        setIsPeriodOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.actionsRow}>
        <div
          className={`${styles.menuWrapper} ${styles.menuLeft}`}
          ref={categoryMenuRef}
        >
          <button
            type="button"
            className={`${styles.iconButton} ${
              selectedCategory !== "Todas" ? styles.iconButtonActive : ""
            }`}
            onClick={() => {
              setIsCategoryOpen((prev) => !prev);
              setIsPeriodOpen(false);
            }}
            aria-label="Filtrar por categoria"
            aria-expanded={isCategoryOpen}
          >
            <Tags size={18} />
          </button>

          {isCategoryOpen && (
            <div className={styles.menu}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setSelectedCategory("Todas");
                  setIsCategoryOpen(false);
                }}
              >
                <span className={styles.menuItemText}> Todas </span>
                {selectedCategory === "Todas" && <Check size={16} />}
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={styles.menuItem}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryOpen(false);
                  }}
                >
                  <span className={styles.menuItemText}>
                    {CATEGORY_CONFIG[category].icon} {category}
                  </span>
                  {selectedCategory === category && <Check size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div
          className={`${styles.menuWrapper} ${styles.menuRight}`}
          ref={periodMenuRef}
        >
          <button
            type="button"
            className={`${styles.iconButton} ${
              selectedPeriod !== "Todos" ? styles.iconButtonActive : ""
            }`}
            onClick={() => {
              setIsPeriodOpen((prev) => !prev);
              setIsCategoryOpen(false);
            }}
            aria-label="Filtrar por período"
            aria-expanded={isPeriodOpen}
          >
            <CalendarDays size={18} />
          </button>

          {isPeriodOpen && (
            <div className={styles.menu}>
              {periodOptions.map((period) => (
                <button
                  key={period}
                  type="button"
                  className={styles.menuItem}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsPeriodOpen(false);
                  }}
                >
                  <span className={styles.menuItemText}>{period}</span>
                  {selectedPeriod === period && <Check size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              setSelectedCategory("Todas");
              setSelectedPeriod("Todos");
              setIsCategoryOpen(false);
              setIsPeriodOpen(false);
            }}
            aria-label="Limpar filtros"
            title="Limpar filtros"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className={styles.activeFilters}>
        {selectedCategory !== "Todas" && (
          <span className={styles.badge}>
            {CATEGORY_CONFIG[selectedCategory].icon} {selectedCategory}
          </span>
        )}

        {selectedPeriod !== "Todos" && (
          <span className={styles.badge}>{selectedPeriod}</span>
        )}
      </div>
    </div>
  );
}
