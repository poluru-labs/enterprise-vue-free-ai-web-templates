// Client-side CSV export helper used by list pages (Deals, Leads, Accounts).
export function exportToCsv(filename, columns, rows) {
  const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const header = columns.map((column) => escape(column.label)).join(',');
  const lines = rows.map((row) => columns.map((column) => escape(row[column.key])).join(','));
  const csv = [header, ...lines].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
