<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  Button,
  Checkbox,
  Combobox,
  DatePicker,
  DateRangePicker,
  FileUpload,
  Modal,
  NumberInput,
  Select,
  Slider,
  SplitButton,
  Switch,
  Textarea,
  Timeline,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'

const confirmOpen = ref(false)
const form = reactive({
  serviceId: 'billing',
  environment: 'Production',
  windowStart: '2026-11-06',
  windowEnd: '2026-11-06',
  reviewDate: '2026-11-06',
  time: '09:00',
  notes: '',
  canary: 10,
  notify: true,
  hold: false,
})

const serviceOptions = computed(() => desk.services.map((item) => ({ value: item.id, label: item.name })))
const environmentOptions = [
  { value: 'Production', label: 'Production' },
  { value: 'Staging', label: 'Staging' },
]

const timeline = computed(() =>
  desk.deploys.map((item) => ({
    id: item.id,
    title: `${item.service} ${item.version}`,
    description: `${item.owner} · ${item.environment} · ${item.notes}`,
    time: item.at,
  })),
)

function record(draft: boolean) {
  const service = desk.services.find((item) => item.id === form.serviceId)
  if (!service) return
  const note = form.notes || (draft ? 'Draft window.' : 'Window recorded.')
  desk.deploys.unshift({
    id: `dep-${Date.now()}`,
    serviceId: service.id,
    service: service.name,
    version: draft ? 'draft' : 'next',
    environment: form.environment,
    owner: service.owner,
    at: draft ? 'Draft' : `${form.reviewDate} ${form.time}`,
    windowStart: form.windowStart,
    windowEnd: form.windowEnd,
    notes: form.hold ? `Held. ${note}` : note,
    step: draft || form.hold ? 0 : 1,
  })
  form.notes = ''
  confirmOpen.value = false
  showToast({
    title: draft ? 'Draft saved' : 'Release window saved',
    description: `${service.name} · ${form.environment} · ${form.canary}% canary`,
    variant: 'success',
  })
}

function onFiles(detail: { files?: File[] }) {
  const count = detail?.files?.length ?? 0
  showToast({
    title: count ? 'Note attached' : 'No file selected',
    description: count ? `${count} file on this window.` : 'Choose a note to attach.',
    variant: count ? 'success' : 'info',
  })
}
</script>

<template>
  <PageHead title="Deploys" :crumbs="[BREADCRUMB_ROOT, { label: 'Deploys' }]" />

  <div class="nl-split">
    <section class="nl-panel">
      <h2>Timeline</h2>
      <Timeline :items="timeline" />
    </section>
    <form class="nl-panel nl-form" @submit.prevent="confirmOpen = true">
      <h2>Release window</h2>
      <Select v-model="form.serviceId" label="Service" :options="serviceOptions" />
      <Combobox v-model="form.environment" label="Environment" :options="environmentOptions" placeholder="Where it ships" />
      <DateRangePicker v-model:start="form.windowStart" v-model:end="form.windowEnd" label="Window" />
      <DatePicker v-model="form.reviewDate" label="Review date" />
      <TimePicker v-model="form.time" label="Start time" />
      <NumberInput v-model="form.canary" label="Canary percent" :min="1" :max="100" :step="1" />
      <Slider v-model="form.canary" label="Canary" :min="1" :max="100" :step="1" show-value />
      <Textarea v-model="form.notes" label="Notes" placeholder="What is shipping in this window?" />
      <Checkbox v-model="form.notify" label="Tell the on-call owner" />
      <Switch v-model="form.hold" label="Hold until Anika Poluru confirms" />
      <FileUpload label="Release note" hint="Markdown or PDF" accept=".md,.pdf" @files-change="onFiles" />
      <SplitButton label="Save window" @click="confirmOpen = true" @select="record(true)" />
    </form>
  </div>

  <Modal :open="confirmOpen" heading="Save this window?" @update:open="confirmOpen = $event">
    <p class="nl-muted">
      {{ form.environment }} · {{ form.windowStart }} to {{ form.windowEnd }} · {{ form.canary }}% canary.
    </p>
    <template #footer>
      <Button variant="secondary" @click="confirmOpen = false">Cancel</Button>
      <Button @click="record(false)">Save window</Button>
    </template>
  </Modal>
</template>
