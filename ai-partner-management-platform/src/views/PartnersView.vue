<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Avatar,
  Badge,
  Button,
  Card,
  DescriptionList,
  Drawer,
  EmptyState,
  Kbd,
  List,
  Pagination,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Status,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, findPartner, openDealCount, type Tier } from '@/data/directory'

const router = useRouter()
const query = ref('')
const tier = ref('all')
const page = ref(1)
const pageSize = 6
const loading = ref(false)
const drawerOpen = ref(false)
const helpOpen = ref(false)
const selectedId = ref('pt-northwind')

const segments = [
  { value: 'all', label: 'All' },
  { value: 'Registered', label: 'Registered' },
  { value: 'Select', label: 'Select' },
  { value: 'Premier', label: 'Premier' },
]

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return desk.partners.filter((partner) => {
    const tierOk = tier.value === 'all' || partner.tier === tier.value
    const text = `${partner.firm} ${partner.lead} ${partner.region}`.toLowerCase()
    return tierOk && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(visible.value.length / pageSize)))

const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return visible.value.slice(start, start + pageSize)
})

const selected = computed(() => findPartner(selectedId.value))

watch([query, tier], () => {
  page.value = 1
})

function tierVariant(value: Tier) {
  if (value === 'Premier') return 'brand' as const
  if (value === 'Select') return 'info' as const
  return 'neutral' as const
}

function openPartner(id: string) {
  selectedId.value = id
  drawerOpen.value = true
}

function openProfile() {
  if (!selected.value) return
  drawerOpen.value = false
  router.push(`${BASE_PATH}/partners/${selected.value.id}`)
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}
</script>

<template>
  <PageHead
    title="Partners"
    lede="Firms on the alliance book."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Partners' }]"
  />
  <Toolbar class="ay-band">
    <template #start>
      <Search v-model="query" placeholder="Find a firm" />
      <SegmentedControl v-model="tier" :segments="segments" />
    </template>
    <template #end>
      <span class="ay-count">{{ visible.length }} firms</span>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Tiers" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About tiers</Button>
        </template>
        <p>Registered, Select, and Premier are the three desks. Premier keeps a named lead.</p>
      </Popover>
      <Tooltip content="Reload the directory">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>

  <div v-if="loading" class="ay-directory">
    <Skeleton v-for="n in 4" :key="n" variant="rectangular" width="100%" height="84px" />
  </div>
  <EmptyState
    v-else-if="visible.length === 0"
    title="No partners match"
    description="Try another firm, or show every tier."
    icon="search"
  />
  <div v-else class="ay-directory">
    <Card
      v-for="partner in paged"
      :key="partner.id"
      class="ay-strip"
      :class="{ 'is-open': drawerOpen && selectedId === partner.id }"
    >
      <button type="button" class="ay-strip-btn" @click="openPartner(partner.id)">
        <Avatar :name="partner.lead" size="lg" />
        <span>
          <strong class="ay-firm">{{ partner.firm }}</strong>
          <span class="ay-meta">{{ partner.lead }} · {{ partner.region }}</span>
        </span>
        <Badge :label="partner.tier" :variant="tierVariant(partner.tier)" soft />
        <Status
          :label="openDealCount(partner.id) ? `${openDealCount(partner.id)} open` : 'Quiet'"
          :tone="openDealCount(partner.id) ? 'info' : 'neutral'"
        />
      </button>
    </Card>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="ay-pages" />
  </div>

  <Drawer v-model:open="drawerOpen" :heading="selected?.firm ?? 'Partner'" size="md">
    <template v-if="selected">
      <DescriptionList
        :items="[
          { term: 'Lead', description: selected.lead },
          { term: 'Region', description: selected.region },
          { term: 'Since', description: selected.since },
          { term: 'Phone', description: selected.phone },
          { term: 'Open deals', description: String(openDealCount(selected.id)) },
        ]"
      />
      <h2 class="ay-subhead">Desk</h2>
      <List
        :items="[{ id: selected.id, label: selected.lead, description: selected.email }]"
      />
    </template>
    <template #footer>
      <div class="ay-drawer-actions">
        <Button type="button" @click="openProfile">Open profile</Button>
      </div>
    </template>
  </Drawer>
</template>
