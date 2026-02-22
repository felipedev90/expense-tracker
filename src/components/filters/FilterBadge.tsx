import styles from "./Filters.module.css";

interface FilterBadgeProps {
  children: React.ReactNode;
}

export function FilterBadge({ children }: FilterBadgeProps) {
  return <span className={styles.badge}>{children}</span>;
}
