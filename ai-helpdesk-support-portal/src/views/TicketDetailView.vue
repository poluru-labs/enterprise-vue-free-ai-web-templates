<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Select, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { formatDateTime, formatDuration } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useHelpdesk();
const draft = ref('');
const macroId = ref('');

const ticket = computed(() => store.getTicket(route.params.id));
const macros = computed(() => store.state.macros);
const macroOptions = computed(() => [
  { value: '', label: 'Insert a macro' },
  ...macros.value.map((item) => ({ value: item.id, label: item.name })),
]);

watch(
  () => route.params.id,
  () => {
    draft.value = '';
    macroId.value = '';
  },
);

if (!ticket.value) {
  router.replace(`${BASE_PATH}/tickets`);
}

function sendReply() {
  if (!ticket.value) return;
  const message = store.addReply(ticket.value.id, draft.value);
  if (!message) {
    showToast({ title: 'Write a reply first', variant: 'warning' });
    return;
  }
  draft.value = '';
  showToast({ title: 'Reply sent', description: `${ticket.value.id} is now waiting.`, variant: 'success' });
}

function applyMacro(id) {
  if (!id || !ticket.value) return;
  store.applyMacro(ticket.value.id, id);
  const macro = macros.value.find((item) => item.id === id);
  draft.value = '';
  showToast({ title: 'Macro applied', description: macro?.name, variant: 'success' });
  macroId.value = '';
}

function draftWithAi() {
  if (!ticket.value) return;
  draft.value = `Hi ${ticket.value.customer.split(' ')[0]} — I have ${ticket.value.id} on ${ticket.value.subject.toLowerCase()}. I will confirm the next step inside the first-response window and follow up here.`;
  showToast({
    title: 'AI draft ready',
    description: 'Review the suggested reply before sending.',
    variant: 'info',
  });
}

function takeTicket() {
  if (!ticket.value) return;
  store.assignTicket(ticket.value.id, SIGNED_IN_USER);
  showToast({
    title: 'Assigned to Meera Poluru',
    description: ticket.value.id,
    variant: 'success',
  });
}
</script>

<template>
  <div v-if="ticket" class="lumen-page">
    <PageHeader
      :title="ticket.subject"
      :description="`${ticket.id} · ${ticket.customer} · ${ticket.queue}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Tickets', to: `${BASE_PATH}/tickets` }, { label: ticket.id }]"
    >
      <template #actions>
        <Button v-if="ticket.unassigned || !ticket.assignee" size="sm" icon="user" @click="takeTicket">
          Assign to me
        </Button>
        <Button variant="secondary" size="sm" @click="draftWithAi">AI draft</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Status" :value="ticket.status" :hint="ticket.priority" icon="bi-ticket-perforated" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="SLA" :value="ticket.sla" :hint="`${formatDuration(ticket.slaMinutes)} remaining`" icon="bi-hourglass-split" :tone="ticket.sla === 'breached' ? 'danger' : 'warning'" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Assignee" :value="ticket.assignee || 'Unassigned'" :hint="ticket.channel" icon="bi-headset" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="First response" :value="formatDuration(ticket.firstResponseMin)" hint="From open" icon="bi-stopwatch" tone="success" />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-8">
        <ChartSection title="Conversation" :subtitle="`${ticket.messages.length} messages`">
          <ol class="lumen-thread">
            <li v-for="message in ticket.messages" :key="message.id" :class="`from-${message.from}`">
              <header>
                <strong>{{ message.author }}</strong>
                <span>{{ formatDateTime(message.time) }}</span>
              </header>
              <p>{{ message.body }}</p>
            </li>
          </ol>
          <div class="lumen-composer">
            <Select v-model="macroId" label="Macro" :options="macroOptions" @update:model-value="applyMacro" />
            <label class="lumen-composer-field">
              Reply as {{ SIGNED_IN_USER.name }}
              <textarea v-model="draft" rows="4" placeholder="Write a reply or generate an AI draft." />
            </label>
            <div class="lumen-page-actions">
              <Button variant="secondary" size="sm" @click="draftWithAi">AI draft</Button>
              <Button size="sm" icon="send" @click="sendReply">Send reply</Button>
            </div>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Properties" :subtitle="ticket.email">
          <dl class="lumen-settings-list">
            <div>
              <dt>Customer</dt>
              <dd>{{ ticket.customer }}</dd>
            </div>
            <div>
              <dt>Queue</dt>
              <dd>{{ ticket.queue }}</dd>
            </div>
            <div>
              <dt>Channel</dt>
              <dd>{{ ticket.channel }}</dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd><StatusBadge :status="ticket.priority" /></dd>
            </div>
            <div>
              <dt>SLA</dt>
              <dd><StatusBadge :status="ticket.sla" /></dd>
            </div>
            <div>
              <dt>Tags</dt>
              <dd>{{ ticket.tags.join(', ') }}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{{ formatDateTime(ticket.updated) }}</dd>
            </div>
          </dl>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
