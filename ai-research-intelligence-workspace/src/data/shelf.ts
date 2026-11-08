import { reactive } from 'vue'

export type StudyKind = 'Materials' | 'Field' | 'Archive'
export type StudyStatus = 'Open' | 'Paused' | 'Closed'
export type PaperStanding = 'Draft' | 'Published'
export type GrantStanding = 'Open' | 'Closed'

export interface ShelfDocument {
  id: string
  title: string
  filed: string
}

export interface ShelfNote {
  id: string
  title: string
  description: string
  time: string
}

export interface Study {
  id: string
  mark: string
  title: string
  kind: StudyKind
  status: StudyStatus
  lead: string
  sites: string
  milestone: number
  condition: number
  documents: ShelfDocument[]
  log: ShelfNote[]
}

export interface Paper {
  id: string
  title: string
  standing: PaperStanding
  author: string
  studyId: string
  written: string
}

export interface Grant {
  id: string
  mark: string
  studyId: string
  amount: string
  deadline: string
  owner: string
  status: GrantStanding
}

export interface Room {
  id: string
  name: string
  floor: string
  keeper: string
  note: string
  equipment: string[]
}

export const shelf = reactive({
  labName: 'Studyhall',
  fiscalYear: 2026,
  note: 'Shelf numbers stay with the study.',
  boardTime: '09:00',
  boardDate: '2026-11-18',
  pin: '',
  holdPaused: true,
  notify: 'lead',
  defaultKind: 'Materials' as StudyKind,
  studies: [
    {
      id: 'clay',
      mark: 'SH-12',
      title: 'Clay binders',
      kind: 'Materials',
      status: 'Open',
      lead: 'Sahana Poluru',
      sites: 'Kiln room, Bench 2',
      milestone: 1,
      condition: 4,
      documents: [
        { id: 'mix', title: 'Mix log', filed: '2026-10-12' },
        { id: 'firing', title: 'Firing chart', filed: '2026-10-28' },
      ],
      log: [
        { id: 'clay-1', title: 'Scope set', description: 'Sahana Poluru opened the question.', time: '2026-09-02' },
        { id: 'clay-2', title: 'Sample drawn', description: 'First mix is on the bench.', time: '2026-10-12' },
      ],
    },
    {
      id: 'silt',
      mark: 'SH-18',
      title: 'River silt survey',
      kind: 'Field',
      status: 'Open',
      lead: 'Tejas Poluru',
      sites: 'East bank, Gauge hut',
      milestone: 0,
      condition: 3,
      documents: [{ id: 'gauge', title: 'Gauge sheet', filed: '2026-11-01' }],
      log: [{ id: 'silt-1', title: 'Scope opened', description: 'Tejas Poluru marked the east bank.', time: '2026-10-20' }],
    },
    {
      id: 'index',
      mark: 'SH-21',
      title: 'Town archive index',
      kind: 'Archive',
      status: 'Open',
      lead: 'Usha Poluru',
      sites: 'Reading room',
      milestone: 2,
      condition: 5,
      documents: [{ id: 'map', title: 'Shelf map', filed: '2026-09-14' }],
      log: [
        { id: 'index-1', title: 'Scope set', description: 'Usha Poluru listed the shelves.', time: '2026-08-04' },
        { id: 'index-2', title: 'Notes started', description: 'The shelf map is in the reading room.', time: '2026-09-14' },
      ],
    },
    {
      id: 'kiln',
      mark: 'SH-09',
      title: 'Kiln temperature log',
      kind: 'Materials',
      status: 'Paused',
      lead: 'Vedha Poluru',
      sites: 'Kiln room',
      milestone: 1,
      condition: 3,
      documents: [{ id: 'curve', title: 'Spring curve', filed: '2026-04-02' }],
      log: [{ id: 'kiln-1', title: 'Paused', description: 'Vedha Poluru held the log for the summer.', time: '2026-06-01' }],
    },
    {
      id: 'cores',
      mark: 'SH-30',
      title: 'Harbor wall cores',
      kind: 'Field',
      status: 'Closed',
      lead: 'Yash Poluru',
      sites: 'Harbor wall',
      milestone: 3,
      condition: 4,
      documents: [{ id: 'tray', title: 'Core tray', filed: '2026-06-18' }],
      log: [{ id: 'cores-1', title: 'Filed', description: 'Yash Poluru closed the cores.', time: '2026-06-30' }],
    },
    {
      id: 'humid',
      mark: 'SH-24',
      title: 'Shelf humidity',
      kind: 'Archive',
      status: 'Open',
      lead: 'Amol Poluru',
      sites: 'Reading room',
      milestone: 0,
      condition: 2,
      documents: [],
      log: [{ id: 'humid-1', title: 'Scope opened', description: 'Amol Poluru set a meter on shelf 3.', time: '2026-11-02' }],
    },
    {
      id: 'glaze',
      mark: 'SH-15',
      title: 'Glaze trials',
      kind: 'Materials',
      status: 'Open',
      lead: 'Bindu Poluru',
      sites: 'Bench 2',
      milestone: 1,
      condition: 4,
      documents: [{ id: 'trial', title: 'Trial sheet', filed: '2026-11-03' }],
      log: [{ id: 'glaze-1', title: 'Sample drawn', description: 'Bindu Poluru mixed trial 4.', time: '2026-11-03' }],
    },
  ] as Study[],
  papers: [
    { id: 'p1', title: 'Binder notes, week 12', standing: 'Draft', author: 'Sahana Poluru', studyId: 'clay', written: '2026-11-02' },
    { id: 'p2', title: 'Silt log, east bank', standing: 'Draft', author: 'Tejas Poluru', studyId: 'silt', written: '2026-11-04' },
    { id: 'p3', title: 'Archive shelf map', standing: 'Published', author: 'Usha Poluru', studyId: 'index', written: '2026-08-19' },
    { id: 'p4', title: 'Kiln curve, spring', standing: 'Published', author: 'Vedha Poluru', studyId: 'kiln', written: '2026-05-02' },
    { id: 'p5', title: 'Humidity sheet', standing: 'Draft', author: 'Amol Poluru', studyId: 'humid', written: '2026-11-06' },
    { id: 'p6', title: 'Core labels', standing: 'Published', author: 'Yash Poluru', studyId: 'cores', written: '2026-06-20' },
    { id: 'p7', title: 'Glaze trial 4', standing: 'Draft', author: 'Bindu Poluru', studyId: 'glaze', written: '2026-11-01' },
  ] as Paper[],
  grants: [
    { id: 'g77', mark: 'SH-77', studyId: 'clay', amount: '$48,000', deadline: '2027-03-01', owner: 'Sahana Poluru', status: 'Open' },
    { id: 'g81', mark: 'SH-81', studyId: 'silt', amount: '$22,500', deadline: '2026-12-15', owner: 'Tejas Poluru', status: 'Open' },
    { id: 'g64', mark: 'SH-64', studyId: 'index', amount: '$15,000', deadline: '2026-11-30', owner: 'Usha Poluru', status: 'Open' },
    { id: 'g52', mark: 'SH-52', studyId: 'kiln', amount: '$9,400', deadline: '2026-09-01', owner: 'Vedha Poluru', status: 'Closed' },
    { id: 'g90', mark: 'SH-90', studyId: 'cores', amount: '$31,000', deadline: '2026-06-30', owner: 'Yash Poluru', status: 'Closed' },
  ] as Grant[],
  rooms: [
    {
      id: 'kiln-room',
      name: 'Kiln room',
      floor: 'Floor 1',
      keeper: 'Sahana Poluru',
      note: 'Firing days are Tuesday.',
      equipment: ['Oven A', 'Scale', 'Log book'],
    },
    {
      id: 'reading',
      name: 'Reading room',
      floor: 'Floor 2',
      keeper: 'Usha Poluru',
      note: 'Quiet hours after 16:00.',
      equipment: ['Shelf 3', 'Scanner', 'Desk lamp'],
    },
    {
      id: 'field',
      name: 'Field kit',
      floor: 'Signed out',
      keeper: 'Tejas Poluru',
      note: 'Sign the kit out before a site day.',
      equipment: ['Gauge', 'Sample jars'],
    },
    {
      id: 'bench',
      name: 'Bench 2',
      floor: 'Floor 1',
      keeper: 'Bindu Poluru',
      note: 'Wipe the bench after glaze.',
      equipment: ['Mixer', 'Molds'],
    },
  ] as Room[],
})

export function findStudy(id: string) {
  return shelf.studies.find((study) => study.id === id)
}

export function findPaper(id: string) {
  return shelf.papers.find((paper) => paper.id === id)
}

export function studyTitle(id: string) {
  return findStudy(id)?.title ?? 'Study'
}

export function fileDocument(studyId: string, title: string) {
  const study = findStudy(studyId)
  if (!study) return
  study.documents.unshift({ id: `doc-${Date.now()}`, title, filed: '2026-11-07' })
  study.log.unshift({
    id: `log-${Date.now()}`,
    title: 'Document filed',
    description: `${title} is on the shelf.`,
    time: '2026-11-07',
  })
}

export function fileNote(studyId: string, title: string, author: string, day: string) {
  const study = findStudy(studyId)
  if (!study) return
  study.log.unshift({
    id: `note-${Date.now()}`,
    title,
    description: `${author} filed the note.`,
    time: day,
  })
}
