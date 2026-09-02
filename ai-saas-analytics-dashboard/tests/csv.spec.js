import { describe, expect, it } from 'vitest';
import { toCsv } from '../src/utils/csv.js';

describe('toCsv', () => {
  it('quotes values and keeps headers', () => {
    const csv = toCsv(
      [
        { key: 'title', label: 'Request' },
        { key: 'owner', label: 'Owner' },
      ],
      [{ title: 'Cohort export to CSV', owner: 'Meera Poluru' }],
    );
    expect(csv).toContain('Request,Owner');
    expect(csv).toContain('"Cohort export to CSV"');
  });
});
