<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Button,
  ButtonGroup,
  DescriptionList,
  EmptyState,
  FileUpload,
  List,
  Status,
  Stepper,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, MILESTONES } from '@/constants/navigation'
import { fileDocument, findStudy, type StudyStatus } from '@/data/shelf'

const route = useRoute()
const router = useRouter()

const study = computed(() => findStudy(String(route.params.id ?? '')))
const steps = MILESTONES.map((step) => ({ id: step.id, label: step.label, description: step.description }))

const documents = computed(() =>
  (study.value?.documents ?? []).map((document) => ({
    id: document.id,
    label: document.title,
    description: document.filed,
  })),
)

function tone(status: StudyStatus) {
  if (status === 'Open') return 'success' as const
  if (status === 'Paused') return 'warning' as const
  return 'neutral' as const
}

function onFiles(detail: { files: File[] }) {
  const current = study.value
  const file = detail.files[0]
  if (!current || !file) return
  fileDocument(current.id, file.name)
  showToast({ title: 'Document filed', description: `${file.name} is on the shelf.`, variant: 'success' })
}
</script>

<template>
  <PageHead
    v-if="study"
    :title="study.title"
    :lede="`${study.mark} · ${study.lead}`"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Studies', to: `${BASE_PATH}/studies` }, { label: study.title }]"
  />
  <EmptyState v-else title="Study missing" description="That shelf number is not on the desk." icon="search" />
  <div v-if="study" class="sh-record">
    <Status :label="study.status" :tone="tone(study.status)" />
    <DescriptionList
      :items="[
        { term: 'Kind', description: study.kind },
        { term: 'Lead', description: study.lead },
        { term: 'Sites', description: study.sites },
        { term: 'Standing', description: study.status },
      ]"
    />
    <div class="sh-step">
      <Stepper :steps="steps" :active-index="study.milestone" />
    </div>
    <h2>Documents</h2>
    <EmptyState
      v-if="study.documents.length === 0"
      title="No documents"
      description="Nothing is filed on this study yet."
      icon="search"
    />
    <List v-else :items="documents" />
    <FileUpload label="File a document" accept=".pdf,.png,.txt" @files-change="onFiles" />
    <h2>Shelf log</h2>
    <Timeline :items="study.log" />
    <ButtonGroup>
      <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/studies`)">Back to studies</Button>
    </ButtonGroup>
  </div>
</template>
