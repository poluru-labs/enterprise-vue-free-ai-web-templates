import { describe, expect, it } from 'vitest';
import { escapeCsvValue, toCsv } from './csv.js';

const columns = [
  { key: 'name', label: 'Deal' },
  { key: 'value', label: 'Value' },
];

describe('csv helpers', () => {
  it('escapes quotes and wraps values', () => {
    expect(escapeCsvValue('Harbor "expansion"')).toBe('"Harbor ""expansion"""');
    expect(escapeCsvValue(null)).toBe('""');
  });

  it('builds a header plus one row per record', () => {
    const csv = toCsv(columns, [
      { name: 'Harbor platform expansion', value: '$184,000' },
      { name: 'Nimbus, omnichannel', value: '$96,000' },
    ]);
    const lines = csv.split('\r\n');
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe('"Deal","Value"');
    expect(lines[1]).toContain('Harbor platform expansion');
    expect(lines[2]).toBe('"Nimbus, omnichannel","$96,000"');
  });
});
