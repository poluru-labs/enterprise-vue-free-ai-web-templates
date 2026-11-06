import { reactive } from 'vue'

export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent'
export type TicketStatus = 'Open' | 'Waiting' | 'Closed'
export type TicketKind = 'Password' | 'Hardware' | 'Access' | 'Software'

export interface Comment {
  id: string
  author: string
  body: string
  time: string
}

export interface Ticket {
  id: string
  number: string
  title: string
  requester: string
  assignee: string
  priority: Priority
  status: TicketStatus
  opened: string
  kind: TicketKind
  comments: Comment[]
}

export const desk = reactive({
  tickets: [
    {
      id: 'tk-2401',
      number: 'DL-2401',
      title: 'Password reset',
      requester: 'Rhea Poluru',
      assignee: 'Suresh Poluru',
      priority: 'Normal',
      status: 'Open',
      opened: '2026-11-05',
      kind: 'Password',
      comments: [
        { id: 'c1', author: 'Rhea Poluru', body: 'The desk login will not take the current password.', time: '09:10' },
        { id: 'c2', author: 'Suresh Poluru', body: 'Reset sent. Waiting on a sign-in.', time: '09:24' },
      ],
    },
    {
      id: 'tk-2404',
      number: 'DL-2404',
      title: 'Laptop swap',
      requester: 'Tara Poluru',
      assignee: 'Uma Poluru',
      priority: 'High',
      status: 'Open',
      opened: '2026-11-05',
      kind: 'Hardware',
      comments: [{ id: 'c1', author: 'Tara Poluru', body: 'The keyboard skips keys. A spare is fine.', time: '10:02' }],
    },
    {
      id: 'tk-2408',
      number: 'DL-2408',
      title: 'Billing folder access',
      requester: 'Vikas Poluru',
      assignee: 'Wasim Poluru',
      priority: 'Low',
      status: 'Waiting',
      opened: '2026-11-04',
      kind: 'Access',
      comments: [{ id: 'c1', author: 'Wasim Poluru', body: 'Asked the folder owner to confirm.', time: '16:40' }],
    },
    {
      id: 'tk-2411',
      number: 'DL-2411',
      title: 'Design seat',
      requester: 'Yamini Poluru',
      assignee: 'Pavan Poluru',
      priority: 'Urgent',
      status: 'Open',
      opened: '2026-11-05',
      kind: 'Software',
      comments: [{ id: 'c1', author: 'Yamini Poluru', body: 'Need a seat before the afternoon review.', time: '11:15' }],
    },
    {
      id: 'tk-2390',
      number: 'DL-2390',
      title: 'Badge reprint',
      requester: 'Suresh Poluru',
      assignee: 'Rhea Poluru',
      priority: 'Low',
      status: 'Closed',
      opened: '2026-11-03',
      kind: 'Access',
      comments: [{ id: 'c1', author: 'Rhea Poluru', body: 'Printed and left at the desk.', time: '14:05' }],
    },
  ] as Ticket[],
})
