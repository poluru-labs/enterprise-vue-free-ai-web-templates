export const STATUS_TONE = {
  active: 'success',
  production: 'success',
  published: 'success',
  passed: 'success',
  paid: 'success',
  current: 'success',
  ok: 'success',
  healthy: 'success',
  resolved: 'success',
  closed: 'success',
  live: 'success',
  enabled: 'success',
  restored: 'success',
  stable: 'success',
  on_track: 'success',
  trial: 'warning',
  review: 'warning',
  needs_review: 'warning',
  warn: 'warning',
  watch: 'warning',
  draft: 'warning',
  invited: 'warning',
  pending: 'warning',
  waiting: 'warning',
  past_due: 'warning',
  dunning: 'warning',
  beta: 'warning',
  at_risk: 'warning',
  medium: 'warning',
  error: 'danger',
  failed: 'danger',
  critical: 'danger',
  urgent: 'danger',
  high: 'danger',
  suspended: 'danger',
  overdue: 'danger',
  cancelled: 'danger',
  delinquent: 'danger',
  breached: 'danger',
  breach: 'danger',
  open: 'info',
  new: 'info',
  unassigned: 'info',
  paused: 'neutral',
  disabled: 'neutral',
  inactive: 'neutral',
  archived: 'neutral',
  development: 'neutral',
  low: 'neutral',
  rollout: 'info',
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
  if (key === 'critical' || key === 'high' || key === 'urgent' || key === 'error') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn') return 'warning';
  if (key === 'low' || key === 'ok') return 'info';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'info' : tone;
}
