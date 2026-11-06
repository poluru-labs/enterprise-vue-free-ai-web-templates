<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, List, Search, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/board'

const query = ref('')
const selectedUnit = ref('all')

const tree = [
  {
    id: 'all',
    label: 'House',
    children: [
      { id: 'Cedar', label: 'Cedar' },
      { id: 'Maple', label: 'Maple' },
      { id: 'Harbor', label: 'Harbor' },
    ],
  },
]

const people = computed(() =>
  desk.staff.filter((person) => {
    const matchesQuery = `${person.name} ${person.role} ${person.unit}`
      .toLowerCase()
      .includes(query.value.trim().toLowerCase())
    const matchesUnit = selectedUnit.value === 'all' || person.unit === selectedUnit.value
    return matchesQuery && matchesUnit
  }),
)

const listItems = computed(() =>
  people.value.map((person) => ({
    id: person.id,
    label: person.name,
    description: `${person.role} · ${person.unit}`,
  })),
)
</script>

<template>
  <PageHead
    title="Directory"
    lede="The house roster."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Directory' }]"
  />

  <Search v-model="query" class="wl-toolbar" placeholder="Search a name or unit" clearable />
  <TreeView class="wl-tree" :nodes="tree" @select="selectedUnit = $event" />
  <List class="wl-alert" :items="listItems" />

  <div class="wl-roster">
    <article v-for="person in people" :key="person.id" class="wl-person">
      <Avatar :name="person.name" size="md" />
      <div>
        <strong>{{ person.name }}</strong>
        <p class="wl-quiet">{{ person.role }} · {{ person.unit }}</p>
      </div>
    </article>
  </div>
</template>
