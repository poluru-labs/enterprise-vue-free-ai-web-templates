export const STATUS_TONE = {
  published: 'success',
  draft: 'neutral',
  stale: 'danger',
  in_review: 'warning',
  approved: 'success',
  archived: 'neutral',
  unread: 'info',
  live: 'success',
  pending: 'warning',
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

export function severityTone(severity) {
  const key = String(severity || '').toLowerCase();
  if (key === 'critical' || key === 'high' || key === 'severe' || key === 'stale') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'warning') return 'warning';
  if (key === 'low' || key === 'info') return 'info';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'overdue' || key === 'stale') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'due_tomorrow') return 'warning';
  return 'success';
}
