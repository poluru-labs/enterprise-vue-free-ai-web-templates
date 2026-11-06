<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  TimePicker,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { ledger } from '@/data/ledger'

const open = ref(false)
const form = reactive({
  title: 'Desk hearing',
  kind: 'Hearing',
  date: '2026-11-16',
  time: '10:00',
  matter: 'bw-1042',
})

const kindOptions = [
  { value: 'Hearing', label: 'Hearing' },
  { value: 'Signature', label: 'Signature' },
]
const matterOptions = ledger.matters.map((matter) => ({ value: matter.id, label: matter.number }))

const items = () =>
  ledger.deadlines.map((item) => ({
    id: item.id,
    title: item.title,
    description: `${item.kind} · ${item.matter}`,
    time: `${item.date} ${item.time}`,
  }))

function addDeadline() {
  const matter = ledger.matters.find((item) => item.id === form.matter)
  ledger.deadlines.unshift({
    id: `dl-${ledger.deadlines.length + 1}`,
    title: form.title.trim() || 'Deadline',
    kind: form.kind === 'Signature' ? 'Signature' : 'Hearing',
    date: form.date,
    time: form.time,
    matter: matter?.number ?? 'BW-1042',
  })
  open.value = false
  showToast({
    title: 'Date added',
    description: `${form.title.trim() || 'Deadline'} · ${form.date}`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    title="Calendar"
    lede="Hearings and signature dates."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Calendar' }]"
  />
  <form class="bw-form" @submit.prevent="open = true">
    <Input v-model="form.title" label="Title" />
    <Select v-model="form.kind" label="Kind" :options="kindOptions" />
    <Select v-model="form.matter" label="Matter" :options="matterOptions" />
    <DatePicker v-model="form.date" label="Date" />
    <TimePicker v-model="form.time" label="Time" />
    <Button type="submit">Add date</Button>
  </form>
  <section class="bw-doc">
    <h2>On the docket</h2>
    <Timeline :items="items()" />
  </section>
  <Modal :open="open" heading="Add this date?" @update:open="open = $event">
    <p>{{ form.title }} on {{ form.date }} at {{ form.time }}.</p>
    <template #footer>
      <Button type="button" variant="secondary" @click="open = false">Cancel</Button>
      <Button type="button" @click="addDeadline">Confirm</Button>
    </template>
  </Modal>
</template>
