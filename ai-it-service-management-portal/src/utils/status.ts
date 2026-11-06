import type { Priority, TicketStatus } from '@/data/desk'

export function priorityTone(priority: Priority): 'neutral' | 'info' | 'warning' | 'danger' {
  if (priority === 'Urgent') return 'danger'
  if (priority === 'High') return 'warning'
  if (priority === 'Normal') return 'info'
  return 'neutral'
}

export function ticketTone(status: TicketStatus): 'info' | 'warning' | 'success' {
  if (status === 'Waiting') return 'warning'
  if (status === 'Closed') return 'success'
  return 'info'
}
