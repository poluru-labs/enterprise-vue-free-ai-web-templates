export function statusTone(status) {
  if (status === 'Shipped' || status === 'Running') return 'success';
  if (status === 'In progress' || status === 'Draft') return 'warning';
  return 'info';
}

export function priorityVariant(priority) {
  if (priority === 'High') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'brand';
}

export function quotaVariant(quota) {
  return quota >= 70 ? 'success' : 'warning';
}
