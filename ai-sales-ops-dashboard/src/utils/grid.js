export function padToColumns(items, columns = 3, factory) {
  if (!Array.isArray(items) || items.length === 0 || columns < 1) return items ?? [];
  const remainder = items.length % columns;
  if (remainder === 0) return items;
  const needed = columns - remainder;
  const extras = Array.from({ length: needed }, (_, index) => {
    if (typeof factory === 'function') return factory(index, items);
    const source = items[index % items.length];
    return { ...source, id: `${source.id ?? 'item'}-pad-${index}`, padded: true };
  });
  return [...items, ...extras];
}

export function extraTeamCard(index) {
  return {
    id: `team-extra-${index + 1}`,
    name: index === 0 ? 'Open quota seat' : `Reserve coverage ${index + 1}`,
    closed: 0,
    pipeline: '$0',
    quota: 0,
    region: 'Unassigned',
    padded: true,
  };
}

export function extraPlaybookCard(index) {
  return {
    id: `playbook-extra-${index + 1}`,
    title: index === 0 ? 'Weekly hygiene standup' : `Queued playbook ${index + 1}`,
    content:
      index === 0
        ? 'Review stale commit and missing next steps every Monday. Added so this playbook row stays equal height.'
        : 'Queued so the playbook grid never leaves a short row.',
    owner: 'RevOps',
    impact: 'Hygiene',
    padded: true,
  };
}

export function extraCoverageCard(index) {
  return {
    id: `coverage-extra-${index + 1}`,
    name: index === 0 ? 'Unassigned quota' : `Coverage buffer ${index + 1}`,
    coverage: '—',
    remaining: '$0',
    pipeline: '$0',
    fill: 0,
    padded: true,
  };
}
