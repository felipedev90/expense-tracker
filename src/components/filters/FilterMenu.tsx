import { Check } from "lucide-react";
import styles from "./Filters.module.css";

interface FilterMenuProps<T> {
  options: readonly T[];
  selectedValue: T;
  onSelect: (value: T) => void;
  renderOption: (option: T) => React.ReactNode;
}

export function FilterMenu<T extends string>({
  options,
  selectedValue,
  onSelect,
  renderOption,
}: FilterMenuProps<T>) {
  return (
    <div className={styles.menu}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.menuItem}
          onClick={() => onSelect(option)}
        >
          <span className={styles.menuItemText}>{renderOption(option)}</span>

          {selectedValue === option && <Check size={16} />}
        </button>
      ))}
    </div>
  );
}
