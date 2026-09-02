import { computed, reactive } from 'vue';
import { BASE_PATH, COMMAND_PAGES, PIPELINE_PILLS, SIGNED_IN_USER } from '../constants/navigation.js';
import accountsData from '../data/accounts.json';
import activitiesData from '../data/activities.json';
import contactsData from '../data/contacts.json';
import dealsData from '../data/deals.json';
import leadsData from '../data/leads.json';
import notificationsData from '../data/notifications.json';
import { formatCurrency } from '../utils/format.js';
import { matchesQuery, searchRecords } from '../utils/search.js';

const ownerDirectory = {
  priya: 'Priya Poluru',
  maya: 'Maya Poluru',
  arjun: 'Arjun Poluru',
  jordan: 'Jordan Poluru',
  sahana: 'Sahana Poluru',
  rohan: 'Rohan Poluru',
};

export const STAGES = ['Qualify', 'Discovery', 'Proposal', 'Negotiation', 'Closed won'];

export const ownerOptions = Object.entries(ownerDirectory).map(([value, label]) => ({ value, label }));
export const sourceOptions = [
  { value: 'outbound', label: 'Outbound' },
  { value: 'inbound', label: 'Inbound' },
  { value: 'partner', label: 'Partner' },
  { value: 'event', label: 'Event' },
  { value: 'referral', label: 'Referral' },
];
export const stageOptions = STAGES.map((stage) => ({ value: stage, label: stage }));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function ownerLabel(value) {
  return ownerDirectory[value] || value || SIGNED_IN_USER.name;
}

export const crm = reactive({
  deals: clone(dealsData),
  leads: clone(leadsData),
  accounts: clone(accountsData.items),
  accountTree: clone(accountsData.tree),
  contacts: clone(contactsData),
  agenda: clone(activitiesData.agenda),
  notifications: clone(notificationsData.items).map((item) => ({ ...item, read: false })),
  commandOpen: false,
  dealOpen: false,
  activityOpen: false,
  leadOpen: false,
  query: '',
  selectedLead: 'lead_hana',
});

export const accountOptions = computed(() => crm.accounts.map((item) => ({ value: item.id, label: item.name })));

export const unreadCount = computed(() => crm.notifications.filter((item) => !item.read).length);

export const pipelinePills = computed(() =>
  PIPELINE_PILLS.map((pill) => ({
    ...pill,
    count: crm.deals.filter((deal) => pill.stages.includes(deal.stage)).length,
  })),
);

export function findDeal(id) {
  return crm.deals.find((item) => item.id === id) || crm.deals[0];
}

export function findAccount(id) {
  return crm.accounts.find((item) => item.id === id) || crm.accounts[0];
}

export function markAllNotificationsRead() {
  crm.notifications.forEach((item) => {
    item.read = true;
  });
}

export function openDealModal() {
  crm.dealOpen = true;
}

export function openActivityDrawer() {
  crm.activityOpen = true;
}

export function openLeadDrawer(leadId) {
  if (leadId) crm.selectedLead = leadId;
  crm.leadOpen = true;
}

export function createDeal({ name, accountId, owner, stage, amount, source }) {
  const account = crm.accounts.find((item) => item.id === accountId);
  const deal = {
    id: `deal_${Date.now()}`,
    name: name.trim(),
    account: account?.name || 'New account',
    accountId: accountId || account?.id || 'acc_harbor',
    value: formatCurrency(amount),
    amount: Number(amount) || 0,
    stage: stage || 'Qualify',
    probability: stage === 'Negotiation' ? 65 : stage === 'Proposal' ? 45 : 20,
    health: 70,
    owner: ownerLabel(owner),
    close: '2026-10-15',
    source: sourceOptions.find((item) => item.value === source)?.label || 'Inbound',
    next: 'Discovery call',
    contact: SIGNED_IN_USER.name,
    timeline: [],
  };
  crm.deals.unshift(deal);
  crm.dealOpen = false;
  return deal;
}

export function convertLead(leadId, owner) {
  const lead = crm.leads.find((item) => item.id === leadId);
  if (!lead) return null;
  lead.status = 'Converted';
  const account = crm.accounts.find((item) => item.name === lead.company);
  const deal = createDeal({
    name: `${lead.company} discovery`,
    accountId: account?.id,
    owner,
    stage: 'Qualify',
    amount: 28000,
    source: lead.source.toLowerCase(),
  });
  crm.leadOpen = false;
  return { lead, deal };
}

export function logActivity({ type, date, time, notes }) {
  crm.agenda.unshift({
    id: `ag_${Date.now()}`,
    time: time || 'Now',
    title: notes?.trim() || `${type || 'Call'} logged`,
    with: SIGNED_IN_USER.name,
    type: type || 'Call',
  });
  crm.activityOpen = false;
  return { type, date, time, notes };
}

export function addDealNote(dealId, note) {
  const deal = findDeal(dealId);
  if (!deal) return null;
  if (!deal.timeline) deal.timeline = [];
  const entry = {
    id: `note-${Date.now()}`,
    title: `${deal.owner} added a note`,
    description: note,
    time: 'Just now',
  };
  deal.timeline.unshift(entry);
  return entry;
}

export function searchWorkspace(query) {
  const q = String(query || '').trim();
  if (!q) return COMMAND_PAGES;
  const results = [];
  searchRecords(crm.deals, q, ['name', 'account', 'owner', 'stage']).forEach((item) => {
    results.push({
      id: `deal-${item.id}`,
      label: `Deal · ${item.name}`,
      hint: `${item.account} · ${item.value}`,
      to: `${BASE_PATH}/deals/${item.id}`,
      group: 'Deals',
    });
  });
  searchRecords(crm.leads, q, ['name', 'company', 'owner']).forEach((item) => {
    results.push({
      id: `lead-${item.id}`,
      label: `Lead · ${item.name} (${item.company})`,
      hint: `${item.status} · ${item.score}`,
      to: `${BASE_PATH}/leads`,
      group: 'Leads',
    });
  });
  searchRecords(crm.accounts, q, ['name', 'owner', 'industry']).forEach((item) => {
    results.push({
      id: `account-${item.id}`,
      label: `Account · ${item.name}`,
      hint: `${item.industry} · ${item.health}`,
      to: `${BASE_PATH}/accounts/${item.id}`,
      group: 'Accounts',
    });
  });
  searchRecords(crm.contacts, q, ['name', 'account', 'title']).forEach((item) => {
    results.push({
      id: `contact-${item.id}`,
      label: `Contact · ${item.name} (${item.account})`,
      hint: item.title,
      to: `${BASE_PATH}/accounts/${item.accountId}`,
      group: 'Contacts',
    });
  });
  COMMAND_PAGES.filter((item) => matchesQuery(`${item.label} ${item.hint}`, q)).forEach((item) => {
    results.push(item);
  });
  return results.slice(0, 10);
}

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

export const accountColumns = [
  { key: 'name', label: 'Account' },
  { key: 'industry', label: 'Industry' },
  { key: 'region', label: 'Region' },
  { key: 'owner', label: 'Owner' },
  { key: 'arr', label: 'ARR' },
  { key: 'health', label: 'Health' },
  { key: 'next', label: 'Next step' },
];
