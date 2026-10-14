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

export function formatNumber(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US');
}

export function formatPercent(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return `${Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 })}%`;
}

export function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function successBand(score) {
  const value = Number(score || 0);
  if (value >= 95) return 'passing';
  if (value >= 85) return 'watch';
  return 'failing';
}
