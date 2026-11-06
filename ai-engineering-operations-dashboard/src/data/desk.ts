import { reactive } from 'vue'

export type ServiceStatus = 'Healthy' | 'Degraded' | 'Paused'
export type Severity = 'High' | 'Normal' | 'Low'
export type IncidentState = 'Open' | 'Watching' | 'Closed'

export interface ServiceRecord {
  id: string
  name: string
  owner: string
  status: ServiceStatus
  uptime: number
  region: string
  summary: string
  endpoint: string
}

export interface DeployRecord {
  id: string
  serviceId: string
  service: string
  version: string
  environment: string
  owner: string
  at: string
  windowStart: string
  windowEnd: string
  notes: string
  step: number
}

export interface IncidentRecord {
  id: string
  title: string
  serviceId: string
  service: string
  severity: Severity
  state: IncidentState
  owner: string
  opened: string
  writeup: string
}

export interface PersonRecord {
  name: string
  role: string
  team: string
  shift: string
}

export const people: PersonRecord[] = [
  { name: 'Anika Poluru', role: 'Primary on call', team: 'Platform', shift: 'This week' },
  { name: 'Dev Poluru', role: 'Service owner', team: 'Billing', shift: 'Weekdays' },
  { name: 'Harsha Poluru', role: 'Service owner', team: 'Checkout', shift: 'Weekdays' },
  { name: 'Leela Poluru', role: 'Service owner', team: 'Directory', shift: 'Weekdays' },
  { name: 'Mohan Poluru', role: 'Secondary on call', team: 'Incidents', shift: 'This week' },
  { name: 'Nila Poluru', role: 'Release', team: 'Notifications', shift: 'Weekdays' },
  { name: 'Ravi Poluru', role: 'Service owner', team: 'Media', shift: 'Weekdays' },
  { name: 'Sana Poluru', role: 'Engineering lead', team: 'Desk', shift: 'Weekdays' },
]

export const desk = reactive({
  services: [
    {
      id: 'billing',
      name: 'Billing API',
      owner: 'Dev Poluru',
      status: 'Healthy',
      uptime: 99.9,
      region: 'us-east',
      summary: 'Invoices, payments, and webhook retries.',
      endpoint: 'https://billing.northline.example/health',
    },
    {
      id: 'checkout',
      name: 'Checkout',
      owner: 'Harsha Poluru',
      status: 'Degraded',
      uptime: 98.4,
      region: 'us-east',
      summary: 'Cart, tax, and the payment handoff.',
      endpoint: 'https://checkout.northline.example/health',
    },
    {
      id: 'directory',
      name: 'Directory',
      owner: 'Leela Poluru',
      status: 'Paused',
      uptime: 99.1,
      region: 'eu-central',
      summary: 'People and group lookup. Paused for an index rebuild.',
      endpoint: 'https://directory.northline.example/health',
    },
    {
      id: 'notifications',
      name: 'Notifications',
      owner: 'Nila Poluru',
      status: 'Healthy',
      uptime: 99.8,
      region: 'us-west',
      summary: 'Mail and pager delivery for the desk.',
      endpoint: 'https://notify.northline.example/health',
    },
    {
      id: 'media',
      name: 'Media',
      owner: 'Ravi Poluru',
      status: 'Healthy',
      uptime: 99.7,
      region: 'us-west',
      summary: 'Image and file delivery for product surfaces.',
      endpoint: 'https://media.northline.example/health',
    },
  ] as ServiceRecord[],
  deploys: [
    {
      id: 'dep-checkout',
      serviceId: 'checkout',
      service: 'Checkout',
      version: '2.4.1',
      environment: 'Production',
      owner: 'Harsha Poluru',
      at: 'Nov 5, 09:10',
      windowStart: '2026-11-05',
      windowEnd: '2026-11-05',
      notes: 'Canary at 10 percent. Watch p95.',
      step: 2,
    },
    {
      id: 'dep-billing',
      serviceId: 'billing',
      service: 'Billing API',
      version: '1.9.0',
      environment: 'Staging',
      owner: 'Dev Poluru',
      at: 'Nov 4, 16:40',
      windowStart: '2026-11-04',
      windowEnd: '2026-11-04',
      notes: 'Webhook retry shipped to staging.',
      step: 3,
    },
    {
      id: 'dep-directory',
      serviceId: 'directory',
      service: 'Directory',
      version: '3.1.2',
      environment: 'Production',
      owner: 'Leela Poluru',
      at: 'Nov 4, 11:05',
      windowStart: '2026-11-04',
      windowEnd: '2026-11-04',
      notes: 'Held for the index rebuild.',
      step: 1,
    },
    {
      id: 'dep-notify',
      serviceId: 'notifications',
      service: 'Notifications',
      version: '0.8.4',
      environment: 'Staging',
      owner: 'Nila Poluru',
      at: 'Nov 3, 14:20',
      windowStart: '2026-11-03',
      windowEnd: '2026-11-03',
      notes: 'Quiet release. No pager change.',
      step: 3,
    },
    {
      id: 'dep-media',
      serviceId: 'media',
      service: 'Media',
      version: '4.0.0',
      environment: 'Production',
      owner: 'Ravi Poluru',
      at: 'Nov 2, 10:00',
      windowStart: '2026-11-02',
      windowEnd: '2026-11-02',
      notes: 'Thumbnail path cut over.',
      step: 3,
    },
  ] as DeployRecord[],
  incidents: [
    {
      id: 'inc-checkout',
      title: 'Checkout latency',
      serviceId: 'checkout',
      service: 'Checkout',
      severity: 'High',
      state: 'Open',
      owner: 'Harsha Poluru',
      opened: '2026-11-05',
      writeup: 'p95 crossed 800ms after the 2.4.1 canary. Harsha Poluru is holding the next step.',
    },
    {
      id: 'inc-directory',
      title: 'Directory index rebuild',
      serviceId: 'directory',
      service: 'Directory',
      severity: 'Normal',
      state: 'Watching',
      owner: 'Leela Poluru',
      opened: '2026-11-04',
      writeup: 'Lookup is paused while the index rebuild finishes. Reads return the last good snapshot.',
    },
    {
      id: 'inc-billing',
      title: 'Billing webhook delay',
      serviceId: 'billing',
      service: 'Billing API',
      severity: 'Low',
      state: 'Closed',
      owner: 'Dev Poluru',
      opened: '2026-11-03',
      writeup: 'Retries recovered after the staging deploy. No open customer impact.',
    },
  ] as IncidentRecord[],
  settings: {
    deskName: 'Northline',
    pager: true,
    mail: true,
    quiet: false,
    cadence: 'daily',
    digest: 'weekday',
    holdMinutes: 15,
    digestTime: '09:00',
    pin: '',
    reviewDate: '2026-11-09',
    slug: 'northline',
  },
})

export const onCall = [
  { id: 'primary', label: 'Primary', description: 'Anika Poluru · Platform' },
  { id: 'secondary', label: 'Secondary', description: 'Mohan Poluru · Incidents' },
  { id: 'lead', label: 'Lead', description: 'Sana Poluru · Desk' },
]
