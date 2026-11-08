<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Alert,
  Button,
  ButtonGroup,
  DatePicker,
  DateRangePicker,
  DescriptionList,
  EmptyState,
  FileUpload,
  Input,
  Modal,
  NumberInput,
  Radio,
  RadioGroup,
  Select,
  Status,
  Stepper,
  Tag,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { fileStep, findProcess, studio, type RunDef } from '@/data/studio'

const route = useRoute()
const router = useRouter()
const runId = ref('')
const confirmOpen = ref(false)

const process = computed(() => findProcess(String(route.params.id ?? '')))

const processRuns = computed(() => studio.runs.filter((run) => run.processId === process.value?.id))

const runOptions = computed(() => processRuns.value.map((run) => ({ value: run.id, label: `${run.number} · ${run.requester}` })))

watch(
  process,
  (item) => {
    const runs = studio.runs.filter((run) => run.processId === item?.id)
    const open = runs.find((run) => run.state === 'In progress')
    runId.value = open?.id ?? runs[0]?.id ?? ''
  },
  { immediate: true },
)

const run = computed(() => processRuns.value.find((item) => item.id === runId.value))

const step = computed(() => {
  const current = run.value
  const item = process.value
  if (!current || !item) return undefined
  return item.steps[current.stepIndex]
})

const steps = computed(() => process.value?.steps.map((item) => ({ id: item.id, label: item.label, description: item.description })) ?? [])

const facts = computed(() => {
  const current = run.value
  const item = process.value
  if (!current || !item) return []
  return [
    { term: 'Requester', description: current.requester },
    { term: 'Owner', description: item.owner },
    { term: 'Started', description: current.started },
    { term: 'State', description: current.state },
  ]
})

const timeline = computed(() => run.value?.notes.map((note) => ({ id: note.id, title: note.title, description: note.description, time: note.time })) ?? [])

function answer(id: string, fallback = '') {
  return run.value?.answers[id] ?? fallback
}

function setAnswer(id: string, value: string) {
  const current = run.value
  if (!current) return
  current.answers[id] = value
}

function onFile(id: string, detail: { files: File[] }) {
  const file = detail.files[0]
  setAnswer(id, file?.name ?? '')
  showToast({ title: 'File attached', description: 'The file stays with the step.', variant: 'info' })
}

function confirmFile() {
  const current = run.value
  confirmOpen.value = false
  if (!current) return
  const result = fileStep(current.id)
  if (!result) return
  if (result.state === 'finished') {
    showToast({ title: 'Finished', description: `${result.number} is on the shelf.`, variant: 'success' })
    return
  }
  showToast({ title: 'Step filed', description: `${result.number} is on ${result.step}.`, variant: 'success' })
}

function tone(item: RunDef) {
  return item.state === 'Finished' ? 'success' : 'warning'
}
</script>

<template>
  <PageHead
    v-if="process"
    :title="process.name"
    :lede="process.summary"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Processes', to: `${BASE_PATH}/processes` }, { label: process.name }]"
  >
    <template #actions>
      <Status v-if="run" :label="run.state" :tone="tone(run)" />
    </template>
  </PageHead>
  <div v-if="process && run && step" class="fw-record">
    <div class="fw-step">
      <Stepper :steps="steps" :active-index="run.stepIndex" />
    </div>
    <Alert
      v-if="run.state === 'In progress' && run.stepIndex === process.steps.length - 1"
      variant="warning"
      title="Last step"
      message="Filing this step finishes the run."
    />
    <div class="fw-detail">
      <form class="fw-form" @submit.prevent="confirmOpen = true">
        <p class="fw-kicker">
          <Tag :label="step.label" />
        </p>
        <h2>{{ step.label }}</h2>
        <p class="fw-quiet">{{ step.description }}</p>
        <Select v-model="runId" label="Run" :options="runOptions" />
        <template v-for="field in step.fields" :key="field.id">
          <DateRangePicker
            v-if="field.kind === 'range'"
            :start="answer(`${field.id}-start`)"
            :end="answer(`${field.id}-end`)"
            :label="field.label"
            @update:start="setAnswer(`${field.id}-start`, $event)"
            @update:end="setAnswer(`${field.id}-end`, $event)"
          />
          <Input
            v-else-if="field.kind === 'text'"
            :model-value="answer(field.id)"
            :label="field.label"
            @update:model-value="setAnswer(field.id, String($event))"
          />
          <Textarea
            v-else-if="field.kind === 'textarea'"
            :model-value="answer(field.id)"
            :label="field.label"
            @update:model-value="setAnswer(field.id, String($event))"
          />
          <DatePicker
            v-else-if="field.kind === 'date'"
            :model-value="answer(field.id)"
            :label="field.label"
            @update:model-value="setAnswer(field.id, String($event))"
          />
          <NumberInput
            v-else-if="field.kind === 'number'"
            :model-value="Number(answer(field.id, '0'))"
            :label="field.label"
            :min="0"
            :max="90"
            :step="1"
            @update:model-value="setAnswer(field.id, String($event))"
          />
          <Select
            v-else-if="field.kind === 'select'"
            :model-value="answer(field.id)"
            :label="field.label"
            :options="(field.options ?? []).map((option) => ({ value: option, label: option }))"
            @update:model-value="setAnswer(field.id, String($event))"
          />
          <RadioGroup
            v-else-if="field.kind === 'choice'"
            :model-value="answer(field.id)"
            :label="field.label"
            orientation="horizontal"
            @update:model-value="setAnswer(field.id, String($event))"
          >
            <Radio v-for="option in field.options ?? []" :key="option" :value="option" :label="option" />
          </RadioGroup>
          <FileUpload v-else :label="field.label" @files-change="onFile(field.id, $event)" />
        </template>
        <ButtonGroup>
          <Button v-if="run.state === 'In progress'" type="submit">File this step</Button>
          <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/processes`)">Back</Button>
        </ButtonGroup>
      </form>
      <aside class="fw-side">
        <h2>{{ run.number }}</h2>
        <p class="fw-quiet">{{ run.note }}</p>
        <DescriptionList :items="facts" />
        <Timeline :items="timeline" />
      </aside>
    </div>
    <Modal v-model:open="confirmOpen" heading="File this step">
      <p>Mark {{ step.label }} done for {{ run.number }}.</p>
      <template #footer>
        <Button type="button" variant="secondary" @click="confirmOpen = false">Back</Button>
        <Button type="button" @click="confirmFile">File step</Button>
      </template>
    </Modal>
  </div>
  <div v-else-if="process">
    <EmptyState class="fw-gap" title="No runs" description="Nothing is open for this process." icon="search" />
  </div>
  <PageHead v-else title="Process" lede="This process is not on the shelf." :crumbs="[BREADCRUMB_ROOT, { label: 'Process' }]" />
</template>
