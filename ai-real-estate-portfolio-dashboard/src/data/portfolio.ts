import { reactive } from 'vue'

export type City = 'Austin' | 'Denver'
export type UnitStatus = 'Leased' | 'Vacant'
export type OrderStatus = 'Open' | 'Closed'

export interface Property {
  id: string
  name: string
  address: string
  city: City
  manager: string
  score: number
}

export interface Unit {
  id: string
  propertyId: string
  label: string
  rent: number
  tenant: string
  ends: string
  status: UnitStatus
}

export interface WorkOrder {
  id: string
  number: string
  propertyId: string
  unitId: string
  title: string
  owner: string
  status: OrderStatus
  filed: string
  note: string
  events: { id: string; title: string; description: string; time: string }[]
}

export const book = reactive({
  name: 'Lotwell',
  fiscalStart: '2026-01-01',
  city: 'Austin' as City,
  cutoff: '17:00',
  note: 'Rent is due on the first.',
  holdVacant: true,
  pin: '',
  properties: [
    { id: 'cedar', name: 'Cedar Court', address: '410 Barton', city: 'Austin', manager: 'Anil Poluru', score: 4 },
    { id: 'elm', name: 'Elm House', address: '88 East Ave', city: 'Austin', manager: 'Bhavna Poluru', score: 5 },
    { id: 'ridge', name: 'Ridge Lofts', address: '15 Blake St', city: 'Denver', manager: 'Chirag Poluru', score: 4 },
    { id: 'oak', name: 'Oak Annex', address: '220 Pearl', city: 'Denver', manager: 'Damini Poluru', score: 3 },
  ] as Property[],
  units: [
    { id: 'cedar-1a', propertyId: 'cedar', label: '1A', rent: 1450, tenant: 'Hema Poluru', ends: '2027-03-01', status: 'Leased' },
    { id: 'cedar-2b', propertyId: 'cedar', label: '2B', rent: 1620, tenant: 'Imran Poluru', ends: '2026-12-15', status: 'Leased' },
    { id: 'cedar-3c', propertyId: 'cedar', label: '3C', rent: 1500, tenant: '', ends: '', status: 'Vacant' },
    { id: 'elm-1b', propertyId: 'elm', label: '1B', rent: 1380, tenant: 'Jasmin Poluru', ends: '2026-11-30', status: 'Leased' },
    { id: 'elm-2a', propertyId: 'elm', label: '2A', rent: 1510, tenant: 'Gautam Poluru', ends: '2027-06-01', status: 'Leased' },
    { id: 'ridge-2b', propertyId: 'ridge', label: '2B', rent: 1890, tenant: 'Bhavna Poluru', ends: '2026-08-20', status: 'Leased' },
    { id: 'ridge-4a', propertyId: 'ridge', label: '4A', rent: 2100, tenant: 'Chirag Poluru', ends: '2027-01-12', status: 'Leased' },
    { id: 'oak-1a', propertyId: 'oak', label: '1A', rent: 1760, tenant: 'Damini Poluru', ends: '2027-04-04', status: 'Leased' },
    { id: 'oak-2b', propertyId: 'oak', label: '2B', rent: 1680, tenant: '', ends: '', status: 'Vacant' },
  ] as Unit[],
  orders: [
    {
      id: 'wo-14',
      number: 'WO-14',
      propertyId: 'cedar',
      unitId: 'cedar-2b',
      title: 'Kitchen leak',
      owner: 'Hema Poluru',
      status: 'Open',
      filed: '2026-11-04',
      note: '',
      events: [{ id: 'o1', title: 'Opened', description: 'Hema Poluru reported the leak.', time: 'Nov 4' }],
    },
    {
      id: 'wo-18',
      number: 'WO-18',
      propertyId: 'ridge',
      unitId: 'ridge-4a',
      title: 'Heat out',
      owner: 'Chirag Poluru',
      status: 'Open',
      filed: '2026-11-06',
      note: '',
      events: [{ id: 'o2', title: 'Opened', description: 'Chirag Poluru filed the heat call.', time: 'Nov 6' }],
    },
    {
      id: 'wo-21',
      number: 'WO-21',
      propertyId: 'oak',
      unitId: 'oak-2b',
      title: 'New lock',
      owner: 'Damini Poluru',
      status: 'Open',
      filed: '2026-11-09',
      note: '',
      events: [{ id: 'o3', title: 'Opened', description: 'Damini Poluru asked for a lock.', time: 'Nov 9' }],
    },
    {
      id: 'wo-09',
      number: 'WO-09',
      propertyId: 'elm',
      unitId: 'elm-1b',
      title: 'Hall paint',
      owner: 'Jasmin Poluru',
      status: 'Closed',
      filed: '2026-10-12',
      note: 'Paint is dry.',
      events: [{ id: 'o4', title: 'Closed', description: 'Jasmin Poluru signed off the paint.', time: 'Oct 20' }],
    },
  ] as WorkOrder[],
})

export function findProperty(id: string) {
  return book.properties.find((property) => property.id === id)
}

export function findUnit(id: string) {
  return book.units.find((unit) => unit.id === id)
}

export function propertyName(id: string) {
  return findProperty(id)?.name ?? 'Property'
}

export function unitsFor(propertyId: string) {
  return book.units.filter((unit) => unit.propertyId === propertyId)
}

export function occupancyOf(propertyId: string) {
  const units = unitsFor(propertyId)
  const leased = units.filter((unit) => unit.status === 'Leased').length
  return { leased, total: units.length }
}

export function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function nextOrderNumber() {
  const values = book.orders.map((order) => Number(order.number.slice(3)))
  const max = values.reduce((best, value) => (value > best ? value : best), 0)
  return `WO-${max + 1}`
}
