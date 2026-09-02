import { describe, expect, it } from 'vitest';
import { useHr } from './hr.js';

describe('grove store', () => {
  it('keeps Sravani as the signed-in people lead fixture', () => {
    const store = useHr();
    expect(store.people.some((item) => item.name === 'Sravani Poluru')).toBe(true);
    expect(store.settings.brandColor).toBe('#7C3AED');
  });

  it('counts six people on leave this week and eight open-role seats', () => {
    const store = useHr();
    expect(store.onLeaveThisWeek).toHaveLength(6);
    expect(store.onLeaveThisWeek.map((item) => item.name)).toEqual(
      expect.arrayContaining([
        'Kavya Poluru',
        'Harini Poluru',
        'Rohan Poluru',
        'Nisha Poluru',
        'Vikram Poluru',
        'Tanvi Poluru',
      ]),
    );
    expect(store.openRolesCount).toBeGreaterThanOrEqual(8);
  });

  it('adds an employee and approves pending leave', () => {
    const store = useHr();
    const before = store.people.length;
    const person = store.addEmployee({
      name: 'Leela Poluru',
      email: 'leela.poluru@polurulabs.example',
      title: 'Recruiter',
      department: 'People',
    });
    expect(person.id).toBe('p-leela-poluru');
    expect(store.people.length).toBe(before + 1);

    const pending = store.pendingLeave[0];
    const approved = store.approveLeave(pending.id);
    expect(approved.status).toBe('approved');
  });
});
