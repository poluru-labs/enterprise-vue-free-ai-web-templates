export function normalizeQuery(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

export function matchesQuery(record, query, fields) {
  const needle = normalizeQuery(query);
  if (!needle) return true;
  return fields.some((field) =>
    String(record[field] ?? '')
      .toLowerCase()
      .includes(needle),
  );
}

export function searchRecords(records, query, fields) {
  return records.filter((record) => matchesQuery(record, query, fields));
}
