import { describe, expect, it } from 'vitest';
import { toCsv } from '../src/utils/csv.js';

describe('toCsv', () => {
  it('quotes values and keeps headers', () => {
    const csv = toCsv(
      [
        { key: 'account', label: 'Account' },
        { key: 'owner', label: 'Owner' },
      ],
      [{ account: 'Harbor Labs', owner: 'Meera Poluru' }],
    );
    expect(csv).toContain('Account,Owner');
    expect(csv).toContain('"Harbor Labs"');
  });
});
