import { computed, reactive } from 'vue';
import ticketsSeed from '../data/tickets.json';
import customersSeed from '../data/customers.json';
import macrosSeed from '../data/macros.json';
import slaSeed from '../data/sla.json';
import agentsSeed from '../data/agents.json';
import knowledgeSeed from '../data/knowledge.json';
import settingsSeed from '../data/settings.json';
import overviewSeed from '../data/overview.json';
import { BASE_PATH, SIGNED_IN_USER } from '../constants/navigation.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const state = reactive({
  tickets: clone(ticketsSeed),
  customers: clone(customersSeed),
  macros: clone(macrosSeed),
  sla: clone(slaSeed),
  agents: clone(agentsSeed),
  knowledge: clone(knowledgeSeed),
  settings: clone(settingsSeed.workspace),
  headerCounts: clone(overviewSeed.headerCounts),
});

function ticketSort(a, b) {
  return new Date(a.created) - new Date(b.created);
}

const getters = {
  tickets: computed(() => state.tickets),
  customers: computed(() => state.customers),
  macros: computed(() => state.macros),
  sla: computed(() => state.sla),
  agents: computed(() => state.agents),
  knowledge: computed(() => state.knowledge),
  settings: computed(() => state.settings),
  headerCounts: computed(() => state.headerCounts),
  unassigned: computed(() =>
    state.tickets.filter((ticket) => ticket.unassigned || !ticket.assignee).sort(ticketSort),
  ),
  openTickets: computed(() => state.tickets.filter((ticket) => ticket.status === 'open')),
  waitingTickets: computed(() => state.tickets.filter((ticket) => ticket.status === 'waiting')),
  breachedTickets: computed(() => state.tickets.filter((ticket) => ticket.sla === 'breached')),
};

const actions = {
  getTicket(id) {
    return state.tickets.find((ticket) => ticket.id === id) || null;
  },
  ticketsForCustomer(customerId) {
    return state.tickets.filter((ticket) => ticket.customerId === customerId);
  },
  assignTicket(id, agent = SIGNED_IN_USER) {
    const ticket = state.tickets.find((item) => item.id === id);
    if (!ticket) return null;
    ticket.assignee = agent.name;
    ticket.assigneeId = agent.id;
    ticket.unassigned = false;
    ticket.updated = new Date().toISOString();
    return ticket;
  },
  assignNext(agent = SIGNED_IN_USER) {
    const next = getters.unassigned.value[0];
    if (!next) return null;
    return actions.assignTicket(next.id, agent);
  },
  addReply(ticketId, body, author = SIGNED_IN_USER.name) {
    const ticket = state.tickets.find((item) => item.id === ticketId);
    if (!ticket || !String(body || '').trim()) return null;
    const message = {
      id: `m-${Date.now()}`,
      from: 'agent',
      author,
      body: String(body).trim(),
      time: new Date().toISOString(),
    };
    ticket.messages.push(message);
    ticket.updated = message.time;
    if (ticket.status === 'open') ticket.status = 'waiting';
    return message;
  },
  applyMacro(ticketId, macroId) {
    const macro = state.macros.find((item) => item.id === macroId);
    if (!macro) return null;
    macro.uses += 1;
    return actions.addReply(ticketId, macro.body);
  },
  updateTicket(id, updates) {
    const ticket = state.tickets.find((item) => item.id === id);
    if (!ticket) return null;
    Object.assign(ticket, updates, { updated: new Date().toISOString() });
    return ticket;
  },
  updateSettings(updates) {
    Object.assign(state.settings, updates);
  },
  ticketHref(id) {
    return `${BASE_PATH}/tickets/${id}`;
  },
};

export function useHelpdesk() {
  return { state, ...getters, ...actions };
}

export function useStore() {
  return useHelpdesk();
}
