import type { LucideIcon } from "lucide-react";
import styles from "./Filters.module.css";

interface FilterButtonProps {
  icon: LucideIcon;
  isActive: boolean;
  isOpen: boolean;
  onClick: () => void;
  label: string;
}

export function FilterButton({
  icon: Icon,
  isActive,
  isOpen,
  onClick,
  label,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${isActive ? styles.iconButtonActive : ""}`}
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
    >
      <Icon size={18} />
    </button>
  );
}
