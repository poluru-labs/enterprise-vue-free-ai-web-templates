import { reactive } from 'vue'

export type CourseStatus = 'Open' | 'Full' | 'Closed'

export type Course = {
  id: string
  title: string
  hours: number
  owner: string
  completion: number
  rating: number
  status: CourseStatus
  summary: string
  outline: { id: string; title: string; content: string }[]
  sessions: { id: string; title: string; description: string; time: string }[]
}

export type Learner = {
  id: string
  name: string
  role: string
  course: string
  completion: number
}

export type PathStep = {
  id: string
  label: string
  description: string
}

export type Booking = {
  id: string
  title: string
  course: string
  room: string
  date: string
  time: string
  note: string
}

export const school = reactive({
  reminder: '1 day before',
  passMark: 80,
  quiet: false,
  pin: '',
  courses: [
    {
      id: 'crs-onboard',
      title: 'Onboarding',
      hours: 6,
      owner: 'Aditi Poluru',
      completion: 80,
      rating: 4,
      status: 'Open',
      summary: 'First week for new staff. Badge, desk, and who to ask.',
      outline: [
        { id: 'o1', title: 'Arrival', content: 'Front desk, badge photo, and the office map.' },
        { id: 'o2', title: 'Desk setup', content: 'Laptop, mail, and the shared drive.' },
        { id: 'o3', title: 'Who to ask', content: 'Team leads and the registrar desk.' },
      ],
      sessions: [
        { id: 's1', title: 'Morning welcome', description: 'Room A, first hour.', time: 'Mon 09:00' },
        { id: 's2', title: 'Desk walk', description: 'Room B, with Aditi Poluru.', time: 'Mon 11:00' },
      ],
    },
    {
      id: 'crs-safety',
      title: 'Safety',
      hours: 3,
      owner: 'Bharat Poluru',
      completion: 45,
      rating: 5,
      status: 'Open',
      summary: 'Fire exits, first aid box, and the visitor log.',
      outline: [
        { id: 'o1', title: 'Exits', content: 'Two stairwells and the courtyard door.' },
        { id: 'o2', title: 'First aid', content: 'Box on each floor. Bharat Poluru restocks it.' },
      ],
      sessions: [{ id: 's1', title: 'Drill', description: 'Meet in the courtyard.', time: 'Tue 14:00' }],
    },
    {
      id: 'crs-writing',
      title: 'Writing for clients',
      hours: 4,
      owner: 'Chitra Poluru',
      completion: 20,
      rating: 4,
      status: 'Open',
      summary: 'Short notes, clear subjects, and a review before send.',
      outline: [
        { id: 'o1', title: 'Subject lines', content: 'Name the ask in the first six words.' },
        { id: 'o2', title: 'Review', content: 'A second reader before the note leaves.' },
      ],
      sessions: [{ id: 's1', title: 'Clinic', description: 'Bring one draft.', time: 'Wed 10:00' }],
    },
    {
      id: 'crs-tools',
      title: 'Desk tools',
      hours: 2,
      owner: 'Deepak Poluru',
      completion: 100,
      rating: 3,
      status: 'Closed',
      summary: 'Mail, calendar, and the shared printer.',
      outline: [{ id: 'o1', title: 'Printer', content: 'Queue name is Courtyard-2.' }],
      sessions: [{ id: 's1', title: 'Lab', description: 'Bring a laptop.', time: 'Thu 15:00' }],
    },
    {
      id: 'crs-records',
      title: 'Records',
      hours: 3,
      owner: 'Esha Poluru',
      completion: 0,
      rating: 4,
      status: 'Open',
      summary: 'Where files live and how long they stay.',
      outline: [{ id: 'o1', title: 'Folders', content: 'One folder per client, dated.' }],
      sessions: [{ id: 's1', title: 'Filing hour', description: 'Records room.', time: 'Fri 09:30' }],
    },
    {
      id: 'crs-welcome',
      title: 'Welcome week',
      hours: 5,
      owner: 'Farid Poluru',
      completion: 60,
      rating: 5,
      status: 'Full',
      summary: 'Five short meetings for people who start this month.',
      outline: [{ id: 'o1', title: 'Roster', content: 'Farid Poluru keeps the list.' }],
      sessions: [{ id: 's1', title: 'Kickoff', description: 'Room C.', time: 'Mon 13:00' }],
    },
  ] as Course[],
  learners: [
    { id: 'ln-aditi', name: 'Aditi Poluru', role: 'Registrar', course: 'Onboarding', completion: 100 },
    { id: 'ln-bharat', name: 'Bharat Poluru', role: 'Safety lead', course: 'Safety', completion: 100 },
    { id: 'ln-chitra', name: 'Chitra Poluru', role: 'Editor', course: 'Writing for clients', completion: 70 },
    { id: 'ln-deepak', name: 'Deepak Poluru', role: 'Desk lead', course: 'Desk tools', completion: 100 },
    { id: 'ln-esha', name: 'Esha Poluru', role: 'Records', course: 'Records', completion: 10 },
    { id: 'ln-farid', name: 'Farid Poluru', role: 'Host', course: 'Welcome week', completion: 60 },
    { id: 'ln-gowri', name: 'Gowri Poluru', role: 'New hire', course: 'Onboarding', completion: 40 },
    { id: 'ln-hemal', name: 'Hemal Poluru', role: 'New hire', course: 'Safety', completion: 0 },
  ] as Learner[],
  newHire: [
    { id: 'p1', label: 'Onboarding', description: 'Badge, desk, and who to ask.' },
    { id: 'p2', label: 'Safety', description: 'Exits and the first aid box.' },
    { id: 'p3', label: 'Writing for clients', description: 'A clear note before send.' },
    { id: 'p4', label: 'Desk tools', description: 'Mail, calendar, and the printer.' },
  ] as PathStep[],
  rooms: ['Room A', 'Room B', 'Room C', 'Courtyard'],
  bookings: [
    {
      id: 'bk-1',
      title: 'Morning welcome',
      course: 'Onboarding',
      room: 'Room A',
      date: '2026-11-09',
      time: '09:00',
      note: 'First hour.',
    },
    {
      id: 'bk-2',
      title: 'Drill',
      course: 'Safety',
      room: 'Courtyard',
      date: '2026-11-10',
      time: '14:00',
      note: 'Meet outside.',
    },
  ] as Booking[],
})

export function findCourse(id: string) {
  return school.courses.find((course) => course.id === id)
}
