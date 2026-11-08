<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Accordion,
  Alert,
  Avatar,
  Button,
  ButtonGroup,
  DescriptionList,
  Divider,
  EmptyState,
  FileUpload,
  Modal,
  ProgressBar,
  Status,
  Stepper,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, SPEC_STEPS } from '@/constants/navigation'
import { findSpec, type SpecStatus } from '@/data/board'

const route = useRoute()
const router = useRouter()
const lockOpen = ref(false)

const spec = computed(() => findSpec(String(route.params.id ?? '')))
const steps = SPEC_STEPS.map((step) => ({ id: step.id, label: step.label, description: step.description }))
const stepIndex = computed(() => Math.max(0, SPEC_STEPS.findIndex((step) => step.label === spec.value?.status)))
const progress = computed(() => Math.round(((stepIndex.value + 1) / SPEC_STEPS.length) * 100))

function lockScope() {
  const current = spec.value
  if (!current) return
  current.status = 'Locked'
  current.events.unshift({
    id: `${current.id}-locked`,
    title: 'Locked',
    description: 'Maya Poluru locked the scope.',
    time: 'Today',
  })
  lockOpen.value = false
  showToast({ title: 'Scope locked', description: `${current.number} is locked.`, variant: 'success' })
}

function onSketch() {
  showToast({ title: 'Sketch filed', description: 'The file is on this spec.', variant: 'success' })
}

function tone(status: SpecStatus) {
  if (status === 'Shipped') return 'success' as const
  if (status === 'Locked') return 'info' as const
  if (status === 'In review') return 'warning' as const
  return 'neutral' as const
}
</script>

<template>
  <EmptyState
    v-if="!spec"
    title="Spec not found"
    description="That number is not on the board."
    icon="search"
  />
  <template v-else>
    <PageHead
      :title="spec.title"
      :lede="spec.number"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Roadmap', to: `${BASE_PATH}/roadmap` }, { label: spec.number }]"
    >
      <template #actions>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/roadmap`)">Back to roadmap</Button>
      </template>
    </PageHead>
    <div class="sb-detail">
      <Stepper :steps="steps" :active-index="stepIndex" />
      <Alert v-if="spec.status === 'Draft'" title="Draft" description="Scope is still open." />
      <div class="sb-owner">
        <Avatar :name="spec.owner" size="lg" />
        <div>
          <strong>{{ spec.owner }}</strong>
          <p>{{ spec.area }} · {{ spec.horizon }}</p>
        </div>
        <Status :label="spec.status" :tone="tone(spec.status)" />
      </div>
      <h2>Problem</h2>
      <p class="sb-problem-copy">{{ spec.problem }}</p>
      <h2>Scope</h2>
      <Accordion :items="spec.scope" />
      <DescriptionList
        :items="[
          { term: 'Owner', description: spec.owner },
          { term: 'Area', description: spec.area },
          { term: 'Horizon', description: spec.horizon },
          { term: 'Updated', description: spec.updated },
        ]"
      />
      <ProgressBar label="Through the steps" :value="progress" show-value />
      <Divider />
      <h2>Notes</h2>
      <Timeline :items="spec.events" />
      <FileUpload label="Sketch" accept=".pdf,.png" @files-change="onSketch" />
      <ButtonGroup>
        <Button type="button" :disabled="spec.status === 'Locked' || spec.status === 'Shipped'" @click="lockOpen = true">
          Lock scope
        </Button>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/roadmap`)">Back</Button>
      </ButtonGroup>
      <Modal :open="lockOpen" heading="Lock this scope" @update:open="lockOpen = $event">
        <p>{{ spec.number }} moves to Locked.</p>
        <template #footer>
          <Button type="button" variant="secondary" @click="lockOpen = false">Cancel</Button>
          <Button type="button" @click="lockScope">Lock scope</Button>
        </template>
      </Modal>
    </div>
  </template>
</template>
