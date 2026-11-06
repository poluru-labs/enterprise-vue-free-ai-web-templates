import { reactive } from 'vue'

export type MatterStatus = 'Open' | 'Waiting' | 'Signed' | 'Closed'
export type MatterKind = 'Vendor' | 'Employment' | 'Lease'

export type Matter = {
  id: string
  number: string
  title: string
  kind: MatterKind
  status: MatterStatus
  owner: string
  party: string
  opened: string
  due: string
  summary: string
  clauses: { id: string; title: string; content: string }[]
  files: { id: string; label: string; description: string }[]
  dates: { id: string; title: string; description: string; time: string }[]
}

export type Renewal = {
  id: string
  number: string
  title: string
  party: string
  renews: string
  owner: string
}

export type Deadline = {
  id: string
  title: string
  kind: 'Hearing' | 'Signature'
  date: string
  time: string
  matter: string
}

export type Counsel = {
  id: string
  name: string
  firm: string
  role: string
  matters: string
}

export const ledger = reactive({
  retainYears: 7,
  mailReminders: true,
  quietHours: false,
  pin: '',
  matters: [
    {
      id: 'bw-1042',
      number: 'BW-1042',
      title: 'Harbor Supply agreement',
      kind: 'Vendor',
      status: 'Open',
      owner: 'Geeta Poluru',
      party: 'Harbor Supply',
      opened: '2026-09-14',
      due: '2026-11-20',
      summary: 'Annual supply terms. Signature still open.',
      clauses: [
        { id: 'c1', title: 'Term', content: 'One year from the signature date, then month to month.' },
        { id: 'c2', title: 'Payment', content: 'Net thirty. Invoices go to the desk.' },
        { id: 'c3', title: 'Notice', content: 'Written notice, ten days, to the addresses on page one.' },
      ],
      files: [
        { id: 'f1', label: 'Draft', description: 'Current redline, 12 pages.' },
        { id: 'f2', label: 'Exhibit A', description: 'Price list for the year.' },
      ],
      dates: [
        { id: 'd1', title: 'Opened', description: 'File started by Geeta Poluru.', time: '2026-09-14' },
        { id: 'd2', title: 'Signature due', description: 'Harbor Supply returns the page.', time: '2026-11-20' },
      ],
    },
    {
      id: 'bw-1048',
      number: 'BW-1048',
      title: 'Employment letter',
      kind: 'Employment',
      status: 'Waiting',
      owner: 'Indra Poluru',
      party: 'Hari Poluru',
      opened: '2026-10-02',
      due: '2026-11-12',
      summary: 'Start date and title. Waiting on the signer.',
      clauses: [
        { id: 'c1', title: 'Role', content: 'Associate, counsel desk, starting Monday.' },
        { id: 'c2', title: 'Notice', content: 'Two weeks, in writing.' },
      ],
      files: [{ id: 'f1', label: 'Letter', description: 'Two pages, unsigned.' }],
      dates: [{ id: 'd1', title: 'Signature due', description: 'Hari Poluru.', time: '2026-11-12' }],
    },
    {
      id: 'bw-1051',
      number: 'BW-1051',
      title: 'Elm House lease',
      kind: 'Lease',
      status: 'Open',
      owner: 'Jyoti Poluru',
      party: 'Elm House',
      opened: '2026-10-18',
      due: '2026-12-01',
      summary: 'Office lease renewal. Rent clause still marked.',
      clauses: [
        { id: 'c1', title: 'Premises', content: 'Second floor, Elm House, twelve desks.' },
        { id: 'c2', title: 'Rent', content: 'Due on the first. Review the marked figure.' },
        { id: 'c3', title: 'Term', content: 'Three years, with one renewal.' },
      ],
      files: [
        { id: 'f1', label: 'Lease draft', description: 'Marked copy from Elm House.' },
        { id: 'f2', label: 'Floor plan', description: 'Second floor only.' },
      ],
      dates: [{ id: 'd1', title: 'Renewal talk', description: 'With Jyoti Poluru.', time: '2026-11-24' }],
    },
    {
      id: 'bw-1036',
      number: 'BW-1036',
      title: 'North Dock agreement',
      kind: 'Vendor',
      status: 'Signed',
      owner: 'Kabir Poluru',
      party: 'North Dock',
      opened: '2026-06-03',
      due: '2026-10-02',
      summary: 'Signed and filed. Renewal sits on the contract list.',
      clauses: [{ id: 'c1', title: 'Term', content: 'Signed 2 Oct 2026. One year.' }],
      files: [{ id: 'f1', label: 'Signed copy', description: 'Filed in the cabinet.' }],
      dates: [{ id: 'd1', title: 'Signed', description: 'Kabir Poluru filed it.', time: '2026-10-02' }],
    },
    {
      id: 'bw-1055',
      number: 'BW-1055',
      title: 'Employment letter',
      kind: 'Employment',
      status: 'Open',
      owner: 'Mukund Poluru',
      party: 'Lavanya Poluru',
      opened: '2026-10-28',
      due: '2026-11-18',
      summary: 'Title and start date are set. Signature page is blank.',
      clauses: [
        { id: 'c1', title: 'Role', content: 'Associate, records desk.' },
        { id: 'c2', title: 'Start', content: '1 December 2026.' },
      ],
      files: [{ id: 'f1', label: 'Letter', description: 'Ready for signature.' }],
      dates: [{ id: 'd1', title: 'Signature due', description: 'Lavanya Poluru.', time: '2026-11-18' }],
    },
    {
      id: 'bw-1060',
      number: 'BW-1060',
      title: 'West Annex lease',
      kind: 'Lease',
      status: 'Waiting',
      owner: 'Nitya Poluru',
      party: 'West Annex',
      opened: '2026-11-01',
      due: '2026-11-28',
      summary: 'Short renewal. Landlord has the draft.',
      clauses: [
        { id: 'c1', title: 'Term', content: 'One more year on the annex.' },
        { id: 'c2', title: 'Notice', content: 'Thirty days before the end date.' },
      ],
      files: [{ id: 'f1', label: 'Renewal draft', description: 'Sent 1 Nov.' }],
      dates: [{ id: 'd1', title: 'Reply due', description: 'West Annex.', time: '2026-11-28' }],
    },
  ] as Matter[],
  renewals: [
    { id: 'rn-1', number: 'BW-1042', title: 'Harbor Supply agreement', party: 'Harbor Supply', renews: '2026-11-20', owner: 'Geeta Poluru' },
    { id: 'rn-2', number: 'BW-1036', title: 'North Dock agreement', party: 'North Dock', renews: '2027-10-02', owner: 'Kabir Poluru' },
    { id: 'rn-3', number: 'BW-1051', title: 'Elm House lease', party: 'Elm House', renews: '2026-12-01', owner: 'Jyoti Poluru' },
    { id: 'rn-4', number: 'BW-1060', title: 'West Annex lease', party: 'West Annex', renews: '2026-11-28', owner: 'Nitya Poluru' },
  ] as Renewal[],
  deadlines: [
    { id: 'dl-1', title: 'Harbor Supply signature', kind: 'Signature', date: '2026-11-20', time: '16:00', matter: 'BW-1042' },
    { id: 'dl-2', title: 'Hari letter signature', kind: 'Signature', date: '2026-11-12', time: '11:00', matter: 'BW-1048' },
    { id: 'dl-3', title: 'Elm House hearing', kind: 'Hearing', date: '2026-11-24', time: '09:30', matter: 'BW-1051' },
    { id: 'dl-4', title: 'West Annex reply', kind: 'Hearing', date: '2026-11-28', time: '14:00', matter: 'BW-1060' },
  ] as Deadline[],
  counsel: [
    { id: 'cs-1', name: 'Geeta Poluru', firm: 'Desk', role: 'Counsel', matters: 'BW-1042' },
    { id: 'cs-2', name: 'Hari Poluru', firm: 'Desk', role: 'Associate', matters: 'BW-1048' },
    { id: 'cs-3', name: 'Indra Poluru', firm: 'Desk', role: 'Associate', matters: 'BW-1048' },
    { id: 'cs-4', name: 'Jyoti Poluru', firm: 'Elm Chambers', role: 'Counsel', matters: 'BW-1051' },
    { id: 'cs-5', name: 'Kabir Poluru', firm: 'North Dock', role: 'Clerk', matters: 'BW-1036' },
    { id: 'cs-6', name: 'Lavanya Poluru', firm: 'Desk', role: 'Associate', matters: 'BW-1055' },
    { id: 'cs-7', name: 'Mukund Poluru', firm: 'Elm Chambers', role: 'Counsel', matters: 'BW-1055' },
    { id: 'cs-8', name: 'Nitya Poluru', firm: 'West Annex', role: 'Clerk', matters: 'BW-1060' },
  ] as Counsel[],
})

export function findMatter(id: string) {
  return ledger.matters.find((matter) => matter.id === id)
}
