<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Autocomplete,
  Avatar,
  DescriptionList,
  Drawer,
  EmptyState,
  Pagination,
  Search,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, findPartner } from '@/data/directory'

const query = ref('')
const jump = ref('')
const page = ref(1)
const pageSize = 5
const drawerOpen = ref(false)
const selectedId = ref('')

const options = desk.partners.map((partner) => ({ value: partner.lead, label: partner.lead }))

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return desk.partners.filter((partner) => {
    const text = `${partner.lead} ${partner.firm}`.toLowerCase()
    return q.length === 0 || text.includes(q)
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(visible.value.length / pageSize)))

const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return visible.value.slice(start, start + pageSize)
})

const selected = computed(() => findPartner(selectedId.value))

watch(query, () => {
  page.value = 1
})

function choose(value: string) {
  const partner = desk.partners.find((item) => item.lead === value)
  if (!partner) return
  selectedId.value = partner.id
  drawerOpen.value = true
}

function openPerson(id: string) {
  selectedId.value = id
  drawerOpen.value = true
}
</script>

<template>
  <PageHead
    title="Contacts"
    lede="People at the partner firms."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Contacts' }]"
  />
  <div class="ay-deal-tools">
    <Search v-model="query" placeholder="Find a person" />
    <Autocomplete
      v-model="jump"
      label="Jump to a name"
      :options="options"
      @update:model-value="choose"
    />
  </div>
  <EmptyState
    v-if="visible.length === 0"
    title="No one matches"
    description="Try another name."
    icon="search"
  />
  <div v-else class="ay-people">
    <button
      v-for="partner in paged"
      :key="partner.id"
      type="button"
      class="ay-person"
      @click="openPerson(partner.id)"
    >
      <Avatar :name="partner.lead" size="sm" />
      <span>
        <strong>{{ partner.lead }}</strong>
        <span>{{ partner.firm }}</span>
      </span>
      <span class="ay-meta">{{ partner.region }}</span>
    </button>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="ay-pages" />
  </div>
  <Drawer v-model:open="drawerOpen" :heading="selected?.lead ?? 'Contact'" size="md">
    <DescriptionList
      v-if="selected"
      :items="[
        { term: 'Firm', description: selected.firm },
        { term: 'Region', description: selected.region },
        { term: 'Phone', description: selected.phone },
        { term: 'Email', description: selected.email },
      ]"
    />
  </Drawer>
</template>
