import { reactive } from 'vue'

export type RoomStatus = 'Open' | 'Occupied' | 'Cleaning' | 'Hold'

export interface Room {
  id: string
  number: string
  status: RoomStatus
}

export interface SupplyAlert {
  id: string
  item: string
  note: string
}

export interface Unit {
  id: string
  name: string
  charge: string
  rooms: Room[]
  alerts: SupplyAlert[]
}

export interface ShiftMark {
  id: string
  title: string
  description: string
  time: string
}

export const desk = reactive({
  admissionsToday: 6,
  delayedDischarges: 2,
  units: [
    {
      id: 'cedar',
      name: 'Cedar',
      charge: 'Jaya Poluru',
      rooms: [
        { id: 'c201', number: '201', status: 'Open' },
        { id: 'c202', number: '202', status: 'Occupied' },
        { id: 'c203', number: '203', status: 'Cleaning' },
        { id: 'c204', number: '204', status: 'Occupied' },
        { id: 'c205', number: '205', status: 'Open' },
      ],
      alerts: [{ id: 'a1', item: 'Isolation gowns', note: 'Two cases left on the cart.' }],
    },
    {
      id: 'maple',
      name: 'Maple',
      charge: 'Kiran Poluru',
      rooms: [
        { id: 'm310', number: '310', status: 'Occupied' },
        { id: 'm311', number: '311', status: 'Open' },
        { id: 'm312', number: '312', status: 'Hold' },
        { id: 'm314', number: '314', status: 'Occupied' },
        { id: 'm315', number: '315', status: 'Cleaning' },
      ],
      alerts: [{ id: 'a2', item: 'Bed linen', note: 'The closet is down to one stack.' }],
    },
    {
      id: 'harbor',
      name: 'Harbor',
      charge: 'Lata Poluru',
      rooms: [
        { id: 'h118', number: '118', status: 'Open' },
        { id: 'h120', number: '120', status: 'Occupied' },
        { id: 'h121', number: '121', status: 'Cleaning' },
        { id: 'h122', number: '122', status: 'Open' },
      ],
      alerts: [],
    },
  ] as Unit[],
  shift: [
    { id: 's1', title: 'Day shift starts', description: 'Jaya Poluru on Cedar', time: '07:00' },
    { id: 's2', title: 'Two admissions', description: 'Maple', time: '11:00' },
    { id: 's3', title: 'Evening handoff', description: 'Manu Poluru', time: '15:00' },
    { id: 's4', title: 'Night lead', description: 'Neel Poluru', time: '19:00' },
  ] as ShiftMark[],
})

export function occupiedCount(unit: Unit) {
  return unit.rooms.filter((room) => room.status === 'Occupied').length
}

export function openBeds() {
  return desk.units.reduce((sum, unit) => sum + unit.rooms.filter((room) => room.status === 'Open').length, 0)
}
