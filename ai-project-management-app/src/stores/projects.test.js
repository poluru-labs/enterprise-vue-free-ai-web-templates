import { beforeEach, describe, expect, it } from 'vitest';
import issuesData from '../data/issues.json';
import {
  createIssue,
  moveIssue,
  selectSprint,
  sprintProgress,
  workspace,
} from '../stores/projects.js';

describe('projects store', () => {
  beforeEach(() => {
    workspace.selectedSprintId = 'sp24';
    workspace.issueOpen = false;
    workspace.issues = JSON.parse(JSON.stringify(issuesData));
  });

  it('computes Sprint 24 story points as 34 of 50', () => {
    expect(sprintProgress.value.done).toBe(34);
    expect(sprintProgress.value.committed).toBe(50);
    expect(sprintProgress.value.pct).toBe(68);
    expect(sprintProgress.value.daysLeft).toBe(8);
  });

  it('moves a board card between columns', () => {
    const result = moveIssue('iss_127', 'in_progress');
    expect(result.to).toBe('in_progress');
    expect(result.toLabel).toBe('In progress');
    expect(workspace.issues.find((item) => item.id === 'iss_127').column).toBe('in_progress');
    moveIssue('iss_127', 'todo');
  });

  it('creates an issue on the current sprint', () => {
    const issue = createIssue({
      title: 'Pair on auth fallback',
      type: 'task',
      points: 3,
      assignee: 'Arjun Poluru',
      column: 'todo',
    });
    expect(issue.key).toMatch(/^KEEL-/);
    expect(issue.sprintId).toBe('sp24');
    expect(workspace.issueOpen).toBe(false);
  });

  it('switches the selected sprint', () => {
    selectSprint('sp23');
    expect(workspace.selectedSprintId).toBe('sp23');
    selectSprint('sp24');
  });
});
