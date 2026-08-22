export function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value)
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat('id-ID', { notation: 'compact', compactDisplay: 'short' }).format(value)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(iso))
}
