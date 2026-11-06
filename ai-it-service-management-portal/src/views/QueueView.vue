<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Badge,
  Button,
  ButtonGroup,
  DescriptionList,
  EmptyState,
  Kbd,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Spinner,
  Stat,
  Status,
  Tag,
  Textarea,
  Timeline,
  Toolbar,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '@/constants/navigation'
import { desk, type TicketStatus } from '@/data/desk'
import { priorityTone, ticketTone } from '@/utils/status'

const query = ref('')
const filter = ref('open')
const selectedId = ref('tk-2411')
const reply = ref('')
const refreshing = ref(false)
const noteOpen = ref(false)

const openCount = computed(() => desk.tickets.filter((ticket) => ticket.status === 'Open').length)

const visible = computed(() =>
  desk.tickets.filter((ticket) => {
    const matchesQuery = `${ticket.number} ${ticket.title} ${ticket.requester} ${ticket.assignee}`
      .toLowerCase()
      .includes(query.value.trim().toLowerCase())
    const matchesFilter =
      filter.value === 'all' ||
      (filter.value === 'open' && ticket.status !== 'Closed') ||
      ticket.status === 'Waiting' && filter.value === 'waiting'
    return matchesQuery && matchesFilter
  }),
)

const selected = computed(() => desk.tickets.find((ticket) => ticket.id === selectedId.value) ?? visible.value[0] ?? null)

const facts = computed(() => {
  const ticket = selected.value
  if (!ticket) return []
  return [
    { term: 'Requester', description: ticket.requester },
    { term: 'Assignee', description: ticket.assignee },
    { term: 'Priority', description: ticket.priority },
    { term: 'Status', description: ticket.status },
    { term: 'Opened', description: ticket.opened },
  ]
})

const comments = computed(() =>
  (selected.value?.comments ?? []).map((comment) => ({
    id: comment.id,
    title: comment.author,
    description: comment.body,
    time: comment.time,
  })),
)

function sendReply() {
  const ticket = selected.value
  const body = reply.value.trim()
  if (!ticket || !body) return
  ticket.comments.push({
    id: `c-${Date.now()}`,
    author: SIGNED_IN_USER.name,
    body,
    time: 'Now',
  })
  reply.value = ''
  showToast({
    title: 'Reply sent',
    description: `${ticket.number} · ${ticket.requester}`,
    variant: 'success',
  })
}

function refresh() {
  refreshing.value = true
  window.setTimeout(() => {
    refreshing.value = false
  }, 450)
}

function setStatus(status: TicketStatus) {
  const ticket = selected.value
  if (!ticket) return
  ticket.status = status
  showToast({
    title: 'Ticket updated',
    description: `${ticket.number} is ${status}.`,
    variant: 'info',
  })
}
</script>

<template>
  <PageHead
    title="Queue"
    lede="Open tickets on the left. The selected ticket stays on the right."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Queue' }]"
  >
    <template #actions>
      <Popover v-model:open="noteOpen" heading="Open queue" placement="bottom">
        <template #trigger>
          <button type="button" class="dk-text-btn">What is open</button>
        </template>
        <p class="dk-quiet">Open keeps tickets that are not closed. Waiting is a subset.</p>
      </Popover>
      <Tooltip content="Reload the queue">
        <Button size="sm" variant="secondary" :loading="refreshing" @click="refresh">Refresh</Button>
      </Tooltip>
      <Kbd :keys="['/']" />
    </template>
  </PageHead>

  <div class="dk-stat">
    <Stat label="Open now" :value="String(openCount)" hint="Not closed" />
  </div>

  <Toolbar class="dk-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Search tickets or people" clearable />
    </template>
    <template #end>
      <SegmentedControl
        v-model="filter"
        :segments="[
          { value: 'open', label: 'Open' },
          { value: 'waiting', label: 'Waiting' },
          { value: 'all', label: 'All' },
        ]"
      />
    </template>
  </Toolbar>

  <div v-if="refreshing" class="dk-skeleton">
    <Spinner label="Refreshing the queue" show-label />
    <Skeleton variant="rectangular" width="100%" height="180px" />
  </div>

  <EmptyState
    v-else-if="!visible.length"
    :title="query.trim() ? 'No tickets match' : 'Queue is clear'"
    description="Nothing matches this filter."
    icon="search"
  />

  <div v-else class="dk-split">
    <div class="dk-table" role="table">
      <div class="dk-row dk-row-head" role="row">
        <span>Ticket</span>
        <span>Priority</span>
        <span>Assignee</span>
      </div>
      <button
        v-for="ticket in visible"
        :key="ticket.id"
        type="button"
        class="dk-row"
        :class="{ 'is-selected': ticket.id === selected?.id }"
        role="row"
        @click="selectedId = ticket.id"
      >
        <span>
          <strong>{{ ticket.title }}</strong>
          <span class="dk-meta">{{ ticket.number }} · {{ ticket.requester }}</span>
        </span>
        <Status :label="ticket.priority" :tone="priorityTone(ticket.priority)" />
        <span>{{ ticket.assignee.split(' ')[0] }}</span>
      </button>
    </div>

    <aside v-if="selected" class="dk-detail">
      <div class="dk-detail-title">
        <h2>{{ selected.title }}</h2>
        <Badge :label="selected.kind" variant="info" soft />
        <Tag :label="selected.number" />
        <Status :label="selected.status" :tone="ticketTone(selected.status)" />
      </div>
      <DescriptionList :items="facts" />
      <h3>Notes</h3>
      <Timeline :items="comments" />
      <form class="dk-reply" @submit.prevent="sendReply">
        <Textarea v-model="reply" label="Reply" placeholder="Short note for the requester" />
        <Button type="submit">Send reply</Button>
        <ButtonGroup>
          <Button variant="secondary" type="button" @click="setStatus('Waiting')">Mark waiting</Button>
          <Button variant="secondary" type="button" @click="setStatus('Closed')">Close</Button>
        </ButtonGroup>
      </form>
    </aside>
  </div>
</template>
