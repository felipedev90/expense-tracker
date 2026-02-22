import { useState, useEffect, useRef } from "react";
import { CalendarDays, Tags, Check, X } from "lucide-react";
import styles from "./Filters.module.css";
import { categories, CATEGORY_CONFIG } from "../../types/expense";
import type { Category, Period } from "../../types/expense";

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
  // Controla se o menu de categoria está aberto ou fechado
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  // Estado derivado (calculado)
  // true se qualquer filtro estiver ativo.
  const hasActiveFilters =
    selectedCategory !== "Todas" || selectedPeriod !== "Todos";

  // Refs para detectar clique fora dos menus
  // Apontam para os wrappers que contem botão + menu
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);
  const periodMenuRef = useRef<HTMLDivElement | null>(null);

  // Fecha menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Se clicou fora do menu de categoria, fecha ele
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(target)
      ) {
        setIsCategoryOpen(false);
      }

      // Se clicou fora do menu de período, fecha ele
      if (periodMenuRef.current && !periodMenuRef.current.contains(target)) {
        setIsPeriodOpen(false);
      }
    }

    // Adiciona listener global para detectar clique fora dos menus
    document.addEventListener("mousedown", handleClickOutside);

    // Remove listener ao desmontar componente para evitar vazamento de memória (cleanup)
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
            // Se categoria ativa != "Todas", aplica estilo ativo
            className={`${styles.iconButton} ${
              selectedCategory !== "Todas" ? styles.iconButtonActive : ""
            }`}
            onClick={() => {
              // Alterna abertura do menu de categoria
              // Fecha menu de período para garantir que só um menu esteja aberto
              setIsCategoryOpen((prev) => !prev);
              setIsPeriodOpen(false);
            }}
            aria-label="Filtrar por categoria"
            aria-expanded={isCategoryOpen}
          >
            <Tags size={18} />
          </button>

          {/* Renderização condicional: só mostra o menu se estiver aberto */}
          {isCategoryOpen && (
            <div className={styles.menu}>
              {/* Opção 'Todas' (reseta o filtro de categoria*/}
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setSelectedCategory("Todas");
                  setIsCategoryOpen(false); // Fecha o menu após selecionar a opção
                }}
              >
                <span className={styles.menuItemText}> Todas </span>

                {/* Mostra check se essa opção for a selecionada */}
                {selectedCategory === "Todas" && <Check size={16} />}
              </button>

              {/* Renderiza todas as categorias dinamicamente */}
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={styles.menuItem}
                  onClick={() => {
                    setSelectedCategory(category); // Aplica filtro no App
                    setIsCategoryOpen(false); // Fecha o menu após selecionar a opção
                  }}
                >
                  <span className={styles.menuItemText}>
                    {CATEGORY_CONFIG[category].icon} {category}
                  </span>

                  {/* Check ao lado da categoria ativa */}
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
            // Se período ativo != "Todos", aplica estilo ativo
            className={`${styles.iconButton} ${
              selectedPeriod !== "Todos" ? styles.iconButtonActive : ""
            }`}
            onClick={() => {
              setIsPeriodOpen((prev) => !prev); // Alterna abertura do menu de período
              setIsCategoryOpen(false); // Fecha menu de categoria para garantir que só um menu esteja aberto
            }}
            aria-label="Filtrar por período"
            aria-expanded={isPeriodOpen}
          >
            <CalendarDays size={18} />
          </button>

          {/* Menu de periodo condicional */}
          {isPeriodOpen && (
            <div className={styles.menu}>
              {periodOptions.map((period) => (
                <button
                  key={period}
                  type="button"
                  className={styles.menuItem}
                  onClick={() => {
                    setSelectedPeriod(period); // Aplica filtro no App
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

        {/* Botão limpar filtros: Só aparece se tiver algum filtro ativo */}
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

      {/* Área de badges com filtros ativos (feedback visual) */}
      <div className={styles.activeFilters}>
        {/* Badge de categoria só aparece se não for "Todas" */}
        {selectedCategory !== "Todas" && (
          <span className={styles.badge}>
            {CATEGORY_CONFIG[selectedCategory].icon} {selectedCategory}
          </span>
        )}
        {/* Badge de categoria só aparece se não for "Todas" */}
        {selectedPeriod !== "Todos" && (
          <span className={styles.badge}>{selectedPeriod}</span>
        )}
      </div>
    </div>
  );
}
