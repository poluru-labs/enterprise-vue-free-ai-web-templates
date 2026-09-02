export const STATUS_TONE = {
  production: 'success',
  published: 'success',
  passed: 'success',
  ok: 'success',
  healthy: 'success',
  expanding: 'success',
  resolved: 'success',
  live: 'success',
  enabled: 'success',
  online: 'success',
  ready: 'success',
  closed_won: 'success',
  won: 'success',
  converted: 'success',
  open: 'info',
  proposal: 'info',
  propose: 'info',
  new: 'info',
  waiting: 'warning',
  pending: 'warning',
  review: 'warning',
  needs_review: 'warning',
  warn: 'warning',
  watch: 'warning',
  working: 'warning',
  discovery: 'warning',
  qualify: 'neutral',
  draft: 'warning',
  negotiation: 'brand',
  negotiate: 'brand',
  error: 'danger',
  failed: 'danger',
  critical: 'danger',
  at_risk: 'danger',
  lost: 'danger',
  paused: 'neutral',
  disabled: 'neutral',
  offline: 'neutral',
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

export function stageTone(stage) {
  if (stage === 'Closed won') return 'success';
  if (stage === 'Negotiation') return 'brand';
  if (stage === 'Proposal') return 'info';
  if (stage === 'Discovery') return 'warning';
  return 'neutral';
}

export function healthTone(health) {
  if (health === 'Expanding' || health === 'Healthy') return 'success';
  if (health === 'At risk') return 'danger';
  return 'info';
}

export function dealHealthTone(health) {
  if (health >= 70) return 'success';
  if (health >= 45) return 'warning';
  return 'danger';
}

export function severityTone(severity) {
  const key = String(severity || '').toLowerCase();
  if (key === 'critical' || key === 'high' || key === 'error' || key === 'p1') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn' || key === 'p2') return 'warning';
  if (key === 'low' || key === 'ok' || key === 'p3') return 'info';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}
