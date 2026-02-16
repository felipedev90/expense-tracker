export function formatCurrency(
  value: number,
  locale: string = "pt-BR",
  currency: string = "BRL",
): string {
  return value.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
