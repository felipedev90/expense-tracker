import { useState, useRef } from "react";
import { CalendarDays, Tags, X } from "lucide-react";
import styles from "./Filters.module.css";
import { categories, CATEGORY_CONFIG } from "../../types/expense";
import type { Category, Period } from "../../types/expense";

import { FilterButton } from "./FilterButton";
import { FilterMenu } from "./FilterMenu";
import { FilterBadge } from "./FilterBadge";
import { useClickOutside } from "../../hooks/useClickOutside";

interface FiltersProps {
  selectedCategory: Category | "Todas";
  setSelectedCategory: (category: Category | "Todas") => void;
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
}

// Array real de períodos para renderizar no menu com .map()
const periodOptions: Period[] = ["Todos", "Últimos 7 dias", "Últimos 30 dias"];

export default function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
}: FiltersProps) {
  // Estado local da UI
  // Controla abertura/fechamento dos menus dropdown
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  // Verifica se há filtros ativos (para mostrar botão limpar)
  const hasActiveFilters =
    selectedCategory !== "Todas" || selectedPeriod !== "Todos";

  // Refs para detectar clique fora dos menus
  // Apontam para os wrappers que contem botão + menu
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const periodMenuRef = useRef<HTMLDivElement>(null);

  // Fecha menus ao clicar fora (custom hook)
  // @ts-expect-error - Incompatibilidade de tipos genéricos, mas funciona corretamente
  useClickOutside(categoryMenuRef, () => setIsCategoryOpen(false));
  // @ts-expect-error - Incompatibilidade de tipos genéricos, mas funciona corretamente
  useClickOutside(periodMenuRef, () => setIsPeriodOpen(false));

  return (
    <div className={styles.filterContainer}>
      {/* === LINHA DE AÇÕES (Botões de filtro) === */}
      <div className={styles.actionsRow}>
        {/* FILTRO DE CATEGORIA */}
        <div
          className={`${styles.menuWrapper} ${styles.menuLeft}`}
          ref={categoryMenuRef}
        >
          {/* Botão que abre e fecha o menu de categoria */}
          <FilterButton
            icon={Tags}
            isActive={selectedCategory !== "Todas"}
            isOpen={isCategoryOpen}
            onClick={() => {
              setIsCategoryOpen((prev) => !prev);
              setIsPeriodOpen(false); // Fecha o outro menu
            }}
            label="Filtrar por categoria"
          />

          {/* Menu dropdown (renderiza condicionalmente) */}
          {isCategoryOpen && (
            <FilterMenu
              options={["Todas", ...categories]}
              selectedValue={selectedCategory}
              onSelect={(cat) => {
                setSelectedCategory(cat);
                setIsCategoryOpen(false);
              }}
              renderOption={(cat) =>
                cat === "Todas"
                  ? "Todas"
                  : `${CATEGORY_CONFIG[cat].icon} ${cat}`
              }
            />
          )}
        </div>

        {/* FILTRO DE PERÍODO */}
        <div
          className={`${styles.menuWrapper} ${styles.menuRight}`}
          ref={periodMenuRef}
        >
          {/* Botão que abre e fecha o menu de período */}
          <FilterButton
            icon={CalendarDays}
            isActive={selectedPeriod !== "Todos"}
            isOpen={isPeriodOpen}
            onClick={() => {
              setIsPeriodOpen((prev) => !prev);
              setIsCategoryOpen(false);
            }}
            label="Filtrar por período"
          />

          {/* Menu dropdown (renderiza condicionalmente) */}
          {isPeriodOpen && (
            <FilterMenu
              options={periodOptions}
              selectedValue={selectedPeriod}
              onSelect={(period) => {
                setSelectedPeriod(period);
                setIsPeriodOpen(false);
              }}
              renderOption={(period) => period}
            />
          )}
        </div>

        {/* Botão de limpar filtros (Só aparece se tiver filtro ativo)*/}
        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              // Reseta os filtros no App
              setSelectedCategory("Todas");
              setSelectedPeriod("Todos");
              // Garante que ambos os menus estejam fechados
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

      {/* BADGES DE FILTROS ATIVOS (Feedback visual) */}
      <div className={styles.activeFilters}>
        {selectedCategory !== "Todas" && (
          <FilterBadge>
            {CATEGORY_CONFIG[selectedCategory].icon} {selectedCategory}
          </FilterBadge>
        )}
        {selectedPeriod !== "Todos" && (
          <FilterBadge>{selectedPeriod}</FilterBadge>
        )}
      </div>
    </div>
  );
}
