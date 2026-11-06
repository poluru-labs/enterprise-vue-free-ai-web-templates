<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Badge,
  Button,
  EmptyState,
  Kbd,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Stat,
  Status,
  Tag,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { ledger, type MatterStatus } from '@/data/ledger'

const router = useRouter()
const query = ref('')
const scope = ref('open')
const loading = ref(false)
const helpOpen = ref(false)

const openCount = computed(() => ledger.matters.filter((matter) => matter.status === 'Open').length)

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return ledger.matters.filter((matter) => {
    if (scope.value === 'open' && (matter.status === 'Signed' || matter.status === 'Closed')) return false
    if (!term) return true
    return (
      matter.number.toLowerCase().includes(term) ||
      matter.title.toLowerCase().includes(term) ||
      matter.party.toLowerCase().includes(term)
    )
  })
})

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}

function tone(status: MatterStatus) {
  if (status === 'Signed') return 'success' as const
  if (status === 'Waiting') return 'warning' as const
  if (status === 'Closed') return 'neutral' as const
  return 'info' as const
}

function openMatter(id: string) {
  router.push(`/briefwell/matters/${id}`)
}
</script>

<template>
  <PageHead title="Matters" lede="Open files on the desk." :crumbs="[BREADCRUMB_ROOT, { label: 'Matters' }]" />
  <Stat class="bw-block" label="Open files" :value="String(openCount)" hint="Waiting on a signature or a reply" />
  <Toolbar class="bw-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Find a matter" />
      <SegmentedControl
        v-model="scope"
        :segments="[
          { value: 'open', label: 'Open' },
          { value: 'all', label: 'All' },
        ]"
      />
    </template>
    <template #end>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Status" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About status</Button>
        </template>
        <p>Open is on the desk. Waiting means the other party has the page.</p>
      </Popover>
      <Tooltip content="Reload the ledger">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <div v-if="loading" class="bw-doc">
    <Skeleton variant="rectangular" width="100%" height="48px" />
    <Skeleton variant="rectangular" width="100%" height="48px" />
    <Skeleton variant="rectangular" width="100%" height="48px" />
  </div>
  <EmptyState
    v-else-if="visible.length === 0"
    title="No matters match"
    description="Try another number, or show every file."
    icon="search"
  />
  <div v-else class="bw-ledger">
    <div class="bw-ledger-head">
      <span>Matter</span>
      <span>Title</span>
      <span>Party</span>
      <span>Status</span>
      <span>Due</span>
    </div>
    <button
      v-for="matter in visible"
      :key="matter.id"
      type="button"
      class="bw-ledger-row"
      @click="openMatter(matter.id)"
    >
      <span class="bw-number">{{ matter.number }}</span>
      <span>
        {{ matter.title }}
        <Tag :label="matter.kind" />
      </span>
      <span>{{ matter.party }}</span>
      <Status :label="matter.status" :tone="tone(matter.status)" />
      <Badge :label="matter.due" variant="neutral" soft />
    </button>
  </div>
</template>
