<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Autocomplete,
  Avatar,
  DescriptionList,
  EmptyState,
  Rating,
  Search,
  Tabs,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { ledger } from '@/data/ledger'

const query = ref('')
const tab = ref('all')
const picked = ref('')
const selectedId = ref('cs-1')

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return ledger.counsel.filter((person) => {
    if (tab.value === 'desk' && person.firm !== 'Desk') return false
    if (tab.value === 'outside' && person.firm === 'Desk') return false
    if (!term) return true
    return person.name.toLowerCase().includes(term) || person.firm.toLowerCase().includes(term)
  })
})

const selected = computed(
  () => visible.value.find((person) => person.id === selectedId.value) ?? visible.value[0],
)

function choose(name: string) {
  const person = ledger.counsel.find((item) => item.name === name)
  if (!person) return
  selectedId.value = person.id
  tab.value = 'all'
  query.value = ''
}
</script>

<template>
  <PageHead title="Counsel" lede="Who holds which file." :crumbs="[BREADCRUMB_ROOT, { label: 'Counsel' }]" />
  <div class="bw-form">
    <Search v-model="query" placeholder="Find counsel" />
    <Autocomplete
      v-model="picked"
      label="Jump to a name"
      :options="ledger.counsel.map((person) => ({ value: person.name, label: person.name }))"
      @update:model-value="choose"
    />
  </div>
  <Tabs
    v-model="tab"
    class="bw-block"
    :items="[
      { id: 'all', label: 'All' },
      { id: 'desk', label: 'Desk' },
      { id: 'outside', label: 'Outside' },
    ]"
  />
  <EmptyState
    v-if="visible.length === 0"
    title="No one matches"
    description="Try another name or firm."
    icon="search"
  />
  <template v-else>
    <div class="bw-directory">
      <button
        v-for="person in visible"
        :key="person.id"
        type="button"
        class="bw-directory-row"
        :class="{ 'is-selected': person.id === selected?.id }"
        @click="selectedId = person.id"
      >
        <Avatar :name="person.name" size="sm" />
        <span>
          <strong>{{ person.name }}</strong>
          <span>{{ person.firm }}</span>
        </span>
      </button>
    </div>
    <DescriptionList
      v-if="selected"
      class="bw-block"
      :items="[
        { term: 'Name', description: selected.name },
        { term: 'Firm', description: selected.firm },
        { term: 'Role', description: selected.role },
        { term: 'Matter', description: selected.matters },
      ]"
    />
    <Rating :model-value="4" label="Standing" read-only />
  </template>
</template>
