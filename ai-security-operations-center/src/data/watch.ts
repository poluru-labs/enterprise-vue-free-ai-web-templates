import { reactive } from 'vue'

export type Severity = 'Info' | 'Low' | 'High'
export type IncidentState = 'Open' | 'Closed'
export type AccessState = 'Waiting' | 'Done'
export type ChangeState = 'Draft' | 'Scheduled'

export interface WatchNote {
  id: string
  title: string
  description: string
  time: string
}

export interface Incident {
  id: string
  number: string
  title: string
  severity: Severity
  state: IncidentState
  owner: string
  assetId: string
  opened: string
  step: number
  notes: WatchNote[]
}

export interface Asset {
  id: string
  site: string
  network: string
  name: string
}

export interface AccessRequest {
  id: string
  number: string
  subject: string
  owner: string
  due: string
  state: AccessState
}

export interface ChangeItem {
  id: string
  number: string
  title: string
  when: string
  owner: string
  state: ChangeState
}

export const watch = reactive({
  onCall: 'Jhanvi Poluru',
  shiftStart: '08:00',
  handoff: '2026-11-14',
  note: 'Severity labels stay Info, Low, and High.',
  pin: '',
  showClosed: false,
  notify: 'lead',
  incidents: [
    {
      id: 'reader',
      number: 'WL-18',
      title: 'Badge reader offline',
      severity: 'High',
      state: 'Open',
      owner: 'Krish Poluru',
      assetId: 'reader',
      opened: '2026-11-07',
      step: 1,
      notes: [
        { id: 'r1', title: 'Opened', description: 'Krish Poluru logged the reader.', time: '2026-11-07 07:40' },
        { id: 'r2', title: 'Lobby checked', description: 'The reader did not answer a badge tap.', time: '2026-11-07 08:10' },
      ],
    },
    {
      id: 'backup',
      number: 'WL-21',
      title: 'Night backup missed',
      severity: 'High',
      state: 'Open',
      owner: 'Lina Poluru',
      assetId: 'files',
      opened: '2026-11-06',
      step: 1,
      notes: [
        { id: 'b1', title: 'Opened', description: 'Lina Poluru saw the backup did not finish.', time: '2026-11-06 06:20' },
      ],
    },
    {
      id: 'review',
      number: 'WL-14',
      title: 'Access review overdue',
      severity: 'Low',
      state: 'Open',
      owner: 'Mohit Poluru',
      assetId: 'finance',
      opened: '2026-11-04',
      step: 1,
      notes: [
        { id: 'v1', title: 'Opened', description: 'Mohit Poluru noted the review date passed.', time: '2026-11-04 09:00' },
      ],
    },
    {
      id: 'guest',
      number: 'WL-11',
      title: 'Guest badge not returned',
      severity: 'Info',
      state: 'Open',
      owner: 'Naina Poluru',
      assetId: 'reception',
      opened: '2026-11-03',
      step: 0,
      notes: [
        { id: 'g1', title: 'Opened', description: 'Naina Poluru marked badge G-14 still out.', time: '2026-11-03 16:40' },
      ],
    },
    {
      id: 'log',
      number: 'WL-16',
      title: 'Backup log short',
      severity: 'Low',
      state: 'Open',
      owner: 'Parth Poluru',
      assetId: 'mail',
      opened: '2026-11-02',
      step: 1,
      notes: [
        { id: 'l1', title: 'Opened', description: 'Parth Poluru filed a short log from the mail server.', time: '2026-11-02 11:15' },
      ],
    },
    {
      id: 'window',
      number: 'WL-09',
      title: 'Backup window slipped',
      severity: 'Low',
      state: 'Closed',
      owner: 'Parth Poluru',
      assetId: 'mail',
      opened: '2026-10-28',
      step: 2,
      notes: [
        { id: 'w1', title: 'Opened', description: 'Parth Poluru logged the late window.', time: '2026-10-28 03:10' },
        { id: 'w2', title: 'Closed', description: 'The window was moved back to 02:00.', time: '2026-10-29 09:00' },
      ],
    },
    {
      id: 'door',
      number: 'WL-07',
      title: 'Door log gap',
      severity: 'Info',
      state: 'Closed',
      owner: 'Reva Poluru',
      assetId: 'stair',
      opened: '2026-10-20',
      step: 2,
      notes: [
        { id: 'd1', title: 'Opened', description: 'Reva Poluru noted a gap in the door log.', time: '2026-10-20 14:00' },
        { id: 'd2', title: 'Closed', description: 'The log resumed the next hour.', time: '2026-10-21 08:30' },
      ],
    },
  ] as Incident[],
  assets: [
    { id: 'reader', site: 'Austin', network: 'Lobby', name: 'Badge reader' },
    { id: 'reception', site: 'Austin', network: 'Lobby', name: 'Reception desk' },
    { id: 'files', site: 'Austin', network: 'Office', name: 'File server' },
    { id: 'mail', site: 'Austin', network: 'Office', name: 'Mail server' },
    { id: 'stair', site: 'Denver', network: 'Plant', name: 'East stair' },
    { id: 'finance', site: 'Denver', network: 'Plant', name: 'Finance share' },
  ] as Asset[],
  access: [
    { id: 'ar4', number: 'AR-4', subject: 'Finance share', owner: 'Mohit Poluru', due: '2026-11-12', state: 'Waiting' },
    { id: 'ar6', number: 'AR-6', subject: 'Mail server', owner: 'Parth Poluru', due: '2026-11-18', state: 'Waiting' },
    { id: 'ar8', number: 'AR-8', subject: 'File server', owner: 'Lina Poluru', due: '2026-11-22', state: 'Waiting' },
    { id: 'ar2', number: 'AR-2', subject: 'Lobby badges', owner: 'Naina Poluru', due: '2026-10-30', state: 'Done' },
    { id: 'ar1', number: 'AR-1', subject: 'Reception desk', owner: 'Naina Poluru', due: '2026-09-01', state: 'Done' },
  ] as AccessRequest[],
  changes: [
    { id: 'ch12', number: 'CH-12', title: 'Badge reader check', when: '2026-11-14', owner: 'Krish Poluru', state: 'Scheduled' },
    { id: 'ch15', number: 'CH-15', title: 'Backup window', when: '2026-11-20', owner: 'Lina Poluru', state: 'Scheduled' },
    { id: 'ch18', number: 'CH-18', title: 'Share review', when: '2026-11-25', owner: 'Mohit Poluru', state: 'Scheduled' },
    { id: 'ch9', number: 'CH-9', title: 'Door hours', when: '2026-12-02', owner: 'Reva Poluru', state: 'Draft' },
  ] as ChangeItem[],
})

export function findIncident(id: string) {
  return watch.incidents.find((incident) => incident.id === id)
}

export function findAsset(id: string) {
  return watch.assets.find((asset) => asset.id === id)
}

export function assetName(id: string) {
  return findAsset(id)?.name ?? 'Asset'
}

export function closeIncident(id: string, note: string) {
  const incident = findIncident(id)
  if (!incident || incident.state === 'Closed') return
  incident.state = 'Closed'
  incident.step = 2
  incident.notes.unshift({
    id: `close-${Date.now()}`,
    title: 'Closed',
    description: note.trim() || 'Filed from the desk.',
    time: '2026-11-08',
  })
}

export function markAccessDone(id: string) {
  const request = watch.access.find((item) => item.id === id)
  if (!request || request.state === 'Done') return
  request.state = 'Done'
}
