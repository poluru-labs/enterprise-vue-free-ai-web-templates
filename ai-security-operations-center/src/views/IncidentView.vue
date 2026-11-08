<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Button,
  ButtonGroup,
  DescriptionList,
  List,
  Status,
  Stepper,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, WATCH_STEPS } from '@/constants/navigation'
import { assetName, closeIncident, findAsset, findIncident, type Severity } from '@/data/watch'

const route = useRoute()
const router = useRouter()
const note = ref('')

const incident = computed(() => findIncident(String(route.params.id ?? '')))
const asset = computed(() => (incident.value ? findAsset(incident.value.assetId) : undefined))
const steps = WATCH_STEPS.map((step) => ({ id: step.id, label: step.label, description: step.description }))

const assets = computed(() =>
  asset.value
    ? [{ id: asset.value.id, label: asset.value.name, description: `${asset.value.site} · ${asset.value.network}` }]
    : [],
)

function tone(severity: Severity) {
  if (severity === 'High') return 'danger' as const
  if (severity === 'Low') return 'warning' as const
  return 'info' as const
}

function close() {
  const current = incident.value
  if (!current) return
  closeIncident(current.id, note.value)
  note.value = ''
  showToast({ title: 'Closed', description: `${current.number} is filed.`, variant: 'success' })
}
</script>

<template>
  <PageHead
    v-if="incident"
    :title="incident.title"
    :lede="incident.number"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Incidents', to: `${BASE_PATH}/incidents` }, { label: incident.number }]"
  />
  <p v-else>That incident is not on the queue.</p>
  <div v-if="incident" class="wl-record">
    <Status :label="incident.severity" :tone="tone(incident.severity)" />
    <DescriptionList
      :items="[
        { term: 'Owner', description: incident.owner },
        { term: 'State', description: incident.state },
        { term: 'Opened', description: incident.opened },
        { term: 'Asset', description: assetName(incident.assetId) },
      ]"
    />
    <div class="wl-step">
      <Stepper :steps="steps" :active-index="incident.step" />
    </div>
    <h2>Affected assets</h2>
    <List :items="assets" />
    <h2>Watch log</h2>
    <Timeline :items="incident.notes" />
    <Textarea v-if="incident.state === 'Open'" v-model="note" label="Close note" />
    <ButtonGroup>
      <Button v-if="incident.state === 'Open'" type="button" @click="close">Close incident</Button>
      <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/incidents`)">Back to queue</Button>
    </ButtonGroup>
  </div>
</template>
