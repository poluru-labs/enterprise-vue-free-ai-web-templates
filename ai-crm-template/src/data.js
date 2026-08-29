export const productName = 'Bloom';
export const productLine = 'CRM';

export const currentUser = {
  name: 'Priya Poluru',
  email: 'priya.poluru@polurulabs.example',
  role: 'Revenue lead',
  quota: '$1.20M',
  attained: '78%',
  initials: 'PP',
};

export const company = {
  name: 'Poluru Cloud',
  region: 'Americas · EMEA',
  fiscal: 'FY26 Q3',
  currency: 'USD',
};

export const navItems = [
  { id: 'overview', label: 'Overview', href: '#/overview', icon: 'home' },
  { id: 'pipeline', label: 'Pipeline', href: '#/pipeline', icon: 'filter' },
  { id: 'deals', label: 'Deals', href: '#/deals', icon: 'star' },
  { id: 'leads', label: 'Leads', href: '#/leads', icon: 'user' },
  { id: 'accounts', label: 'Accounts', href: '#/accounts', icon: 'folder' },
  { id: 'activities', label: 'Activities', href: '#/activities', icon: 'calendar' },
  { id: 'reports', label: 'Reports', href: '#/reports', icon: 'file' },
  { id: 'settings', label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const quickLinks = [
  { id: 'ql-deal', label: 'Create deal', description: 'Open the new opportunity form', icon: 'plus' },
  { id: 'ql-call', label: 'Log a call', description: 'Capture notes and next step', icon: 'mail' },
  { id: 'ql-lead', label: 'Convert lead', description: 'Turn a score into a deal', icon: 'user' },
];

export const kpis = [
  { label: 'Pipeline', value: '$4.86M', hint: 'Weighted $2.41M', trend: 'up', trendValue: '+18.6%' },
  { label: 'Open deals', value: '72', hint: '14 closing this week', trend: 'up', trendValue: '+6' },
  { label: 'Win rate', value: '31%', hint: 'Trailing 90 days', trend: 'up', trendValue: '+2.4 pts' },
  { label: 'Quota attained', value: '78%', hint: '$936k of $1.20M', trend: 'up', trendValue: '+9.4%' },
];

export const pipelineMonths = [2.8, 3.0, 3.1, 3.4, 3.6, 3.9, 4.1, 4.2, 4.4, 4.5, 4.7, 4.86];

export const stages = ['Qualify', 'Discovery', 'Proposal', 'Negotiation', 'Closed won'];

export const funnel = [
  { stage: 'Qualify', count: 18, width: 100, value: '$640k' },
  { stage: 'Discovery', count: 14, width: 82, value: '$510k' },
  { stage: 'Proposal', count: 11, width: 64, value: '$860k' },
  { stage: 'Negotiation', count: 7, width: 44, value: '$428k' },
  { stage: 'Closed won', count: 4, width: 28, value: '$312k' },
];

export const teamBoard = [
  { name: 'Priya Poluru', closed: '$312k', pipeline: '$1.12M', quota: 78, trend: '+12%' },
  { name: 'Maya Poluru', closed: '$186k', pipeline: '$840k', quota: 71, trend: '+8%' },
  { name: 'Arjun Poluru', closed: '$164k', pipeline: '$620k', quota: 64, trend: '+3%' },
  { name: 'Jordan Poluru', closed: '$148k', pipeline: '$910k', quota: 61, trend: '+9%' },
  { name: 'Sahana Poluru', closed: '$126k', pipeline: '$540k', quota: 54, trend: '-2%' },
];

export const agenda = [
  { id: 'ag_01', time: '16:20', title: 'Harbor legal walkthrough', with: 'Meera Poluru', type: 'Call' },
  { id: 'ag_02', time: '17:00', title: 'Discount approval · Fieldwork', with: 'Elena Poluru', type: 'Task' },
  { id: 'ag_03', time: 'Tomorrow 10:00', title: 'Brightline technical demo', with: 'Kavya Poluru', type: 'Meeting' },
  { id: 'ag_04', time: 'Fri 14:30', title: 'Lumen HIPAA intro', with: 'Nikhil Poluru', type: 'Call' },
];

export const timelineItems = [
  { id: 'tl1', title: 'Meera Poluru opened the redline pack', description: 'Harbor legal review is moving again.', time: '2h ago' },
  { id: 'tl2', title: 'Hana Poluru scored 91 from partner', description: 'Fold Paper Co. is ready to convert.', time: '4h ago' },
  { id: 'tl3', title: 'Arjun Poluru stalled on Nimbus', description: 'No champion reply in 14 days.', time: 'Yesterday' },
  { id: 'tl4', title: 'Kite Studio closed won', description: 'Rohan Poluru booked kickoff for Monday.', time: '2 days ago' },
];

export const atRisk = [
  { id: 'risk1', label: 'Nimbus Retail · $96k', description: 'Champion quiet 14 days · Arjun Poluru' },
  { id: 'risk2', label: 'Oak & Pine · $64.5k', description: 'Stuck in Qualify · Sahana Poluru' },
  { id: 'risk3', label: 'Paperplane · $12.6k', description: 'No next meeting set · Maya Poluru' },
];

export const playbooks = [
  {
    id: 'pb1',
    title: 'Harbor needs a working session today',
    content:
      'Meera Poluru has not opened the redline pack in 3 days. Book 15 minutes before 17:00 to keep $184k in commit.',
  },
  {
    id: 'pb2',
    title: 'Hana Poluru is ready to convert',
    content:
      'Fold Paper Co. scored 91 from partner. Convert now and Priya Poluru stays owner on discovery.',
  },
  {
    id: 'pb3',
    title: 'Lift Nimbus with a mutual action plan',
    content:
      'Arjun Poluru should send a one-page MAP. Without a next meeting, $96k slips out of Q3.',
  },
];

export const notifications = [
  { id: 'n1', title: 'Meera Poluru replied', body: 'Harbor redlines are 80% done.', time: '12m' },
  { id: 'n2', title: 'Quota pulse', body: 'Team is 78% to $1.20M for Q3.', time: '1h' },
  { id: 'n3', title: 'At-risk deal', body: 'Nimbus has no activity in 14 days.', time: '3h' },
];

export const commands = [
  { id: 'overview', label: 'Go to overview', href: '#/overview' },
  { id: 'pipeline', label: 'Open pipeline board', href: '#/pipeline' },
  { id: 'deals', label: 'Search deals', href: '#/deals' },
  { id: 'leads', label: 'Review new leads', href: '#/leads' },
  { id: 'accounts', label: 'Browse accounts', href: '#/accounts' },
  { id: 'activities', label: 'Today’s agenda', href: '#/activities' },
  { id: 'reports', label: 'Forecast report', href: '#/reports' },
  { id: 'harbor', label: 'Harbor platform expansion', href: '#/deal/deal_harbor' },
  { id: 'nimbus', label: 'Nimbus omnichannel suite', href: '#/deal/deal_nimbus' },
];

export const accounts = [
  {
    id: 'acc_harbor',
    name: 'Harbor & Co.',
    industry: 'Logistics',
    region: 'EMEA',
    owner: 'Priya Poluru',
    employees: '2,400',
    arr: '$312k',
    health: 'Expanding',
    next: 'QBR · 2 Sep',
  },
  {
    id: 'acc_nimbus',
    name: 'Nimbus Retail',
    industry: 'Retail',
    region: 'Americas',
    owner: 'Arjun Poluru',
    employees: '860',
    arr: '$126k',
    health: 'At risk',
    next: 'Renewal · 1 Sep',
  },
  {
    id: 'acc_bright',
    name: 'Brightline Labs',
    industry: 'SaaS',
    region: 'Americas',
    owner: 'Maya Poluru',
    employees: '210',
    arr: '$48k',
    health: 'Healthy',
    next: 'Demo · 27 Aug',
  },
  {
    id: 'acc_lumen',
    name: 'Lumen Health',
    industry: 'Healthcare',
    region: 'Americas',
    owner: 'Jordan Poluru',
    employees: '1,120',
    arr: '$249k',
    health: 'Expanding',
    next: 'Security review',
  },
  {
    id: 'acc_oak',
    name: 'Oak & Pine',
    industry: 'CPG',
    region: 'Americas',
    owner: 'Sahana Poluru',
    employees: '540',
    arr: '$92k',
    health: 'Healthy',
    next: 'Pilot wrap · 4 Sep',
  },
  {
    id: 'acc_fold',
    name: 'Fold Paper Co.',
    industry: 'Packaging',
    region: 'Americas',
    owner: 'Priya Poluru',
    employees: '180',
    arr: '$0',
    health: 'New',
    next: 'Convert lead',
  },
  {
    id: 'acc_kite',
    name: 'Kite Studio',
    industry: 'Media',
    region: 'APAC',
    owner: 'Rohan Poluru',
    employees: '48',
    arr: '$6k',
    health: 'New',
    next: 'Kickoff',
  },
  {
    id: 'acc_field',
    name: 'Fieldwork Inc',
    industry: 'Analytics',
    region: 'Americas',
    owner: 'Priya Poluru',
    employees: '320',
    arr: '$42k',
    health: 'Healthy',
    next: 'Discount approval',
  },
];

export const accountTree = [
  {
    id: 'acc_harbor',
    label: 'Harbor & Co.',
    children: [
      { id: 'acc_harbor_eu', label: 'Harbor EU · Meera Poluru' },
      { id: 'acc_harbor_uk', label: 'Harbor UK legal' },
    ],
  },
  {
    id: 'acc_nimbus',
    label: 'Nimbus Retail',
    children: [{ id: 'acc_nimbus_west', label: 'West stores · Arjun Poluru' }],
  },
  { id: 'acc_bright', label: 'Brightline Labs' },
  { id: 'acc_lumen', label: 'Lumen Health' },
  { id: 'acc_oak', label: 'Oak & Pine' },
];

export const contacts = [
  {
    id: 'con_meera',
    name: 'Meera Poluru',
    title: 'VP Operations',
    account: 'Harbor & Co.',
    accountId: 'acc_harbor',
    email: 'meera.poluru@harborco.example',
    influence: 'Champion',
    last: 'Yesterday',
  },
  {
    id: 'con_arjun',
    name: 'Arjun Poluru',
    title: 'Head of Retail Systems',
    account: 'Nimbus Retail',
    accountId: 'acc_nimbus',
    email: 'arjun.poluru@nimbus.example',
    influence: 'Decision maker',
    last: '3 days ago',
  },
  {
    id: 'con_kavya',
    name: 'Kavya Poluru',
    title: 'Director of Product',
    account: 'Brightline Labs',
    accountId: 'acc_bright',
    email: 'kavya.poluru@brightline.example',
    influence: 'Champion',
    last: 'Today',
  },
  {
    id: 'con_nikhil',
    name: 'Nikhil Poluru',
    title: 'CIO',
    account: 'Lumen Health',
    accountId: 'acc_lumen',
    email: 'nikhil.poluru@lumenhealth.example',
    influence: 'Economic buyer',
    last: '5 days ago',
  },
  {
    id: 'con_sahana',
    name: 'Sahana Poluru',
    title: 'Procurement lead',
    account: 'Oak & Pine',
    accountId: 'acc_oak',
    email: 'sahana.poluru@oakpine.example',
    influence: 'Influencer',
    last: '1 week ago',
  },
  {
    id: 'con_rohan',
    name: 'Rohan Poluru',
    title: 'Founder',
    account: 'Kite Studio',
    accountId: 'acc_kite',
    email: 'rohan.poluru@kitestudio.example',
    influence: 'Decision maker',
    last: '2 hours ago',
  },
  {
    id: 'con_luca',
    name: 'Luca Poluru',
    title: 'Security architect',
    account: 'Lumen Health',
    accountId: 'acc_lumen',
    email: 'luca.poluru@lumenhealth.example',
    influence: 'Influencer',
    last: 'Today',
  },
  {
    id: 'con_noor',
    name: 'Noor Poluru',
    title: 'Finance partner',
    account: 'Fieldwork Inc',
    accountId: 'acc_field',
    email: 'noor.poluru@fieldwork.example',
    influence: 'Approver',
    last: 'Today',
  },
];

export const deals = [
  {
    id: 'deal_harbor',
    name: 'Harbor platform expansion',
    account: 'Harbor & Co.',
    accountId: 'acc_harbor',
    value: '$184,000',
    amount: 184000,
    stage: 'Negotiation',
    probability: 70,
    health: 86,
    owner: 'Priya Poluru',
    close: '2026-09-12',
    source: 'Expansion',
    next: 'Legal redlines',
    contact: 'Meera Poluru',
  },
  {
    id: 'deal_nimbus',
    name: 'Nimbus omnichannel suite',
    account: 'Nimbus Retail',
    accountId: 'acc_nimbus',
    value: '$96,000',
    amount: 96000,
    stage: 'Proposal',
    probability: 45,
    health: 42,
    owner: 'Arjun Poluru',
    close: '2026-09-28',
    source: 'Inbound',
    next: 'Security questionnaire',
    contact: 'Arjun Poluru',
  },
  {
    id: 'deal_bright',
    name: 'Brightline Growth plan',
    account: 'Brightline Labs',
    accountId: 'acc_bright',
    value: '$28,800',
    amount: 28800,
    stage: 'Discovery',
    probability: 30,
    health: 68,
    owner: 'Maya Poluru',
    close: '2026-10-08',
    source: 'Webinar',
    next: 'Technical demo',
    contact: 'Kavya Poluru',
  },
  {
    id: 'deal_lumen',
    name: 'Lumen EHR integration',
    account: 'Lumen Health',
    accountId: 'acc_lumen',
    value: '$240,000',
    amount: 240000,
    stage: 'Proposal',
    probability: 55,
    health: 74,
    owner: 'Jordan Poluru',
    close: '2026-10-21',
    source: 'Partner',
    next: 'HIPAA review',
    contact: 'Nikhil Poluru',
  },
  {
    id: 'deal_oak',
    name: 'Oak & Pine field sales',
    account: 'Oak & Pine',
    accountId: 'acc_oak',
    value: '$64,500',
    amount: 64500,
    stage: 'Qualify',
    probability: 20,
    health: 38,
    owner: 'Sahana Poluru',
    close: '2026-11-04',
    source: 'Outbound',
    next: 'Needs analysis',
    contact: 'Sahana Poluru',
  },
  {
    id: 'deal_kite',
    name: 'Kite Studio starter',
    account: 'Kite Studio',
    accountId: 'acc_kite',
    value: '$8,400',
    amount: 8400,
    stage: 'Closed won',
    probability: 100,
    health: 96,
    owner: 'Rohan Poluru',
    close: '2026-08-18',
    source: 'Self-serve',
    next: 'Kickoff booked',
    contact: 'Rohan Poluru',
  },
  {
    id: 'deal_field',
    name: 'Fieldwork analytics pack',
    account: 'Fieldwork Inc',
    accountId: 'acc_field',
    value: '$42,000',
    amount: 42000,
    stage: 'Negotiation',
    probability: 65,
    health: 81,
    owner: 'Priya Poluru',
    close: '2026-09-04',
    source: 'Referral',
    next: 'Discount approval',
    contact: 'Noor Poluru',
  },
  {
    id: 'deal_paper',
    name: 'Paperplane collaboration',
    account: 'Paperplane',
    accountId: 'acc_paper',
    value: '$12,600',
    amount: 12600,
    stage: 'Discovery',
    probability: 25,
    health: 44,
    owner: 'Maya Poluru',
    close: '2026-10-30',
    source: 'Event',
    next: 'Set next meeting',
    contact: 'Elena Poluru',
  },
];

export const leads = [
  {
    id: 'lead_hana',
    name: 'Hana Poluru',
    company: 'Fold Paper Co.',
    source: 'Partner',
    score: 91,
    status: 'Ready',
    owner: 'Priya Poluru',
  },
  {
    id: 'lead_luca',
    name: 'Luca Poluru',
    company: 'Northwind Clinics',
    source: 'Webinar',
    score: 74,
    status: 'Working',
    owner: 'Jordan Poluru',
  },
  {
    id: 'lead_noor',
    name: 'Noor Poluru',
    company: 'Atlas Freight',
    source: 'Outbound',
    score: 62,
    status: 'Working',
    owner: 'Arjun Poluru',
  },
  {
    id: 'lead_elena',
    name: 'Elena Poluru',
    company: 'Paperplane',
    source: 'Event',
    score: 48,
    status: 'New',
    owner: 'Maya Poluru',
  },
  {
    id: 'lead_aisha',
    name: 'Aisha Poluru',
    company: 'Harbor & Co.',
    source: 'Referral',
    score: 88,
    status: 'Ready',
    owner: 'Priya Poluru',
  },
];

export const sequenceSteps = [
  { id: 's1', label: 'Intro' },
  { id: 's2', label: 'Value' },
  { id: 's3', label: 'Proof' },
  { id: 's4', label: 'Ask' },
];

export const ownerOptions = [
  { value: 'priya', label: 'Priya Poluru' },
  { value: 'maya', label: 'Maya Poluru' },
  { value: 'arjun', label: 'Arjun Poluru' },
  { value: 'jordan', label: 'Jordan Poluru' },
  { value: 'sahana', label: 'Sahana Poluru' },
  { value: 'rohan', label: 'Rohan Poluru' },
];

export const accountOptions = accounts.map((item) => ({ value: item.id, label: item.name }));

export const stageOptions = stages.map((stage) => ({ value: stage, label: stage }));

export const sourceOptions = [
  { value: 'outbound', label: 'Outbound' },
  { value: 'inbound', label: 'Inbound' },
  { value: 'partner', label: 'Partner' },
  { value: 'event', label: 'Event' },
  { value: 'referral', label: 'Referral' },
];

export const timezoneOptions = [
  { value: 'america-chicago', label: 'America/Chicago' },
  { value: 'america-new_york', label: 'America/New_York' },
  { value: 'europe-london', label: 'Europe/London' },
  { value: 'asia-kolkata', label: 'Asia/Kolkata' },
];

export const webhookSnippet = `POST https://api.poluru.cloud/v1/bloom/deals
Authorization: Bearer bloom_live_priya
{
  "account": "Harbor & Co.",
  "owner": "Priya Poluru",
  "amount": 184000
}`;

export const dealColumns = [
  { key: 'name', label: 'Deal' },
  { key: 'account', label: 'Account' },
  { key: 'value', label: 'Value' },
  { key: 'stage', label: 'Stage' },
  { key: 'owner', label: 'Owner' },
  { key: 'close', label: 'Close' },
];

export const leadColumns = [
  { key: 'name', label: 'Lead' },
  { key: 'company', label: 'Company' },
  { key: 'source', label: 'Source' },
  { key: 'score', label: 'Score' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
];

export const reportRows = teamBoard.map((row) => ({
  name: row.name,
  closed: row.closed,
  pipeline: row.pipeline,
  quota: `${row.quota}%`,
  trend: row.trend,
}));

export const reportColumns = [
  { key: 'name', label: 'Rep' },
  { key: 'closed', label: 'Closed' },
  { key: 'pipeline', label: 'Pipeline' },
  { key: 'quota', label: 'Quota' },
  { key: 'trend', label: 'Trend' },
];

export function sparkPoints(values, width = 220, height = 56) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');
}

export function stageTone(stage) {
  if (stage === 'Closed won') return 'success';
  if (stage === 'Negotiation') return 'brand';
  if (stage === 'Proposal') return 'info';
  if (stage === 'Discovery') return 'warning';
  return 'neutral';
}

export function healthTone(health) {
  if (health === 'Expanding' || health === 'Healthy') return 'success';
  if (health === 'At risk') return 'danger';
  return 'info';
}

export function findDeal(id) {
  return deals.find((item) => item.id === id) || deals[0];
}

export function findAccount(id) {
  return accounts.find((item) => item.id === id) || accounts[0];
}

export const accountColumns = [
  { key: 'name', label: 'Account' },
  { key: 'industry', label: 'Industry' },
  { key: 'region', label: 'Region' },
  { key: 'owner', label: 'Owner' },
  { key: 'arr', label: 'ARR' },
  { key: 'health', label: 'Health' },
  { key: 'next', label: 'Next step' },
];

// Live search across deals, leads, accounts, and contacts for the command palette.
export function searchAll(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  deals.forEach((item) => {
    if (`${item.name} ${item.account} ${item.owner}`.toLowerCase().includes(q)) {
      results.push({ id: `deal-${item.id}`, label: `Deal · ${item.name}`, href: `#/deal/${item.id}` });
    }
  });
  leads.forEach((item) => {
    if (`${item.name} ${item.company} ${item.owner}`.toLowerCase().includes(q)) {
      results.push({ id: `lead-${item.id}`, label: `Lead · ${item.name} (${item.company})`, href: '#/leads' });
    }
  });
  accounts.forEach((item) => {
    if (`${item.name} ${item.owner} ${item.industry}`.toLowerCase().includes(q)) {
      results.push({ id: `account-${item.id}`, label: `Account · ${item.name}`, href: `#/account/${item.id}` });
    }
  });
  contacts.forEach((item) => {
    if (`${item.name} ${item.account} ${item.title}`.toLowerCase().includes(q)) {
      results.push({ id: `contact-${item.id}`, label: `Contact · ${item.name} (${item.account})`, href: `#/account/${item.accountId}` });
    }
  });
  return results.slice(0, 8);
}
