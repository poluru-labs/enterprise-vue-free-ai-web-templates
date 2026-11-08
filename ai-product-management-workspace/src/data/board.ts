import { reactive } from 'vue'

export type Horizon = 'Now' | 'Next' | 'Later'
export type Area = 'Notifications' | 'Audit' | 'Access'
export type SpecStatus = 'Draft' | 'In review' | 'Locked' | 'Shipped'

export interface Spec {
  id: string
  number: string
  title: string
  horizon: Horizon
  area: Area
  owner: string
  status: SpecStatus
  problem: string
  updated: string
  note: string
  scope: { id: string; title: string; content: string }[]
  events: { id: string; title: string; description: string; time: string }[]
}

export interface Release {
  id: string
  name: string
  date: string
  horizon: Horizon
}

export const board = reactive({
  product: 'Workplace',
  prefix: 'SB',
  area: 'Notifications' as Area,
  cutoff: '16:00',
  reviewOn: '2026-11-20',
  note: 'Specs use the SB prefix and a product area.',
  holdDraft: true,
  pin: '',
  specs: [
    {
      id: 'sb-220',
      number: 'SB-220',
      title: 'Quiet hours',
      horizon: 'Now',
      area: 'Notifications',
      owner: 'Maya Poluru',
      status: 'In review',
      problem: 'Desks still get pings after the cutoff.',
      updated: '2026-11-04',
      note: '',
      scope: [
        { id: 's1', title: 'In', content: 'A desk cutoff, and a pause for the named owner.' },
        { id: 's2', title: 'Out', content: 'No change to guest mail or the audit export.' },
      ],
      events: [{ id: 'e1', title: 'Opened', description: 'Maya Poluru wrote the problem.', time: 'Nov 4' }],
    },
    {
      id: 'sb-224',
      number: 'SB-224',
      title: 'Audit export',
      horizon: 'Now',
      area: 'Audit',
      owner: 'Naveen Poluru',
      status: 'Locked',
      problem: 'The desk cannot hand an auditor a full month.',
      updated: '2026-10-28',
      note: '',
      scope: [
        { id: 's3', title: 'In', content: 'A dated file of desk actions for one month.' },
        { id: 's4', title: 'Out', content: 'No live feed and no guest records.' },
      ],
      events: [{ id: 'e2', title: 'Locked', description: 'Naveen Poluru set the month file.', time: 'Oct 28' }],
    },
    {
      id: 'sb-244',
      number: 'SB-244',
      title: 'Desk alerts',
      horizon: 'Now',
      area: 'Notifications',
      owner: 'Tilak Poluru',
      status: 'Shipped',
      problem: 'A missed desk alert had no record.',
      updated: '2026-10-12',
      note: 'Shipped with the October desk.',
      scope: [
        { id: 's5', title: 'In', content: 'One alert on the desk, kept for the day.' },
        { id: 's6', title: 'Out', content: 'No mobile push.' },
      ],
      events: [{ id: 'e3', title: 'Shipped', description: 'Tilak Poluru closed the October desk.', time: 'Oct 12' }],
    },
    {
      id: 'sb-228',
      number: 'SB-228',
      title: 'Guest access',
      horizon: 'Next',
      area: 'Access',
      owner: 'Ojas Poluru',
      status: 'Draft',
      problem: 'A guest cannot be named for a single week.',
      updated: '2026-11-08',
      note: '',
      scope: [
        { id: 's7', title: 'In', content: 'A named guest, a week, and one area.' },
        { id: 's8', title: 'Out', content: 'No standing account.' },
      ],
      events: [{ id: 'e4', title: 'Draft', description: 'Ojas Poluru started the guest week.', time: 'Nov 8' }],
    },
    {
      id: 'sb-232',
      number: 'SB-232',
      title: 'Morning digest',
      horizon: 'Next',
      area: 'Notifications',
      owner: 'Priya Poluru',
      status: 'In review',
      problem: 'Owners read the same ping twice.',
      updated: '2026-11-06',
      note: '',
      scope: [
        { id: 's9', title: 'In', content: 'One morning note per owner.' },
        { id: 's10', title: 'Out', content: 'Quiet hours stay on their own spec.' },
      ],
      events: [{ id: 'e5', title: 'In review', description: 'Priya Poluru sent it to Maya.', time: 'Nov 6' }],
    },
    {
      id: 'sb-248',
      number: 'SB-248',
      title: 'Shared folders',
      horizon: 'Next',
      area: 'Access',
      owner: 'Urvi Poluru',
      status: 'In review',
      problem: 'A folder shared with a guest has no end date.',
      updated: '2026-11-11',
      note: '',
      scope: [
        { id: 's11', title: 'In', content: 'A folder, a guest, and an end date.' },
        { id: 's12', title: 'Out', content: 'No change to the audit file.' },
      ],
      events: [{ id: 'e6', title: 'In review', description: 'Urvi Poluru named the end date.', time: 'Nov 11' }],
    },
    {
      id: 'sb-236',
      number: 'SB-236',
      title: 'Audit retention',
      horizon: 'Later',
      area: 'Audit',
      owner: 'Rahul Poluru',
      status: 'Draft',
      problem: 'Old months stay on the desk with no rule.',
      updated: '2026-09-16',
      note: '',
      scope: [
        { id: 's13', title: 'In', content: 'Keep thirteen months, then drop the file.' },
        { id: 's14', title: 'Out', content: 'No change to the export itself.' },
      ],
      events: [{ id: 'e7', title: 'Draft', description: 'Rahul Poluru sketched the rule.', time: 'Sep 16' }],
    },
    {
      id: 'sb-240',
      number: 'SB-240',
      title: 'Guest expiry',
      horizon: 'Later',
      area: 'Access',
      owner: 'Sneha Poluru',
      status: 'Draft',
      problem: 'A guest week can run on after the date.',
      updated: '2026-09-02',
      note: '',
      scope: [
        { id: 's15', title: 'In', content: 'Access ends on the date, with a desk note.' },
        { id: 's16', title: 'Out', content: 'No new guest form.' },
      ],
      events: [{ id: 'e8', title: 'Draft', description: 'Sneha Poluru wrote the end date.', time: 'Sep 2' }],
    },
  ] as Spec[],
  releases: [
    { id: 'rel-nov', name: 'November desk', date: '2026-11-18', horizon: 'Now' },
    { id: 'rel-dec', name: 'December desk', date: '2026-12-16', horizon: 'Next' },
    { id: 'rel-jan', name: 'January desk', date: '2027-01-20', horizon: 'Later' },
  ] as Release[],
})

export function findSpec(id: string) {
  return board.specs.find((spec) => spec.id === id)
}

export function nextNumber() {
  const values = board.specs.map((spec) => Number(spec.number.slice(3)))
  const max = values.reduce((best, value) => (value > best ? value : best), 200)
  return `SB-${max + 4}`
}
