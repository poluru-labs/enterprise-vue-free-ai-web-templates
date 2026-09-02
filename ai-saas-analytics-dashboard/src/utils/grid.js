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

export function extraExperimentCard(index) {
  return {
    id: `exp-extra-${index + 1}`,
    title: index === 0 ? 'Lifecycle day-14 winback' : `Follow-up experiment ${index + 1}`,
    summary:
      index === 0
        ? 'Win-back email when usage drops two weeks in a row. Added so this experiment row stays equal height.'
        : 'Queued follow-up so the experiment grid never leaves a short row.',
    status: 'Queued',
    owner: 'Growth pod',
    lift: 'TBD',
    confidence: '—',
    padded: true,
  };
}
