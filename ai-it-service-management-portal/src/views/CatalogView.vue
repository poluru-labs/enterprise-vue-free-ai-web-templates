<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Autocomplete,
  Button,
  Checkbox,
  Combobox,
  DatePicker,
  FileUpload,
  Input,
  Modal,
  NumberInput,
  Radio,
  RadioGroup,
  Rating,
  Select,
  SplitButton,
  Tabs,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, type TicketKind } from '@/data/desk'

const confirmOpen = ref(false)
const kind = ref('Access')
const form = reactive({
  requester: 'Tara Poluru',
  watcher: 'Uma Poluru',
  assignee: 'Pavan Poluru',
  title: '',
  when: '2026-11-07',
  time: '09:00',
  note: '',
  seats: 1,
  priority: 'normal',
  approved: false,
})

const people = [
  'Pavan Poluru',
  'Rhea Poluru',
  'Suresh Poluru',
  'Tara Poluru',
  'Uma Poluru',
  'Vikas Poluru',
  'Wasim Poluru',
  'Yamini Poluru',
].map((name) => ({ value: name, label: name }))

function submit() {
  const title = form.title.trim() || `${kind.value} request`
  const kindValue = (['Access', 'Hardware', 'Software'].includes(kind.value) ? kind.value : 'Access') as TicketKind
  desk.tickets.unshift({
    id: `tk-${Date.now()}`,
    number: `DL-${2412 + desk.tickets.length}`,
    title,
    requester: form.requester,
    assignee: form.assignee,
    priority: 'Normal',
    status: 'Open',
    opened: form.when,
    kind: kindValue === 'Hardware' ? 'Hardware' : kindValue === 'Software' ? 'Software' : 'Access',
    comments: [{ id: 'c1', author: form.requester, body: form.note || `Requested for ${form.time}.`, time: form.time }],
  })
  confirmOpen.value = false
  form.title = ''
  form.note = ''
  showToast({
    title: 'Request filed',
    description: `${title} is on the queue for Pavan Poluru.`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    title="Catalog"
    lede="Ask for access, hardware, or software."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Catalog' }]"
  />

  <Tabs
    v-model="kind"
    class="dk-tabs"
    :items="[
      { id: 'Access', label: 'Access' },
      { id: 'Hardware', label: 'Hardware' },
      { id: 'Software', label: 'Software' },
    ]"
  />

  <form class="dk-form" @submit.prevent="confirmOpen = true">
    <Rating :model-value="4" label="Last request" read-only />
    <Select v-model="form.requester" label="Who" :options="people" />
    <Autocomplete v-model="form.watcher" label="Watch" :options="people" placeholder="Who to copy" />
    <Combobox v-model="form.assignee" label="Assign" :options="people" placeholder="Who picks it up" />
    <Input v-model="form.title" label="What" :placeholder="kind === 'Hardware' ? 'Laptop swap' : 'What is needed'" required />
    <NumberInput v-model="form.seats" label="How many" :min="1" :max="5" :step="1" />
    <RadioGroup v-model="form.priority" label="Priority" orientation="horizontal">
      <Radio value="low" label="Low" />
      <Radio value="normal" label="Normal" />
      <Radio value="high" label="High" />
    </RadioGroup>
    <DatePicker v-model="form.when" label="Needed by" />
    <TimePicker v-model="form.time" label="Time" />
    <Textarea v-model="form.note" label="Note" placeholder="Short reason" />
    <FileUpload label="Attachment" hint="Optional" accept=".pdf,.png,.jpg" />
    <Checkbox v-model="form.approved" label="A manager has approved this" />
    <SplitButton label="File request" @click="confirmOpen = true" @select="submit" />
  </form>

  <Modal :open="confirmOpen" heading="File this request?" @update:open="confirmOpen = $event">
    <p class="dk-quiet">{{ kind }} · {{ form.requester }} · {{ form.title || 'New request' }}.</p>
    <template #footer>
      <Button variant="secondary" @click="confirmOpen = false">Cancel</Button>
      <Button @click="submit">File</Button>
    </template>
  </Modal>
</template>
