<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Button,
  DatePicker,
  Modal,
  Select,
  Stepper,
  Textarea,
  TimePicker,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/board'

const confirmOpen = ref(false)
const form = reactive({
  person: 'Manu Poluru',
  unit: 'Cedar',
  date: '2026-11-06',
  time: '15:00',
  note: '',
})

const people = desk.staff.map((person) => ({ value: person.name, label: person.name }))
const units = [
  { value: 'Cedar', label: 'Cedar' },
  { value: 'Maple', label: 'Maple' },
  { value: 'Harbor', label: 'Harbor' },
]

function submit() {
  desk.shift.push({
    id: `s-${Date.now()}`,
    title: 'Swap requested',
    description: `${form.person} · ${form.unit}`,
    time: form.time,
  })
  confirmOpen.value = false
  form.note = ''
  showToast({
    title: 'Swap requested',
    description: `${form.person} asked for ${form.unit} at ${form.time}.`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    title="Shifts"
    lede="Day, evening, and night on the house board."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Shifts' }]"
  />

  <Stepper
    class="wl-stepper"
    :active-index="1"
    :steps="[
      { id: 'day', label: 'Day', description: '07:00' },
      { id: 'evening', label: 'Evening', description: '15:00' },
      { id: 'night', label: 'Night', description: '19:00' },
    ]"
  />

  <section class="wl-shift">
    <Timeline :items="desk.shift" />
  </section>

  <form class="wl-form" @submit.prevent="confirmOpen = true">
    <h2>Request a swap</h2>
    <Select v-model="form.person" label="Who" :options="people" />
    <Select v-model="form.unit" label="Unit" :options="units" />
    <DatePicker v-model="form.date" label="Date" />
    <TimePicker v-model="form.time" label="Time" />
    <Textarea v-model="form.note" label="Note" placeholder="Short reason" />
    <Button type="submit">Request swap</Button>
  </form>

  <Modal :open="confirmOpen" heading="Send this swap?" @update:open="confirmOpen = $event">
    <p class="wl-quiet">{{ form.person }} · {{ form.unit }} · {{ form.date }} {{ form.time }}.</p>
    <template #footer>
      <Button variant="secondary" @click="confirmOpen = false">Cancel</Button>
      <Button @click="submit">Send</Button>
    </template>
  </Modal>
</template>
