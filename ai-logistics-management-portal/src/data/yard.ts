import { reactive } from 'vue'

export type LoadStatus = 'On dock' | 'Moving' | 'Held' | 'Delivered'

export type Scan = {
  id: string
  title: string
  description: string
  time: string
}

export type Load = {
  id: string
  number: string
  from: string
  to: string
  stage: number
  status: LoadStatus
  carrier: string
  pieces: number
  expected: number
  scans: Scan[]
}

export type Hub = {
  id: string
  city: string
  lead: string
  used: number
  capacity: number
  doors: number
}

export type Carrier = {
  id: string
  name: string
  lane: string
  score: number
  dock: string
  phone: string
}

export const yard = reactive({
  defaultHub: 'Austin',
  cutoff: '16:00',
  holdShort: true,
  pin: '',
  loads: [
    {
      id: 'wb-3381',
      number: 'WB-3381',
      from: 'Austin',
      to: 'Dallas',
      stage: 1,
      status: 'Moving',
      carrier: 'Rohan Poluru',
      pieces: 18,
      expected: 18,
      scans: [
        { id: 's1', title: 'Picked up', description: 'Austin dock, Meera Poluru.', time: '06:10' },
        { id: 's2', title: 'Departed', description: 'Left Austin on the north lane.', time: '07:40' },
        { id: 's3', title: 'Scan', description: 'Mile marker on the way to Dallas.', time: '09:15' },
      ],
    },
    {
      id: 'wb-3384',
      number: 'WB-3384',
      from: 'Dallas',
      to: 'Chicago',
      stage: 2,
      status: 'On dock',
      carrier: 'Padma Poluru',
      pieces: 24,
      expected: 24,
      scans: [
        { id: 's1', title: 'Arrived', description: 'Dallas hub, door 4.', time: '08:05' },
        { id: 's2', title: 'At hub', description: 'Padma Poluru checked the count.', time: '08:40' },
      ],
    },
    {
      id: 'wb-3390',
      number: 'WB-3390',
      from: 'Chicago',
      to: 'Austin',
      stage: 3,
      status: 'Moving',
      carrier: 'Nikhil Poluru',
      pieces: 8,
      expected: 8,
      scans: [
        { id: 's1', title: 'Out for delivery', description: 'Nikhil Poluru has the stop list.', time: '10:20' },
      ],
    },
    {
      id: 'wb-3372',
      number: 'WB-3372',
      from: 'Austin',
      to: 'Chicago',
      stage: 0,
      status: 'Moving',
      carrier: 'Om Poluru',
      pieces: 14,
      expected: 14,
      scans: [{ id: 's1', title: 'Picked up', description: 'Austin shipper dock.', time: '11:00' }],
    },
    {
      id: 'wb-3366',
      number: 'WB-3366',
      from: 'Dallas',
      to: 'Austin',
      stage: 4,
      status: 'Delivered',
      carrier: 'Shreya Poluru',
      pieces: 6,
      expected: 6,
      scans: [
        { id: 's1', title: 'Delivered', description: 'Signed by Shreya Poluru.', time: 'Yesterday 15:10' },
      ],
    },
    {
      id: 'wb-3395',
      number: 'WB-3395',
      from: 'Chicago',
      to: 'Dallas',
      stage: 1,
      status: 'Held',
      carrier: 'Tarun Poluru',
      pieces: 11,
      expected: 11,
      scans: [
        { id: 's1', title: 'Held', description: 'Waiting on a door at Dallas.', time: '07:55' },
      ],
    },
    {
      id: 'wb-3401',
      number: 'WB-3401',
      from: 'Austin',
      to: 'Dallas',
      stage: 2,
      status: 'Held',
      carrier: 'Veena Poluru',
      pieces: 4,
      expected: 9,
      scans: [
        { id: 's1', title: 'Short', description: 'Four pieces on the dock. Five still at the shipper.', time: '09:50' },
      ],
    },
  ] as Load[],
  hubs: [
    { id: 'hub-aus', city: 'Austin', lead: 'Meera Poluru', used: 72, capacity: 100, doors: 12 },
    { id: 'hub-dal', city: 'Dallas', lead: 'Padma Poluru', used: 64, capacity: 90, doors: 10 },
    { id: 'hub-chi', city: 'Chicago', lead: 'Nikhil Poluru', used: 40, capacity: 120, doors: 16 },
  ] as Hub[],
  carriers: [
    { id: 'cr-1', name: 'Meera Poluru', lane: 'Austin dock', score: 5, dock: 'Door 1', phone: '512-0101' },
    { id: 'cr-2', name: 'Nikhil Poluru', lane: 'Chicago → Austin', score: 4, dock: 'Door 6', phone: '312-0144' },
    { id: 'cr-3', name: 'Om Poluru', lane: 'Austin → Chicago', score: 4, dock: 'Door 2', phone: '512-0118' },
    { id: 'cr-4', name: 'Padma Poluru', lane: 'Dallas hub', score: 5, dock: 'Door 4', phone: '214-0202' },
    { id: 'cr-5', name: 'Rohan Poluru', lane: 'Austin → Dallas', score: 4, dock: 'Door 3', phone: '512-0177' },
    { id: 'cr-6', name: 'Shreya Poluru', lane: 'Dallas → Austin', score: 5, dock: 'Door 5', phone: '214-0190' },
    { id: 'cr-7', name: 'Tarun Poluru', lane: 'Chicago → Dallas', score: 3, dock: 'Door 8', phone: '312-0160' },
    { id: 'cr-8', name: 'Veena Poluru', lane: 'Austin → Dallas', score: 4, dock: 'Door 7', phone: '512-0188' },
  ] as Carrier[],
})

export function findLoad(id: string) {
  return yard.loads.find((load) => load.id === id)
}
