<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Autocomplete, Avatar, Card, Icon, List, Rating, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { onCall, people } from '@/data/desk'

const selectedId = ref('anika')
const query = ref('')

const tree = [
  {
    id: 'platform',
    label: 'Platform',
    children: [
      { id: 'anika', label: 'Anika Poluru' },
      { id: 'sana', label: 'Sana Poluru' },
    ],
  },
  { id: 'billing', label: 'Billing', children: [{ id: 'dev', label: 'Dev Poluru' }] },
  { id: 'checkout', label: 'Checkout', children: [{ id: 'harsha', label: 'Harsha Poluru' }] },
  { id: 'directory', label: 'Directory', children: [{ id: 'leela', label: 'Leela Poluru' }] },
  { id: 'incidents', label: 'Incidents', children: [{ id: 'mohan', label: 'Mohan Poluru' }] },
  { id: 'notifications', label: 'Notifications', children: [{ id: 'nila', label: 'Nila Poluru' }] },
  { id: 'media', label: 'Media', children: [{ id: 'ravi', label: 'Ravi Poluru' }] },
]

const options = people.map((person) => ({ value: person.name, label: person.name }))

const selected = computed(() => {
  const fromTree = tree.flatMap((group) => group.children).find((person) => person.id === selectedId.value)
  return people.find((person) => person.name === fromTree?.label) ?? people[0]
})

watch(query, (value) => {
  const match = tree.flatMap((group) => group.children).find((person) => person.label === value)
  if (match) selectedId.value = match.id
})
</script>

<template>
  <PageHead title="People" :crumbs="[BREADCRUMB_ROOT, { label: 'People' }]" />

  <div class="nl-split">
    <section class="nl-panel">
      <h2>Teams</h2>
      <Autocomplete v-model="query" label="Find a person" :options="options" placeholder="Anika Poluru" />
      <TreeView class="nl-tree" :nodes="tree" @select="selectedId = $event" />
    </section>
    <aside class="nl-stack">
      <Card v-if="selected" :title="selected.name" :description="`${selected.role} · ${selected.team}`">
        <div class="nl-person">
          <Avatar :name="selected.name" size="md" />
          <div>
            <p class="nl-person-shift">
              <Icon name="clock" size="sm" />
              {{ selected.shift }}
            </p>
            <Rating :model-value="4" label="Handoff" read-only />
          </div>
        </div>
      </Card>
      <section class="nl-panel">
        <h2>On call</h2>
        <List :items="onCall" />
      </section>
    </aside>
  </div>
</template>
