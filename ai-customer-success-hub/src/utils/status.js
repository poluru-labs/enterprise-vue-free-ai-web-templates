export const STATUS_TONE = {
  healthy: 'success',
  renewed: 'success',
  committed: 'success',
  live: 'success',
  watch: 'warning',
  negotiating: 'warning',
  health_check: 'warning',
  renewal: 'warning',
  at_risk: 'danger',
  qbr: 'info',
  training: 'info',
  exec: 'info',
  kickoff: 'info',
  integrate: 'info',
  train: 'info',
  onboard: 'info',
  adopt: 'success',
  expand: 'success',
  renew: 'warning',
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
