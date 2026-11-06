import type { IncidentState, ServiceStatus, Severity } from '@/data/desk'

export function serviceTone(status: ServiceStatus): 'success' | 'warning' | 'neutral' {
  if (status === 'Healthy') return 'success'
  if (status === 'Degraded') return 'warning'
  return 'neutral'
}

export function severityTone(severity: Severity): 'danger' | 'warning' | 'info' {
  if (severity === 'High') return 'danger'
  if (severity === 'Normal') return 'warning'
  return 'info'
}

export function incidentTone(state: IncidentState): 'danger' | 'warning' | 'success' {
  if (state === 'Open') return 'danger'
  if (state === 'Watching') return 'warning'
  return 'success'
}
