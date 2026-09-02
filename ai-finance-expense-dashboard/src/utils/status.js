export const STATUS_TONE = {
  approved: 'success',
  paid: 'success',
  active: 'success',
  excellent: 'success',
  preferred: 'success',
  on_track: 'info',
  pending: 'warning',
  review: 'warning',
  at_risk: 'warning',
  watch: 'warning',
  overdue: 'danger',
  rejected: 'danger',
  blocked: 'danger',
  inactive: 'neutral',
  archived: 'neutral',
  draft: 'neutral',
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

export function budgetTone(percentUsed) {
  if (percentUsed >= 90) return 'danger';
  if (percentUsed >= 70) return 'warning';
  return 'success';
}
