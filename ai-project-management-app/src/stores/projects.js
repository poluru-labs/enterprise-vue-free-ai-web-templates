import { computed, reactive } from 'vue';
import {
  BASE_PATH,
  COLUMNS,
  COMMAND_PAGES,
  SIGNED_IN_USER,
} from '../constants/navigation.js';
import issuesData from '../data/issues.json';
import notificationsData from '../data/notifications.json';
import risksData from '../data/risks.json';
import roadmapData from '../data/roadmap.json';
import sprintsData from '../data/sprints.json';
import teamsData from '../data/teams.json';
import { progressPct } from '../utils/format.js';
import { columnLabel } from '../utils/status.js';
import { searchRecords } from '../utils/search.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export const assigneeOptions = [
  { value: 'Arjun Poluru', label: 'Arjun Poluru' },
  { value: 'Maya Poluru', label: 'Maya Poluru' },
  { value: 'Priya Poluru', label: 'Priya Poluru' },
  { value: 'Hana Poluru', label: 'Hana Poluru' },
  { value: 'Jordan Poluru', label: 'Jordan Poluru' },
  { value: 'Sahana Poluru', label: 'Sahana Poluru' },
  { value: 'Rohan Poluru', label: 'Rohan Poluru' },
  { value: 'Luca Poluru', label: 'Luca Poluru' },
];

export const columnOptions = COLUMNS.map((column) => ({ value: column.id, label: column.label }));

export const workspace = reactive({
  issues: clone(issuesData),
  sprints: clone(sprintsData),
  teams: clone(teamsData),
  risks: clone(risksData),
  roadmap: clone(roadmapData.lanes),
  notifications: clone(notificationsData.items).map((item) => ({ ...item, read: false })),
  selectedSprintId: 'sp24',
  commandOpen: false,
  issueOpen: false,
  query: '',
});

export const unreadCount = computed(
  () => workspace.notifications.filter((item) => !item.read).length,
);

export const currentSprint = computed(
  () => workspace.sprints.find((item) => item.id === workspace.selectedSprintId) || workspace.sprints[1],
);

export const sprintIssues = computed(() =>
  workspace.issues.filter((item) => item.sprintId === workspace.selectedSprintId),
);

export const sprintDonePts = computed(() =>
  sprintIssues.value.filter((item) => item.column === 'done').reduce((sum, item) => sum + item.points, 0),
);

export const sprintCommittedPts = computed(() =>
  sprintIssues.value.reduce((sum, item) => sum + item.points, 0),
);

export const sprintProgress = computed(() => ({
  done: sprintDonePts.value,
  committed: sprintCommittedPts.value || currentSprint.value?.committed || 50,
  pct: progressPct(sprintDonePts.value, sprintCommittedPts.value || currentSprint.value?.committed || 50),
  daysLeft: currentSprint.value?.daysLeft ?? 8,
  name: currentSprint.value?.name || 'Sprint 24',
}));

export const boardColumns = computed(() =>
  COLUMNS.map((column) => ({
    ...column,
    items: sprintIssues.value.filter((issue) => issue.column === column.id),
    points: sprintIssues.value
      .filter((issue) => issue.column === column.id)
      .reduce((sum, issue) => sum + issue.points, 0),
  })),
);

export const sprintOptions = computed(() =>
  workspace.sprints.map((sprint) => ({
    value: sprint.id,
    label: `${sprint.name}${sprint.status === 'active' ? ' · current' : ''}`,
  })),
);

export const backlogIssues = computed(() =>
  workspace.issues.filter((item) => !item.sprintId || item.sprintId !== workspace.selectedSprintId),
);

export function markAllNotificationsRead() {
  workspace.notifications.forEach((item) => {
    item.read = true;
  });
}

export function openIssueModal() {
  workspace.issueOpen = true;
}

export function selectSprint(id) {
  if (workspace.sprints.some((item) => item.id === id)) {
    workspace.selectedSprintId = id;
  }
}

export function moveIssue(id, column) {
  const issue = workspace.issues.find((item) => item.id === id);
  if (!issue || !COLUMNS.some((item) => item.id === column)) return null;
  const from = issue.column;
  issue.column = column;
  issue.updated = '2026-09-01';
  if (column === 'done' && !issue.sprintId) {
    issue.sprintId = workspace.selectedSprintId;
  }
  return { issue, from, to: column, toLabel: columnLabel(column) };
}

export function createIssue({ title, type, points, assignee, column, priority }) {
  const trimmed = String(title || '').trim();
  if (!trimmed) return null;
  const nextKey = Math.max(...workspace.issues.map((item) => Number(item.key.split('-')[1]) || 0)) + 1;
  const issue = {
    id: `iss_${Date.now()}`,
    key: `KEEL-${nextKey}`,
    title: trimmed,
    type: type || 'story',
    points: Number(points) || 3,
    column: column || 'todo',
    sprintId: workspace.selectedSprintId,
    priority: priority || 'medium',
    assignee: assignee || SIGNED_IN_USER.name,
    labels: ['new'],
    project: 'Keel workspace',
    updated: '2026-09-01',
  };
  workspace.issues.unshift(issue);
  workspace.issueOpen = false;
  return issue;
}

export function searchWorkspace(query) {
  const q = String(query || '').trim();
  if (!q) return COMMAND_PAGES;
  const results = [];
  searchRecords(workspace.issues, q, ['key', 'title', 'assignee', 'type', 'labels']).forEach((item) => {
    results.push({
      id: `issue-${item.id}`,
      label: `${item.key} · ${item.title}`,
      hint: `${item.assignee} · ${columnLabel(item.column)}`,
      to: `${BASE_PATH}/board`,
      group: 'Issues',
    });
  });
  searchRecords(workspace.risks, q, ['title', 'owner', 'severity']).forEach((item) => {
    results.push({
      id: `risk-${item.id}`,
      label: `Risk · ${item.title}`,
      hint: `${item.severity} · ${item.owner}`,
      to: `${BASE_PATH}/risks`,
      group: 'Risks',
    });
  });
  searchRecords(workspace.teams, q, ['name', 'lead', 'focus']).forEach((item) => {
    results.push({
      id: `team-${item.id}`,
      label: `Team · ${item.name}`,
      hint: `${item.lead} · ${item.load}%`,
      to: `${BASE_PATH}/teams`,
      group: 'Teams',
    });
  });
  searchRecords(COMMAND_PAGES, q, ['label', 'hint']).forEach((item) => results.push(item));
  return results;
}
