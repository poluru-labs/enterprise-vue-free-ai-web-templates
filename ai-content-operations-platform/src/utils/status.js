export const STATUS_TONE = {
  published: 'success',
  approved: 'success',
  scheduled: 'info',
  in_review: 'warning',
  review: 'warning',
  draft: 'neutral',
  idea: 'neutral',
  archived: 'neutral',
  live: 'success',
  paused: 'warning',
  overdue: 'danger',
};

export function statusTone(status) {
  if (!status) return 'neutral';
  const key = String(status).toLowerCase().replace(/[\s-]+/g, '_');
  return STATUS_TONE[key] || 'neutral';
}

export function statusLabel(status) {
  if (!status) return 'Unknown';
  return String(status)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'info' : tone;
}
