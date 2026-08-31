export const currentUser = {
  name: 'Priya Poluru',
  role: 'Head of Revenue Ops',
  initials: 'PP',
};

export const navItems = [
  { id: 'overview', label: 'Overview', href: '#overview', icon: 'home' },
  { id: 'forecast', label: 'Forecast', href: '#forecast', icon: 'trending-up' },
  { id: 'coverage', label: 'Coverage', href: '#coverage', icon: 'filter' },
  { id: 'hygiene', label: 'Hygiene', href: '#hygiene', icon: 'check-circle' },
  { id: 'playbooks', label: 'Playbooks', href: '#playbooks', icon: 'book-open' },
  { id: 'enhancements', label: 'Enhancements', href: '#enhancements', icon: 'plus-circle' },
];

export const kpis = [
  { label: 'Commit', value: '$936k', hint: '78% of quota', trend: 'up', trendValue: '+9.4%' },
  { label: 'Coverage', value: '1.4×', hint: 'Next quarter', trend: 'flat', trendValue: 'On plan' },
  { label: 'Slippage', value: '11%', hint: 'Pushed this week', trend: 'down', trendValue: '-2 pts' },
  { label: 'Hygiene', value: '88%', hint: 'Next step set', trend: 'up', trendValue: '+5 pts' },
];

export const teamBoard = [
  { name: 'Meera Poluru', closed: 12, pipeline: '$482k', quota: 92 },
  { name: 'Rahul Poluru', closed: 9, pipeline: '$361k', quota: 74 },
  { name: 'Ananya Poluru', closed: 7, pipeline: '$298k', quota: 61 },
  { name: 'Dev Poluru', closed: 11, pipeline: '$410k', quota: 85 },
];

export const agenda = [
  { id: 1, title: 'Renewal review — Harbor Labs', with: 'Kiran Poluru', time: '10:00', type: 'Meeting' },
  { id: 2, title: 'Send updated proposal', with: 'Arjun Poluru', time: '13:30', type: 'Task' },
  { id: 3, title: 'Discovery call — Fieldwork Co', with: 'Sana Poluru', time: '16:00', type: 'Call' },
];

export const atRisk = [
  { id: 1, label: 'Harbor Labs — legal redlines open 6 days', icon: 'alert-triangle' },
  { id: 2, label: 'Nimbus Retail — no next step set', icon: 'alert-triangle' },
  { id: 3, label: 'Fieldwork Co — champion went quiet', icon: 'alert-triangle' },
];

export const playbooks = [
  { id: 'p1', title: 'Multi-thread before legal review', content: 'Loop in a second economic buyer before redlines start.' },
  { id: 'p2', title: 'Reset next steps weekly', content: 'Any deal without a dated next step drops out of commit.' },
  { id: 'p3', title: 'Expansion motion for health > 80', content: 'Flag accounts above 80 health for the expansion queue.' },
];

export const timelineItems = [
  { id: 1, title: 'Deal moved to Commit', description: 'Harbor Labs · $184k', time: '2h ago' },
  { id: 2, title: 'Next step logged', description: 'Fieldwork Co · Meera Poluru', time: '5h ago' },
  { id: 3, title: 'New lead converted', description: 'Nimbus Retail · Arjun Poluru', time: '1d ago' },
];

export const notifications = [
  { id: 1, title: 'Forecast submitted', body: 'Meera Poluru submitted her Q3 forecast.', time: '9m ago' },
  { id: 2, title: 'Deal at risk', body: 'Nimbus Retail has no activity in 9 days.', time: '1h ago' },
  { id: 3, title: 'Enhancement shipped', body: 'One-click renewal reminders is live.', time: '3h ago' },
];

export const ownerOptions = [
  { value: 'meera', label: 'Meera Poluru' },
  { value: 'rahul', label: 'Rahul Poluru' },
  { value: 'ananya', label: 'Ananya Poluru' },
  { value: 'dev', label: 'Dev Poluru' },
  { value: 'kiran', label: 'Kiran Poluru' },
];

export const typeOptions = [
  { value: 'feature', label: 'Feature' },
  { value: 'enhancement', label: 'Enhancement' },
  { value: 'fix', label: 'Fix' },
];

export const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const requestColumns = [
  { key: 'title', label: 'Request' },
  { key: 'type', label: 'Type' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
  { key: 'due', label: 'Due' },
];

export const requests = [
  { id: 'r1', title: 'One-click renewal reminders', type: 'Enhancement', priority: 'High', status: 'Shipped', owner: 'Meera Poluru', due: 'Aug 12' },
  { id: 'r2', title: 'Auto-flag stalled deals', type: 'Feature', priority: 'High', status: 'In progress', owner: 'Rahul Poluru', due: 'Sep 04' },
  { id: 'r3', title: 'Weighted coverage widget', type: 'Feature', priority: 'Medium', status: 'Planned', owner: 'Ananya Poluru', due: 'Sep 18' },
  { id: 'r4', title: 'CSV export for hygiene report', type: 'Enhancement', priority: 'Medium', status: 'In progress', owner: 'Dev Poluru', due: 'Sep 10' },
  { id: 'r5', title: 'Slack digest for at-risk deals', type: 'Enhancement', priority: 'Low', status: 'Planned', owner: 'Kiran Poluru', due: 'Oct 02' },
  { id: 'r6', title: 'Command palette for quick actions', type: 'Feature', priority: 'Medium', status: 'Shipped', owner: 'Meera Poluru', due: 'Jul 29' },
];

export function statusTone(status) {
  if (status === 'Shipped') return 'success';
  if (status === 'In progress') return 'warning';
  return 'info';
}

export function priorityVariant(priority) {
  if (priority === 'High') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'brand';
}

export function sparkPoints(values, width = 220, height = 56) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export const pipelineMonths = [2.8, 3.0, 3.1, 3.4, 3.6, 3.9, 4.1, 4.2, 4.4, 4.5, 4.7, 4.86];
