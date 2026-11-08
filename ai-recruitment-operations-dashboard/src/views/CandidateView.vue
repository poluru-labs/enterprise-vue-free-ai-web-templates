<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Avatar,
  Button,
  ButtonGroup,
  Combobox,
  DatePicker,
  DescriptionList,
  Divider,
  EmptyState,
  FileUpload,
  Modal,
  ProgressBar,
  Rating,
  Status,
  Stepper,
  Textarea,
  TimePicker,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, PEOPLE, STAGES } from '@/constants/navigation'
import { desk, findCandidate, roleTitle, type Stage } from '@/data/desk'

const route = useRoute()
const router = useRouter()
const scheduleOpen = ref(false)
const day = ref('2026-11-13')
const time = ref('09:30')
const interviewer = ref('Ishaan Poluru')

const candidate = computed(() => findCandidate(String(route.params.id ?? '')))
const steps = STAGES.map((stage) => ({ id: stage.id, label: stage.label, description: stage.description }))
const people = PEOPLE.map((person) => ({ value: person, label: person }))
const stepIndex = computed(() => {
  const index = STAGES.findIndex((stage) => stage.label === candidate.value?.stage)
  return index < 0 ? 0 : index
})
const progress = computed(() => Math.round(((stepIndex.value + 1) / STAGES.length) * 100))

function tone(stage: Stage) {
  if (stage === 'Offer') return 'success' as const
  if (stage === 'Interview') return 'info' as const
  if (stage === 'Screen') return 'warning' as const
  return 'neutral' as const
}

function schedule() {
  const current = candidate.value
  if (!current) return
  desk.interviews.push({
    id: `iv-${current.id}-${day.value}`,
    candidateId: current.id,
    when: 'This week',
    time: time.value,
    day: day.value,
  })
  current.events.unshift({
    id: `${current.id}-set`,
    title: 'Scheduled',
    description: `${interviewer.value} set ${day.value} at ${time.value}.`,
    time: 'Today',
  })
  scheduleOpen.value = false
  showToast({
    title: 'Scheduled',
    description: `${current.name} is on ${day.value} at ${time.value}.`,
    variant: 'success',
  })
}

function onResume() {
  showToast({ title: 'Resume filed', description: 'The file is on this candidate.', variant: 'success' })
}
</script>

<template>
  <EmptyState v-if="!candidate" title="Candidate not found" description="That name is not on the desk." icon="search" />
  <template v-else>
    <PageHead
      :title="candidate.name"
      :lede="roleTitle(candidate.roleId)"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Candidates', to: `${BASE_PATH}/candidates` }, { label: candidate.name }]"
    />
    <div class="hw-profile-page">
      <div class="hw-who">
        <Avatar :name="candidate.name" size="lg" />
        <Status :label="candidate.stage" :tone="tone(candidate.stage)" />
      </div>
      <Stepper :steps="steps" :active-index="stepIndex" />
      <DescriptionList
        :items="[
          { term: 'Role', description: roleTitle(candidate.roleId) },
          { term: 'Stage', description: candidate.stage },
          { term: 'Applied', description: candidate.applied },
        ]"
      />
      <ProgressBar label="Through the stages" :value="progress" show-value />
      <Rating :model-value="candidate.rating" label="Interview feedback" read-only />
      <Divider />
      <Textarea v-model="candidate.note" label="Notes" />
      <h2>Timeline</h2>
      <Timeline :items="candidate.events" />
      <FileUpload label="Resume" accept=".pdf" @files-change="onResume" />
      <ButtonGroup>
        <Button type="button" @click="scheduleOpen = true">Schedule</Button>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/candidates`)">Back</Button>
      </ButtonGroup>
      <Modal :open="scheduleOpen" heading="Schedule a conversation" @update:open="scheduleOpen = $event">
        <div class="hw-modal">
          <DatePicker v-model="day" label="Day" />
          <TimePicker v-model="time" label="Time" />
          <Combobox v-model="interviewer" label="With" :options="people" />
        </div>
        <template #footer>
          <Button type="button" variant="secondary" @click="scheduleOpen = false">Cancel</Button>
          <Button type="button" @click="schedule">Schedule</Button>
        </template>
      </Modal>
    </div>
  </template>
</template>
