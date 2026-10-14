export const STATUS_TONE = {
  passing: 'success',
  healthy: 'success',
  shipped: 'success',
  watch: 'warning',
  rolling: 'warning',
  queued: 'warning',
  building: 'warning',
  staged: 'warning',
  failing: 'danger',
  failed: 'danger',
  down: 'danger',
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
