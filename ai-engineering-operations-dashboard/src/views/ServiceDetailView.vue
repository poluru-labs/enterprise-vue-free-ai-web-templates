<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  Accordion,
  CodeSnippet,
  DescriptionList,
  EmptyState,
  FileUpload,
  Meter,
  Popover,
  Rating,
  Stepper,
  Tabs,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'

const route = useRoute()
const tab = ref('facts')
const noteOpen = ref(false)

const service = computed(() => desk.services.find((item) => item.id === route.params.id))
const deploys = computed(() => desk.deploys.filter((item) => item.serviceId === service.value?.id))
const latest = computed(() => deploys.value[0])

const steps = [
  { id: 'held', label: 'Held', description: 'Waiting on the owner' },
  { id: 'canary', label: 'Canary', description: 'A small share of traffic' },
  { id: 'rolling', label: 'Rolling', description: 'Moving through the region' },
  { id: 'done', label: 'Done', description: 'The window is closed' },
]

const facts = computed(() => {
  const item = service.value
  if (!item) return []
  return [
    { term: 'Owner', description: item.owner },
    { term: 'Status', description: item.status },
    { term: 'Region', description: item.region },
    { term: 'Uptime', description: `${item.uptime.toFixed(1)}%` },
    { term: 'Summary', description: item.summary },
  ]
})

const timeline = computed(() =>
  deploys.value.map((item) => ({
    id: item.id,
    title: `${item.version} · ${item.environment}`,
    description: `${item.owner} · ${item.notes}`,
    time: item.at,
  })),
)

function onFiles(detail: { files?: File[] }) {
  const count = detail?.files?.length ?? 0
  showToast({
    title: count ? 'Runbook attached' : 'No file selected',
    description: count ? `${count} file for ${service.value?.name ?? 'the service'}.` : 'Choose a file to attach.',
    variant: count ? 'success' : 'info',
  })
}

const runbook = computed(() => {
  const item = service.value
  if (!item) return []
  return [
    { id: 'check', title: 'Check the health endpoint', content: item.endpoint },
    { id: 'owner', title: 'Page the owner', content: `${item.owner} owns ${item.name}.` },
    { id: 'hold', title: 'Hold the next deploy', content: 'Leave the service paused until the write-up is updated.' },
  ]
})
</script>

<template>
  <PageHead
    v-if="service"
    :title="service.name"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Services', to: `${BASE_PATH}/services` }, { label: service.name }]"
  >
    <template #actions>
      <Popover v-model:open="noteOpen" heading="Owner note" placement="bottom">
        <template #trigger>
          <button type="button" class="nl-text-btn">Owner note</button>
        </template>
        <p class="nl-muted">{{ service.owner }} owns {{ service.name }} in {{ service.region }}.</p>
      </Popover>
    </template>
  </PageHead>
  <EmptyState
    v-else
    title="Service not on the desk"
    description="It is not in the Billing, Checkout, or Directory catalog."
    icon="search"
  />

  <template v-if="service">
    <Tabs
      v-model="tab"
      class="nl-tabs"
      :items="[
        { id: 'facts', label: 'Facts' },
        { id: 'runbook', label: 'Runbook' },
        { id: 'release', label: 'Release' },
      ]"
    />

    <div v-if="tab === 'facts'" class="nl-split">
      <section class="nl-panel">
        <h2>Service</h2>
        <DescriptionList :items="facts" />
        <div class="nl-snippet">
          <p class="nl-muted">Health endpoint</p>
          <CodeSnippet :code="service.endpoint" language="text" />
        </div>
      </section>
      <aside class="nl-panel">
        <h2>Uptime</h2>
        <Meter :value="service.uptime" :max="100" :label="service.name" show-value />
        <Rating class="nl-rating" :model-value="Math.max(1, Math.round(service.uptime / 20))" label="Uptime mark" read-only />
        <h2 class="nl-subhead">Recent deploys</h2>
        <Timeline v-if="timeline.length" :items="timeline" />
        <p v-else class="nl-muted">No deploys yet.</p>
      </aside>
    </div>

    <section v-else-if="tab === 'runbook'" class="nl-panel">
      <h2>Runbook</h2>
      <Accordion :items="runbook" />
      <FileUpload
        class="nl-upload"
        label="Runbook file"
        hint="Markdown or PDF"
        accept=".md,.pdf"
        @files-change="onFiles"
      />
    </section>

    <section v-else class="nl-panel">
      <h2>Latest release</h2>
      <Stepper v-if="latest" :steps="steps" :active-index="latest.step" />
      <p v-else class="nl-muted">Nothing is in a window for this service.</p>
    </section>
  </template>
</template>
