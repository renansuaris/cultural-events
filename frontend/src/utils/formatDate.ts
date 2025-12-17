export function formatDate(dateString: string): string {
  if (!dateString) return 'Data a definir';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}