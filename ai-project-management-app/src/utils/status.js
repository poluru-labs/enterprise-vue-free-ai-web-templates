export const STATUS_TONE = {
  done: 'success',
  closed: 'success',
  resolved: 'success',
  'on track': 'success',
  headroom: 'success',
  review: 'warning',
  watch: 'warning',
  tight: 'warning',
  mitigating: 'warning',
  'in progress': 'info',
  active: 'info',
  open: 'info',
  planned: 'neutral',
  todo: 'neutral',
  'at risk': 'danger',
  blocked: 'danger',
  critical: 'danger',
  high: 'danger',
  medium: 'warning',
  low: 'info',
  story: 'info',
  bug: 'danger',
  task: 'neutral',
};

export function statusTone(status) {
  if (!status) return 'neutral';
  const key = String(status).toLowerCase().replace(/[_-]+/g, ' ').trim();
  return STATUS_TONE[key] || 'neutral';
}

export function statusLabel(status) {
  if (!status) return 'Unknown';
  return String(status)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function columnLabel(column) {
  const labels = {
    todo: 'To do',
    in_progress: 'In progress',
    review: 'Review',
    done: 'Done',
  };
  return labels[column] || statusLabel(column);
}

export function severityTone(severity) {
  const key = String(severity || '').toLowerCase();
  if (key === 'critical' || key === 'high') return 'danger';
  if (key === 'medium') return 'warning';
  if (key === 'low') return 'info';
  return 'neutral';
}

export function loadTone(load) {
  if (load >= 85) return 'warning';
  if (load >= 70) return 'brand';
  return 'success';
}
