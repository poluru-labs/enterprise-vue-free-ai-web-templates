import type { RoomStatus } from '@/data/board'

export function roomTone(status: RoomStatus): 'success' | 'neutral' | 'warning' | 'info' {
  if (status === 'Open') return 'success'
  if (status === 'Cleaning') return 'warning'
  if (status === 'Hold') return 'info'
  return 'neutral'
}
