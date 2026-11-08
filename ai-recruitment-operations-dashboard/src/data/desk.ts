import { reactive } from 'vue'

export type Stage = 'Applied' | 'Screen' | 'Interview' | 'Offer'
export type Location = 'Austin' | 'Denver'

export interface Role {
  id: string
  title: string
  location: Location
  status: 'Open' | 'Closed'
  focus: Stage
}

export interface Candidate {
  id: string
  name: string
  roleId: string
  stage: Stage
  rating: number
  note: string
  events: { id: string; title: string; description: string; time: string }[]
}

export interface Interview {
  id: string
  candidateId: string
  when: 'Today' | 'This week'
  time: string
  day: string
}

export const desk = reactive({
  office: 'Austin' as Location,
  cutoff: '16:30',
  reviewOn: '2026-11-18',
  note: 'Stages stay Applied, Screen, Interview, and Offer.',
  holdClosed: false,
  pin: '',
  roles: [
    { id: 'accountant', title: 'Accountant', location: 'Austin', status: 'Open', focus: 'Interview' },
    { id: 'facilities', title: 'Facilities lead', location: 'Denver', status: 'Open', focus: 'Screen' },
    { id: 'support', title: 'Support specialist', location: 'Austin', status: 'Open', focus: 'Offer' },
    { id: 'reception', title: 'Reception', location: 'Denver', status: 'Closed', focus: 'Applied' },
  ] as Role[],
  candidates: [
    {
      id: 'juhi',
      name: 'Juhi Poluru',
      roleId: 'accountant',
      stage: 'Applied',
      rating: 0,
      note: '',
      events: [{ id: 'e1', title: 'Applied', description: 'Juhi Poluru sent a resume.', time: 'Nov 2' }],
    },
    {
      id: 'kunal',
      name: 'Kunal Poluru',
      roleId: 'accountant',
      stage: 'Screen',
      rating: 3,
      note: 'Clear on the books.',
      events: [{ id: 'e2', title: 'Screen', description: 'Kunal Poluru took the first call.', time: 'Nov 5' }],
    },
    {
      id: 'lila',
      name: 'Lila Poluru',
      roleId: 'accountant',
      stage: 'Interview',
      rating: 4,
      note: 'Strong on the close.',
      events: [{ id: 'e3', title: 'Interview', description: 'Lila Poluru sat with the desk.', time: 'Nov 7' }],
    },
    {
      id: 'manoj',
      name: 'Manoj Poluru',
      roleId: 'accountant',
      stage: 'Offer',
      rating: 5,
      note: 'Offer is out.',
      events: [{ id: 'e4', title: 'Offer', description: 'Manoj Poluru has the terms.', time: 'Nov 6' }],
    },
    {
      id: 'nandini',
      name: 'Nandini Poluru',
      roleId: 'facilities',
      stage: 'Applied',
      rating: 0,
      note: '',
      events: [{ id: 'e5', title: 'Applied', description: 'Nandini Poluru applied for Denver.', time: 'Nov 3' }],
    },
    {
      id: 'omkar',
      name: 'Omkar Poluru',
      roleId: 'facilities',
      stage: 'Screen',
      rating: 3,
      note: 'Knows the building.',
      events: [{ id: 'e6', title: 'Screen', description: 'Omkar Poluru took the screen.', time: 'Nov 8' }],
    },
    {
      id: 'pallavi',
      name: 'Pallavi Poluru',
      roleId: 'support',
      stage: 'Interview',
      rating: 4,
      note: 'Calm on the phone.',
      events: [{ id: 'e7', title: 'Interview', description: 'Pallavi Poluru met the desk.', time: 'Nov 9' }],
    },
  ] as Candidate[],
  interviews: [
    { id: 'iv-lila', candidateId: 'lila', when: 'Today', time: '10:00', day: '2026-11-07' },
    { id: 'iv-kunal', candidateId: 'kunal', when: 'This week', time: '11:30', day: '2026-11-10' },
    { id: 'iv-pallavi', candidateId: 'pallavi', when: 'This week', time: '14:00', day: '2026-11-12' },
  ] as Interview[],
})

export function findRole(id: string) {
  return desk.roles.find((role) => role.id === id)
}

export function findCandidate(id: string) {
  return desk.candidates.find((candidate) => candidate.id === id)
}

export function roleTitle(id: string) {
  return findRole(id)?.title ?? 'Role'
}

export function candidatesFor(roleId: string) {
  return desk.candidates.filter((candidate) => candidate.roleId === roleId)
}
