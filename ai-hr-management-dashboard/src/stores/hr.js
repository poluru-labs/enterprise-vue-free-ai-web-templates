import { computed, reactive } from 'vue';
import peopleSeed from '../data/people.json';
import leaveSeed from '../data/leave.json';
import hiringSeed from '../data/hiring.json';
import learningSeed from '../data/learning.json';
import settingsSeed from '../data/settings.json';
import { BASE_PATH, SIGNED_IN_USER } from '../constants/navigation.js';
import { rangeOverlaps, slugify, todayIso } from '../utils/format.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const WEEK_START = '2026-09-01';
const WEEK_END = '2026-09-05';

const state = reactive({
  people: clone(peopleSeed),
  leave: clone(leaveSeed),
  reqs: clone(hiringSeed),
  courses: clone(learningSeed),
  settings: clone(settingsSeed.workspace),
  addEmployeeOpen: false,
});

const getters = {
  people: computed(() => state.people),
  leave: computed(() => state.leave),
  reqs: computed(() => state.reqs),
  courses: computed(() => state.courses),
  settings: computed(() => state.settings),
  addEmployeeOpen: computed(() => state.addEmployeeOpen),
  headcount: computed(() => state.people.length),
  onLeavePeople: computed(() => state.people.filter((person) => person.status === 'on_leave')),
  onLeaveThisWeek: computed(() =>
    state.people.filter((person) =>
      state.leave.some(
        (item) =>
          item.personId === person.id &&
          item.status !== 'denied' &&
          rangeOverlaps(item.start, item.end, WEEK_START, WEEK_END),
      ),
    ),
  ),
  pendingLeave: computed(() => state.leave.filter((item) => item.status === 'pending')),
  openReqs: computed(() => state.reqs.filter((item) => item.status === 'open')),
  openRolesCount: computed(() =>
    state.reqs
      .filter((item) => item.status === 'open' || item.status === 'on_hold')
      .reduce((sum, item) => sum + Number(item.openings || 0), 0),
  ),
  learningHours: computed(() =>
    state.people.reduce((sum, person) => sum + Number(person.learningHours || 0), 0),
  ),
  orgGroups: computed(() => {
    const byDept = new Map();
    for (const person of state.people) {
      const key = person.department || 'Unassigned';
      if (!byDept.has(key)) byDept.set(key, []);
      byDept.get(key).push(person);
    }
    return [...byDept.entries()].map(([name, members]) => {
      const lead =
        members.find((item) => /lead|director|manager|counsel|controller/i.test(item.title)) ||
        members[0];
      return {
        id: slugify(name),
        name,
        lead: lead?.name || '',
        count: members.length,
        members,
      };
    });
  }),
};

const actions = {
  setAddEmployeeOpen(open) {
    state.addEmployeeOpen = Boolean(open);
  },
  getPerson(id) {
    return state.people.find((item) => item.id === id) || null;
  },
  leaveForPerson(id) {
    return state.leave.filter((item) => item.personId === id);
  },
  addEmployee(input) {
    const name = input.name?.trim();
    const email = input.email?.trim();
    if (!name || !email) return null;
    const record = {
      id: `p-${slugify(name) || Date.now()}`,
      name,
      email,
      title: input.title?.trim() || 'Teammate',
      department: input.department || 'People',
      location: input.location || 'Austin',
      manager: input.manager || SIGNED_IN_USER.name,
      status: input.status || 'active',
      employmentType: input.employmentType || 'Full-time',
      startDate: input.startDate || todayIso(),
      ptoBalance: Number(input.ptoBalance) || 15,
      learningHours: Number(input.learningHours) || 0,
      pronouns: input.pronouns || '',
    };
    state.people.unshift(record);
    return record;
  },
  updateEmployee(id, updates) {
    const person = state.people.find((item) => item.id === id);
    if (!person) return;
    Object.assign(person, updates);
  },
  approveLeave(id) {
    const item = state.leave.find((row) => row.id === id);
    if (!item) return null;
    item.status = 'approved';
    const person = state.people.find((row) => row.id === item.personId);
    if (person && rangeOverlaps(item.start, item.end, WEEK_START, WEEK_END)) {
      person.status = 'on_leave';
    }
    return item;
  },
  denyLeave(id) {
    const item = state.leave.find((row) => row.id === id);
    if (!item) return null;
    item.status = 'denied';
    return item;
  },
  updateSettings(updates) {
    Object.assign(state.settings, updates);
  },
};

export function useHr() {
  return reactive({ state, WEEK_START, WEEK_END, BASE_PATH, ...getters, ...actions });
}

export function useStore() {
  return useHr();
}
