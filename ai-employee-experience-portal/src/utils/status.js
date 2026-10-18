export const STATUS_TONE = {
  open: 'success',
  posted: 'success',
  current: 'success',
  closed: 'info',
  busy: 'warning',
  review: 'warning',
  scheduled: 'warning',
  new: 'warning',
  draft: 'neutral',
  low: 'danger',
  watch: 'warning',
  strong: 'success',
};

export function statusTone(status) {
  return STATUS_TONE[status] || 'neutral';
}

export function statusLabel(status) {
  if (!status) return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  if (tone === 'success') return 'success';
  if (tone === 'warning') return 'warning';
  if (tone === 'danger') return 'danger';
  if (tone === 'info') return 'info';
  return 'neutral';
}
