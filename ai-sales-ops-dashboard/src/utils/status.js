export function statusTone(status) {
  if (status === 'Commit' || status === 'Closed') return 'success';
  if (status === 'Negotiate' || status === 'Propose') return 'warning';
  return 'info';
}

export function hygieneTone(deal) {
  if (!deal.nextStep) return 'danger';
  if ((deal.staleDays ?? 0) >= 7) return 'warning';
  return 'success';
}

export function quotaVariant(quota) {
  return quota >= 70 ? 'success' : 'warning';
}

export function coverageVariant(fill) {
  if (fill >= 80) return 'success';
  if (fill >= 50) return 'warning';
  return 'danger';
}
