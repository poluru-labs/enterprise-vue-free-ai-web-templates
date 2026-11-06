<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  DataTable,
  DescriptionList,
  Drawer,
  EmptyState,
  Kbd,
  Modal,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Spinner,
  Status,
  Stepper,
  Tag,
  Textarea,
  Timeline,
  Toolbar,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '@/constants/navigation'
import { REVIEWER, desk, money, type Claim, type ClaimStatus } from '@/data/claims'

const query = ref('')
const category = ref('all')
const refreshing = ref(false)
const noteOpen = ref(false)

function refresh() {
  refreshing.value = true
  window.setTimeout(() => {
    refreshing.value = false
  }, 450)
}
const drawerOpen = ref(false)
const modalOpen = ref(false)
const decision = ref<'Approved' | 'Sent back'>('Approved')
const note = ref('')
const activeId = ref('')

const waiting = computed(() =>
  desk.claims.filter((claim) => claim.reviewer === REVIEWER && claim.status === 'Waiting'),
)

const visible = computed(() =>
  waiting.value.filter((claim) => {
    const haystack = `${claim.title} ${claim.owner} ${claim.vendor} ${claim.number}`.toLowerCase()
    const matchesQuery = haystack.includes(query.value.trim().toLowerCase())
    const matchesCategory = category.value === 'all' || claim.category === category.value
    return matchesQuery && matchesCategory
  }),
)

const overLine = computed(() => waiting.value.filter((claim) => claim.amount > desk.threshold))
const active = computed(() => desk.claims.find((claim) => claim.id === activeId.value))

const facts = computed(() => {
  const claim = active.value
  if (!claim) return []
  return [
    { term: 'Number', description: claim.number },
    { term: 'From', description: claim.owner },
    { term: 'Vendor', description: claim.vendor },
    { term: 'Category', description: claim.category },
    { term: 'Submitted', description: claim.submitted },
    { term: 'Amount', description: money(claim.amount) },
  ]
})

const lineRows = computed(() =>
  (active.value?.lines ?? []).map((line) => ({
    item: line.label,
    amount: money(line.amount),
  })),
)

const timeline = computed(() => {
  const claim = active.value
  if (!claim) return []
  return [
    { id: 'submitted', title: 'Submitted', description: claim.owner, time: claim.submitted },
    { id: 'review', title: 'With reviewer', description: SIGNED_IN_USER.name, time: 'Now' },
  ]
})

function tone(status: ClaimStatus): 'warning' | 'success' | 'neutral' {
  if (status === 'Waiting') return 'warning'
  if (status === 'Approved') return 'success'
  return 'neutral'
}

function openClaim(claim: Claim) {
  activeId.value = claim.id
  note.value = ''
  drawerOpen.value = true
}

function ask(next: 'Approved' | 'Sent back') {
  decision.value = next
  modalOpen.value = true
}

function applyDecision() {
  const claim = desk.claims.find((item) => item.id === activeId.value)
  if (!claim) return
  claim.status = decision.value
  if (note.value.trim()) claim.notes = note.value.trim()
  modalOpen.value = false
  drawerOpen.value = false
  showToast({
    title: decision.value === 'Approved' ? 'Claim approved' : 'Claim sent back',
    description: `${claim.number} · ${claim.owner} · ${money(claim.amount)}`,
    variant: decision.value === 'Approved' ? 'success' : 'warning',
  })
}
</script>

<template>
  <PageHead
    title="Inbox"
    lede="Claims waiting on Farah Poluru."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Inbox' }]"
  >
    <template #actions>
      <Popover v-model:open="noteOpen" heading="Approval line" placement="bottom">
        <template #trigger>
          <button type="button" class="cl-text-btn">Line {{ money(desk.threshold) }}</button>
        </template>
        <p class="cl-quiet">Claims above the line stay here until Farah Poluru decides.</p>
      </Popover>
      <Tooltip content="Reload the inbox">
        <Button size="sm" variant="secondary" :loading="refreshing" @click="refresh">Refresh</Button>
      </Tooltip>
      <Kbd :keys="['/']" />
    </template>
  </PageHead>

  <Alert
    v-if="overLine.length"
    class="cl-alert"
    variant="warning"
    title="Over the approval line"
    :message="`${overLine.length} waiting ${overLine.length === 1 ? 'claim is' : 'claims are'} above ${money(desk.threshold)}.`"
  />

  <Toolbar class="cl-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Search claims or people" clearable />
    </template>
    <template #end>
      <SegmentedControl
        v-model="category"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'Travel', label: 'Travel' },
          { value: 'Software', label: 'Software' },
          { value: 'Meals', label: 'Meals' },
        ]"
      />
    </template>
  </Toolbar>

  <div v-if="refreshing" class="cl-skeleton">
    <Spinner label="Refreshing inbox" show-label />
    <Skeleton variant="rectangular" width="100%" height="72px" />
    <Skeleton variant="rectangular" width="100%" height="72px" />
  </div>

  <EmptyState
    v-else-if="!visible.length"
    :title="waiting.length ? 'No claims match' : 'Inbox is clear'"
    :description="waiting.length ? 'Try another name, or clear the category.' : 'Nothing is waiting on Farah Poluru.'"
    icon="search"
  />

  <div v-else class="cl-list">
    <button v-for="claim in visible" :key="claim.id" type="button" class="cl-claim" @click="openClaim(claim)">
      <Avatar :name="claim.owner" size="md" />
      <span>
        <strong>{{ claim.title }}</strong>
        <span class="cl-meta">{{ claim.owner }} · {{ claim.vendor }}</span>
        <span class="cl-tags">
          <Tag :label="claim.category" />
          <Status :label="claim.status" :tone="tone(claim.status)" />
        </span>
      </span>
      <span class="cl-amount">{{ money(claim.amount) }}</span>
    </button>
  </div>

  <Drawer v-model:open="drawerOpen" :heading="active?.title || 'Claim'" size="md">
    <template v-if="active">
      <p class="cl-quiet">{{ active.number }} · {{ active.owner }}</p>
      <DescriptionList :items="facts" />
      <Card class="cl-receipt" title="Receipt" :description="active.receipt">
        <p class="cl-amount">{{ money(active.amount) }}</p>
        <Badge :label="active.category" variant="warning" soft />
        <p class="cl-quiet">{{ active.notes }}</p>
      </Card>
      <Accordion class="cl-section" :items="[{ id: 'note', title: 'Owner note', content: active.notes }]" />
      <h2 class="cl-section">Line items</h2>
      <DataTable compact :columns="[{ key: 'item', label: 'Item' }, { key: 'amount', label: 'Amount' }]" :rows="lineRows" />
      <h2 class="cl-section">Review</h2>
      <Stepper
        :steps="[
          { id: 'submitted', label: 'Submitted', description: active.owner },
          { id: 'review', label: 'In review', description: SIGNED_IN_USER.name },
          { id: 'decision', label: 'Decision', description: 'Approve or send back' },
        ]"
        :active-index="1"
      />
      <Timeline class="cl-timeline" :items="timeline" />
      <ButtonGroup class="cl-actions">
        <Button @click="ask('Approved')">Approve</Button>
        <Button variant="secondary" @click="ask('Sent back')">Send back</Button>
      </ButtonGroup>
    </template>
  </Drawer>

  <Modal
    :open="modalOpen"
    :heading="decision === 'Approved' ? 'Approve this claim?' : 'Send this claim back?'"
    @update:open="modalOpen = $event"
  >
    <p v-if="active" class="cl-quiet">{{ active.number }} · {{ money(active.amount) }} · {{ active.owner }}</p>
    <Textarea v-model="note" label="Note" placeholder="Optional note for the owner" />
    <template #footer>
      <Button variant="secondary" @click="modalOpen = false">Cancel</Button>
      <Button @click="applyDecision">{{ decision === 'Approved' ? 'Approve' : 'Send back' }}</Button>
    </template>
  </Modal>
</template>
