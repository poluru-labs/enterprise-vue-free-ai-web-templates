const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function toDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function formatDateTime(value) {
  const date = toDate(value);
  return date ? dateTimeFormatter.format(date) : '—';
}

export function formatDate(value) {
  if (!value) return '—';
  const source = typeof value === 'string' && value.length === 10 ? `${value}T12:00:00` : value;
  const date = toDate(source);
  return date ? dateFormatter.format(date) : '—';
}

export function formatMoney(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return moneyFormatter.format(Number(value));
}

export function formatNumber(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US');
}

export function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function healthBand(score) {
  const value = Number(score || 0);
  if (value >= 75) return 'healthy';
  if (value >= 50) return 'watch';
  return 'at_risk';
}

export function daysUntil(value) {
  if (!value) return null;
  const source = typeof value === 'string' && value.length === 10 ? `${value}T12:00:00` : value;
  const date = toDate(source);
  if (!date) return null;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - start.getTime()) / 86400000);
}
