export function toCsv(columns, rows) {
  const header = columns.map((column) => column.label).join(',');
  const body = rows.map((row) =>
    columns
      .map((column) => `"${String(row[column.key] ?? '').replace(/"/g, '""')}"`)
      .join(','),
  );
  return [header, ...body].join('\n');
}

export function downloadCsv(filename, csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
