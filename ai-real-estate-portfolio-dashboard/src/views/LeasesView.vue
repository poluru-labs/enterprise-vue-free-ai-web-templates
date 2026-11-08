<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Autocomplete,
  Button,
  DatePicker,
  DateRangePicker,
  DescriptionList,
  Drawer,
  EmptyState,
  Kbd,
  Pagination,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Toolbar,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, CITIES, PEOPLE } from '@/constants/navigation'
import { book, money, propertyName } from '@/data/portfolio'

const PAGE_SIZE = 4
const query = ref('')
const city = ref('all')
const start = ref('2026-08-01')
const end = ref('2027-12-31')
const page = ref(1)
const loading = ref(false)
const helpOpen = ref(false)
const jump = ref('')
const drawerOpen = ref(false)
const selectedId = ref('')
const renewOn = ref('2027-12-01')

const segments = [
  { value: 'all', label: 'All' },
  ...CITIES.map((item) => ({ value: item, label: item })),
]
const people = PEOPLE.map((person) => ({ value: person, label: person }))

const leases = computed(() => {
  const q = query.value.trim().toLowerCase()
  return book.units.filter((unit) => {
    if (unit.status !== 'Leased') return false
    const building = book.properties.find((property) => property.id === unit.propertyId)
    const cityOk = city.value === 'all' || building?.city === city.value
    const inRange = unit.ends >= start.value && unit.ends <= end.value
    const text = `${propertyName(unit.propertyId)} ${unit.label} ${unit.tenant}`.toLowerCase()
    return cityOk && inRange && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(leases.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return leases.value.slice(startAt, startAt + PAGE_SIZE)
})
const selected = computed(() => book.units.find((unit) => unit.id === selectedId.value))

watch([query, city, start, end], () => {
  page.value = 1
})

watch(leases, (list) => {
  if (!list.some((unit) => unit.id === selectedId.value)) {
    drawerOpen.value = false
    selectedId.value = ''
  }
})

function openLease(id: string) {
  const unit = book.units.find((item) => item.id === id)
  if (!unit) return
  selectedId.value = id
  renewOn.value = unit.ends || '2027-12-01'
  drawerOpen.value = true
}

function renew() {
  const unit = book.units.find((item) => item.id === selectedId.value)
  if (!unit || !renewOn.value) return
  unit.ends = renewOn.value
  drawerOpen.value = false
  showToast({
    title: 'Renewed',
    description: `${unit.tenant} stays through ${unit.ends}.`,
    variant: 'success',
  })
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}

function onJump(value: string) {
  if (!PEOPLE.some((person) => person === value)) return
  const unit = book.units.find((item) => item.tenant === value)
  if (unit) openLease(unit.id)
}
</script>

<template>
  <PageHead
    title="Leases"
    lede="End dates for the occupied units."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Leases' }]"
  />
  <Toolbar class="lw-tools">
    <template #start>
      <Search v-model="query" placeholder="Find a lease" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Ends" />
      <SegmentedControl v-model="city" :segments="segments" />
    </template>
    <template #end>
      <span class="lw-quiet">{{ leases.length }} leases</span>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Renewals" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About renewals</Button>
        </template>
        <p>Open a lease and set the next end date.</p>
      </Popover>
      <Tooltip content="Reload the list">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <Autocomplete v-model="jump" class="lw-jump" label="Jump to a tenant" :options="people" @update:model-value="onJump" />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="160px" />
  <EmptyState
    v-else-if="leases.length === 0"
    title="No leases match"
    description="Try another city or a wider date range."
    icon="search"
  />
  <div v-else class="lw-leases">
    <button v-for="unit in visible" :key="unit.id" type="button" class="lw-lease" @click="openLease(unit.id)">
      <strong>{{ propertyName(unit.propertyId) }} {{ unit.label }}</strong>
      <span>{{ unit.tenant }}</span>
      <span class="lw-quiet">{{ money(unit.rent) }}</span>
      <span>{{ unit.ends }}</span>
    </button>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="lw-pages" />
  </div>
  <Drawer v-model:open="drawerOpen" :heading="selected ? `${propertyName(selected.propertyId)} ${selected.label}` : 'Lease'" size="md">
    <template v-if="selected">
      <DescriptionList
        :items="[
          { term: 'Tenant', description: selected.tenant },
          { term: 'Rent', description: money(selected.rent) },
          { term: 'Ends', description: selected.ends },
        ]"
      />
      <DatePicker v-model="renewOn" label="Renew through" />
      <Button type="button" @click="renew">Renew</Button>
    </template>
  </Drawer>
</template>
