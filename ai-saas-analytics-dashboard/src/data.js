export const currentUser = {
  name: 'Ishaan Poluru',
  role: 'Head of Growth',
  initials: 'IP',
};

export const navItems = [
  { id: 'overview', label: 'Overview', href: '#overview', icon: 'home' },
  { id: 'activation', label: 'Activation', href: '#activation', icon: 'zap' },
  { id: 'retention', label: 'Retention', href: '#retention', icon: 'repeat' },
  { id: 'usage', label: 'Usage', href: '#usage', icon: 'bar-chart-2' },
  { id: 'experiments', label: 'Experiments', href: '#experiments', icon: 'trending-up' },
  { id: 'enhancements', label: 'Enhancements', href: '#enhancements', icon: 'plus-circle' },
];

export const kpis = [
  { label: 'MRR', value: '$186k', hint: 'Net new $22.4k', trend: 'up', trendValue: '+13.6%' },
  { label: 'Active users', value: '18.4k', hint: 'WAU / MAU 42%', trend: 'up', trendValue: '+8.1%' },
  { label: 'Churn', value: '2.4%', hint: 'Logo churn', trend: 'down', trendValue: '-0.3 pts' },
  { label: 'NPS', value: '54', hint: 'Last pulse', trend: 'up', trendValue: '+6' },
];

export const growthPod = [
  { name: 'Meera Poluru', closed: 14, pipeline: '32 experiments', quota: 88 },
  { name: 'Arjun Poluru', closed: 10, pipeline: '21 experiments', quota: 71 },
  { name: 'Sana Poluru', closed: 8, pipeline: '18 experiments', quota: 64 },
  { name: 'Rahul Poluru', closed: 12, pipeline: '27 experiments', quota: 82 },
];

export const agenda = [
  { id: 1, title: 'Activation funnel review', with: 'Kiran Poluru', time: '09:30', type: 'Meeting' },
  { id: 2, title: 'Ship onboarding checklist v3', with: 'Dev Poluru', time: '12:00', type: 'Task' },
  { id: 3, title: 'Churn interview — Northwind Co', with: 'Ananya Poluru', time: '15:00', type: 'Call' },
];

export const atRisk = [
  { id: 1, label: 'Trial-to-paid experiment underpowered — needs 4 more days', icon: 'alert-triangle' },
  { id: 2, label: 'Retention cohort dashboard has stale data since Tuesday', icon: 'alert-triangle' },
  { id: 3, label: 'NPS survey response rate dropped 9 pts this week', icon: 'alert-triangle' },
];

export const playbooks = [
  { id: 'p1', title: 'Activate within the first session', content: 'Surface the aha-moment action inside the first 5 minutes.' },
  { id: 'p2', title: 'Win back at day 14', content: 'Trigger a lifecycle email when usage drops two weeks in a row.' },
  { id: 'p3', title: 'Expand seats after 3 invites', content: 'Prompt an upgrade nudge once a workspace passes 3 invited members.' },
];

export const timelineItems = [
  { id: 1, title: 'Experiment shipped to 100%', description: 'Onboarding checklist v3 · Dev Poluru', time: '3h ago' },
  { id: 2, title: 'Cohort report refreshed', description: 'Retention · Meera Poluru', time: '6h ago' },
  { id: 3, title: 'New workspace activated', description: 'Northwind Co · Arjun Poluru', time: '1d ago' },
];

export const notifications = [
  { id: 1, title: 'Experiment hit significance', body: 'Trial-to-paid variant B is up 6.2%.', time: '12m ago' },
  { id: 2, title: 'Churn risk flagged', body: 'Northwind Co usage dropped 40% this week.', time: '2h ago' },
  { id: 3, title: 'Enhancement shipped', body: 'Cohort export to CSV is live.', time: '4h ago' },
];

export const ownerOptions = [
  { value: 'meera', label: 'Meera Poluru' },
  { value: 'arjun', label: 'Arjun Poluru' },
  { value: 'sana', label: 'Sana Poluru' },
  { value: 'rahul', label: 'Rahul Poluru' },
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
  { id: 'r1', title: 'Cohort export to CSV', type: 'Enhancement', priority: 'High', status: 'Shipped', owner: 'Meera Poluru', due: 'Aug 14' },
  { id: 'r2', title: 'Self-serve upgrade nudge', type: 'Feature', priority: 'High', status: 'In progress', owner: 'Arjun Poluru', due: 'Sep 06' },
  { id: 'r3', title: 'Experiment power calculator', type: 'Feature', priority: 'Medium', status: 'Planned', owner: 'Sana Poluru', due: 'Sep 20' },
  { id: 'r4', title: 'NPS survey auto-follow-up', type: 'Enhancement', priority: 'Medium', status: 'In progress', owner: 'Rahul Poluru', due: 'Sep 12' },
  { id: 'r5', title: 'Slack alert for churn risk', type: 'Enhancement', priority: 'Low', status: 'Planned', owner: 'Kiran Poluru', due: 'Oct 04' },
  { id: 'r6', title: 'Retention heatmap widget', type: 'Feature', priority: 'Medium', status: 'Shipped', owner: 'Meera Poluru', due: 'Jul 31' },
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

export const mrrMonths = [128, 136, 141, 149, 156, 162, 168, 172, 178, 181, 184, 186];
