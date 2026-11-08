import { reactive } from 'vue'

export type FieldKind = 'text' | 'range' | 'date' | 'number' | 'select' | 'textarea' | 'file' | 'choice'

export interface FieldDef {
  id: string
  label: string
  kind: FieldKind
  options?: string[]
}

export interface StepDef {
  id: string
  label: string
  description: string
  fields: FieldDef[]
}

export interface ProcessDef {
  id: string
  name: string
  summary: string
  owner: string
  steps: StepDef[]
}

export type RunState = 'In progress' | 'Finished'

export interface RunNote {
  id: string
  title: string
  description: string
  time: string
}

export interface RunDef {
  id: string
  number: string
  processId: string
  requester: string
  stepIndex: number
  state: RunState
  started: string
  note: string
  answers: Record<string, string>
  notes: RunNote[]
}

const people = [
  'Oviya Poluru',
  'Pranav Poluru',
  'Ritika Poluru',
  'Sanjay Poluru',
  'Trisha Poluru',
  'Umesh Poluru',
  'Vidya Poluru',
  'Yogesh Poluru',
]

export const studio = reactive({
  name: 'Flowwell',
  prefix: 'FW-',
  note: 'Finished runs stay on the shelf until the archive week.',
  archiveWeeks: 8,
  archiveFinished: true,
  cutoff: '17:00',
  review: '2026-11-20',
  pin: '',
  notify: 'owner' as 'owner' | 'requester',
  holdDrafts: true,
  backup: 'Pranav Poluru',
  processes: [
    {
      id: 'time-off',
      name: 'Time off',
      summary: 'Days away from the desk.',
      owner: 'Ritika Poluru',
      steps: [
        {
          id: 'request',
          label: 'Request',
          description: 'Name the days.',
          fields: [
            { id: 'dates', label: 'Days away', kind: 'range' },
            { id: 'reason', label: 'Reason', kind: 'textarea' },
          ],
        },
        {
          id: 'review',
          label: 'Manager review',
          description: 'The manager reads the request.',
          fields: [
            { id: 'decision', label: 'Decision', kind: 'choice', options: ['Approve', 'Hold'] },
            { id: 'review-note', label: 'Note', kind: 'textarea' },
          ],
        },
        {
          id: 'coverage',
          label: 'Coverage',
          description: 'Who sits in.',
          fields: [
            { id: 'cover', label: 'Cover', kind: 'select', options: [...people] },
            { id: 'cover-note', label: 'Note', kind: 'textarea' },
          ],
        },
        {
          id: 'calendar',
          label: 'Calendar',
          description: 'Mark the days.',
          fields: [{ id: 'back', label: 'Back on', kind: 'date' }],
        },
        {
          id: 'confirm',
          label: 'Confirm',
          description: 'Tell the team.',
          fields: [{ id: 'team-note', label: 'Note to the team', kind: 'textarea' }],
        },
      ],
    },
    {
      id: 'vendor',
      name: 'Vendor setup',
      summary: 'A new vendor on the sheet.',
      owner: 'Sanjay Poluru',
      steps: [
        {
          id: 'name',
          label: 'Name',
          description: 'Who they are.',
          fields: [
            { id: 'vendor', label: 'Vendor', kind: 'text' },
            { id: 'city', label: 'City', kind: 'text' },
          ],
        },
        {
          id: 'terms',
          label: 'Terms',
          description: 'How they are paid.',
          fields: [
            { id: 'days', label: 'Payment days', kind: 'number' },
            { id: 'terms', label: 'Terms', kind: 'select', options: ['Net 15', 'Net 30', 'Net 45'] },
          ],
        },
        {
          id: 'paperwork',
          label: 'Paperwork',
          description: 'The signed page.',
          fields: [{ id: 'page', label: 'Signed page', kind: 'file' }],
        },
        {
          id: 'approve',
          label: 'Approve',
          description: 'The owner signs.',
          fields: [
            { id: 'sign', label: 'Decision', kind: 'choice', options: ['Approve', 'Return'] },
            { id: 'sign-note', label: 'Note', kind: 'textarea' },
          ],
        },
      ],
    },
    {
      id: 'laptop',
      name: 'Laptop request',
      summary: 'A laptop for a new desk.',
      owner: 'Vidya Poluru',
      steps: [
        {
          id: 'need',
          label: 'Need',
          description: 'Why the desk needs one.',
          fields: [
            { id: 'role', label: 'Role', kind: 'text' },
            { id: 'due', label: 'Needed by', kind: 'date' },
          ],
        },
        {
          id: 'stock',
          label: 'Stock',
          description: 'Which machine.',
          fields: [
            { id: 'size', label: 'Size', kind: 'select', options: ['14-inch', '16-inch'] },
            { id: 'count', label: 'Count', kind: 'number' },
          ],
        },
        {
          id: 'desk',
          label: 'Desk',
          description: 'Where it sits.',
          fields: [{ id: 'site', label: 'Desk', kind: 'select', options: ['Austin', 'Denver'] }],
        },
        {
          id: 'assign',
          label: 'Assign',
          description: 'Who receives it.',
          fields: [{ id: 'receiver', label: 'Receiver', kind: 'select', options: [...people] }],
        },
        {
          id: 'handoff',
          label: 'Hand off',
          description: 'The receipt.',
          fields: [
            { id: 'receipt', label: 'Receipt', kind: 'file' },
            { id: 'hand-note', label: 'Note', kind: 'textarea' },
          ],
        },
      ],
    },
  ] as ProcessDef[],
  runs: [
    {
      id: 'fw-104',
      number: 'FW-104',
      processId: 'time-off',
      requester: 'Pranav Poluru',
      stepIndex: 1,
      state: 'In progress',
      started: '2026-11-06',
      note: 'Pranav asked for 12–14 November.',
      answers: { dates: '', reason: 'A long weekend.' },
      notes: [{ id: 'n104', title: 'Request', description: 'Filed.', time: '2026-11-06' }],
    },
    {
      id: 'fw-116',
      number: 'FW-116',
      processId: 'time-off',
      requester: 'Yogesh Poluru',
      stepIndex: 3,
      state: 'In progress',
      started: '2026-11-02',
      note: 'Yogesh is out the last week of November.',
      answers: {},
      notes: [{ id: 'n116', title: 'Coverage', description: 'Filed.', time: '2026-11-05' }],
    },
    {
      id: 'fw-108',
      number: 'FW-108',
      processId: 'vendor',
      requester: 'Trisha Poluru',
      stepIndex: 0,
      state: 'In progress',
      started: '2026-11-08',
      note: 'Harbor glass is new.',
      answers: { vendor: 'Harbor glass', city: 'Denver' },
      notes: [{ id: 'n108', title: 'Opened', description: 'On the sheet.', time: '2026-11-08' }],
    },
    {
      id: 'fw-112',
      number: 'FW-112',
      processId: 'laptop',
      requester: 'Umesh Poluru',
      stepIndex: 2,
      state: 'In progress',
      started: '2026-11-04',
      note: 'Umesh starts at the Austin desk.',
      answers: { role: 'Buyer', size: '14-inch' },
      notes: [{ id: 'n112', title: 'Stock', description: 'Filed.', time: '2026-11-07' }],
    },
    {
      id: 'fw-096',
      number: 'FW-096',
      processId: 'laptop',
      requester: 'Oviya Poluru',
      stepIndex: 4,
      state: 'Finished',
      started: '2026-10-20',
      note: 'Handed to Oviya on 28 October.',
      answers: {},
      notes: [{ id: 'n096', title: 'Hand off', description: 'Filed.', time: '2026-10-28' }],
    },
    {
      id: 'fw-088',
      number: 'FW-088',
      processId: 'vendor',
      requester: 'Ritika Poluru',
      stepIndex: 3,
      state: 'Finished',
      started: '2026-10-12',
      note: 'River paper is on the sheet.',
      answers: {},
      notes: [{ id: 'n088', title: 'Approve', description: 'Filed.', time: '2026-10-18' }],
    },
    {
      id: 'fw-080',
      number: 'FW-080',
      processId: 'time-off',
      requester: 'Sanjay Poluru',
      stepIndex: 4,
      state: 'Finished',
      started: '2026-09-30',
      note: 'Filed in September.',
      answers: {},
      notes: [{ id: 'n080', title: 'Confirm', description: 'Filed.', time: '2026-10-02' }],
    },
  ] as RunDef[],
})

export function findProcess(id: string) {
  return studio.processes.find((item) => item.id === id)
}

export function findRun(id: string) {
  return studio.runs.find((item) => item.id === id)
}

export function processName(id: string) {
  return findProcess(id)?.name ?? 'Process'
}

export function runsFor(processId: string) {
  return studio.runs.filter((item) => item.processId === processId)
}

export function fileStep(runId: string) {
  const run = findRun(runId)
  const process = run ? findProcess(run.processId) : undefined
  if (!run || !process || run.state === 'Finished') return null
  const step = process.steps[run.stepIndex]
  if (!step) return null
  run.notes.unshift({
    id: `note-${run.id}-${run.notes.length + 1}`,
    title: step.label,
    description: 'Filed.',
    time: '2026-11-08',
  })
  if (run.stepIndex >= process.steps.length - 1) {
    run.state = 'Finished'
    return { state: 'finished' as const, step: step.label, number: run.number }
  }
  run.stepIndex += 1
  const next = process.steps[run.stepIndex]
  return { state: 'next' as const, step: next?.label ?? step.label, number: run.number }
}
