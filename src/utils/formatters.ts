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

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString("pt-BR");
}
