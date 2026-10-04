export const STATUS_TONE = {
  effective: 'success',
  published: 'success',
  closed: 'success',
  mapped: 'success',
  accepted: 'success',
  ok: 'success',
  healthy: 'success',
  in_review: 'warning',
  review: 'warning',
  planned: 'info',
  in_progress: 'info',
  fieldwork: 'warning',
  reporting: 'warning',
  mitigating: 'warning',
  gap: 'danger',
  open: 'danger',
  overdue: 'danger',
  draft: 'neutral',
  archived: 'neutral',
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
  if (key === 'critical' || key === 'high' || key === 'error') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn') return 'warning';
  if (key === 'low' || key === 'ok') return 'info';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'info' : tone;
}

export function riskBand(score) {
  const value = Number(score || 0);
  if (value >= 16) return 'critical';
  if (value >= 10) return 'high';
  if (value >= 6) return 'medium';
  return 'low';
}
