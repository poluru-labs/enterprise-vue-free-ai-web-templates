<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Combobox, FileUpload, Input, Select, Textarea, showToast } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, PEOPLE } from '@/constants/navigation'
import { book, nextOrderNumber, unitsFor } from '@/data/portfolio'

const router = useRouter()
const propertyId = ref('cedar')
const unitId = ref('cedar-2b')
const title = ref('')
const owner = ref('Anil Poluru')
const note = ref('')

const properties = book.properties.map((property) => ({ value: property.id, label: property.name }))
const people = PEOPLE.map((person) => ({ value: person, label: person }))
const units = computed(() => unitsFor(propertyId.value).map((unit) => ({ value: unit.id, label: unit.label })))

watch(propertyId, () => {
  const first = unitsFor(propertyId.value)[0]
  unitId.value = first?.id ?? ''
})

function onPhoto() {
  showToast({ title: 'Photo added', description: 'The photo is on this order.', variant: 'success' })
}

function save() {
  const trimmed = title.value.trim()
  if (!trimmed || !unitId.value) return
  const number = nextOrderNumber()
  const id = number.toLowerCase()
  book.orders.unshift({
    id,
    number,
    propertyId: propertyId.value,
    unitId: unitId.value,
    title: trimmed,
    owner: owner.value,
    status: 'Open',
    filed: '2026-11-07',
    note: note.value.trim(),
    events: [{ id: `${id}-opened`, title: 'Filed', description: `${owner.value} filed ${number}.`, time: 'Today' }],
  })
  showToast({ title: 'Work order filed', description: `${number} is open.`, variant: 'success' })
  router.push(`${BASE_PATH}/maintenance`)
}
</script>

<template>
  <PageHead
    title="New work order"
    lede="A unit, a title, and a photo."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Maintenance', to: `${BASE_PATH}/maintenance` }, { label: 'New work order' }]"
  />
  <form class="lw-form" @submit.prevent="save">
    <Select v-model="propertyId" label="Building" :options="properties" />
    <Select v-model="unitId" label="Unit" :options="units" />
    <Input v-model="title" label="Title" />
    <Combobox v-model="owner" label="Owner" :options="people" />
    <Textarea v-model="note" label="Note" />
    <FileUpload label="Photo" accept=".jpg,.png" @files-change="onPhoto" />
    <Button type="submit">File order</Button>
  </form>
</template>
