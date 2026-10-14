export const STATUS_TONE = {
  passing: 'success',
  published: 'success',
  granted: 'success',
  approved: 'success',
  public: 'success',
  watch: 'warning',
  review: 'warning',
  requested: 'warning',
  confidential: 'warning',
  failing: 'danger',
  denied: 'danger',
  restricted: 'danger',
  internal: 'info',
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

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'info' : tone;
}
