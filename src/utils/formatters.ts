export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('en-US')} ج.م`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}