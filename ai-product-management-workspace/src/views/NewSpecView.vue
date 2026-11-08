<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Combobox, Input, Select, Textarea, showToast } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { AREAS, BASE_PATH, BREADCRUMB_ROOT, HORIZONS, PEOPLE } from '@/constants/navigation'
import { board, nextNumber, type Area, type Horizon } from '@/data/board'

const router = useRouter()
const title = ref('')
const area = ref<Area>('Notifications')
const horizon = ref<Horizon>('Next')
const owner = ref('Maya Poluru')
const problem = ref('')

const areas = AREAS.map((item) => ({ value: item, label: item }))
const horizons = HORIZONS.map((item) => ({ value: item, label: item }))
const people = PEOPLE.map((item) => ({ value: item, label: item }))

function save() {
  const trimmed = title.value.trim()
  if (!trimmed) return
  const number = nextNumber()
  const id = number.toLowerCase()
  board.specs.push({
    id,
    number,
    title: trimmed,
    horizon: horizon.value,
    area: area.value,
    owner: owner.value,
    status: 'Draft',
    problem: problem.value.trim() || 'Problem still open.',
    updated: '2026-11-07',
    note: '',
    scope: [{ id: `${id}-scope`, title: 'In', content: 'Scope still open.' }],
    events: [{ id: `${id}-opened`, title: 'Filed', description: `${owner.value} filed ${number}.`, time: 'Today' }],
  })
  showToast({
    title: 'Spec filed',
    description: `${number} is on the board.`,
    variant: 'success',
  })
  router.push(`${BASE_PATH}/specs/${id}`)
}
</script>

<template>
  <PageHead
    title="New spec"
    lede="A title, an area, and the problem."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Specs', to: `${BASE_PATH}/specs` }, { label: 'New spec' }]"
  />
  <form class="sb-form" @submit.prevent="save">
    <Input v-model="title" label="Title" />
    <Select v-model="area" label="Area" :options="areas" />
    <Select v-model="horizon" label="Horizon" :options="horizons" />
    <Combobox v-model="owner" label="Owner" :options="people" />
    <Textarea v-model="problem" label="Problem" />
    <Button type="submit">File spec</Button>
  </form>
</template>
