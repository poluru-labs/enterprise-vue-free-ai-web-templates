<script setup lang="ts">
import { computed, reactive } from 'vue'
import { Button, DateRangePicker, Select, Textarea, Timeline, showToast } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'

const form = reactive({
  serviceId: 'billing',
  environment: 'Production',
  windowStart: '2026-11-06',
  windowEnd: '2026-11-06',
  notes: '',
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

function submit() {
  const service = desk.services.find((item) => item.id === form.serviceId)
  if (!service) return
  desk.deploys.unshift({
    id: `dep-${Date.now()}`,
    serviceId: service.id,
    service: service.name,
    version: 'next',
    environment: form.environment,
    owner: service.owner,
    at: 'Queued',
    windowStart: form.windowStart,
    windowEnd: form.windowEnd,
    notes: form.notes || 'Window recorded.',
    step: 0,
  })
  form.notes = ''
  showToast({
    title: 'Release window saved',
    description: `${service.name} · ${form.environment} · ${service.owner}`,
    variant: 'success',
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
    <form class="nl-panel nl-form" @submit.prevent="submit">
      <h2>Release window</h2>
      <Select v-model="form.serviceId" label="Service" :options="serviceOptions" />
      <Select v-model="form.environment" label="Environment" :options="environmentOptions" />
      <DateRangePicker v-model:start="form.windowStart" v-model:end="form.windowEnd" label="Window" />
      <Textarea v-model="form.notes" label="Notes" placeholder="What is shipping in this window?" />
      <Button type="submit">Save window</Button>
    </form>
  </div>
</template>
