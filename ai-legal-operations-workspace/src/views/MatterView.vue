<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Accordion,
  Avatar,
  Button,
  ButtonGroup,
  Card,
  DescriptionList,
  Divider,
  Drawer,
  List,
  ProgressBar,
  Stepper,
  Tag,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { findMatter } from '@/data/ledger'

const route = useRoute()
const router = useRouter()
const note = ref('')
const fileOpen = ref(false)
const matter = computed(() => findMatter(String(route.params.id ?? '')))

const steps = [
  { id: 'draft', label: 'Draft', description: 'On the desk.' },
  { id: 'review', label: 'Review', description: 'Clauses marked.' },
  { id: 'sign', label: 'Signature', description: 'Waiting on the party.' },
]

const stepIndex = computed(() => {
  const status = matter.value?.status
  if (status === 'Signed' || status === 'Closed') return 2
  if (status === 'Waiting') return 2
  return 1
})

function noteFiled() {
  const current = matter.value
  if (!current) return
  showToast({
    title: 'Note filed',
    description: `${current.number} has a desk note.`,
    variant: 'success',
  })
  note.value = ''
}

function remind() {
  const current = matter.value
  if (!current) return
  showToast({
    title: 'Reminder sent',
    description: `${current.owner} will see ${current.number}.`,
    variant: 'info',
  })
}
</script>

<template>
  <PageHead
    v-if="matter"
    :title="matter.number"
    :lede="matter.summary"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Matters', to: '/briefwell/matters' }, { label: matter.number }]"
  >
    <template #actions>
      <ButtonGroup>
        <Button type="button" @click="noteFiled">File a note</Button>
        <Button type="button" variant="secondary" @click="remind">Send reminder</Button>
      </ButtonGroup>
    </template>
  </PageHead>
  <article v-if="matter" class="bw-doc">
    <div class="bw-party">
      <Avatar :name="matter.owner" size="md" />
      <div>
        <p class="bw-quiet">{{ matter.owner }}</p>
        <Tag :label="matter.kind" />
      </div>
    </div>
    <h2>{{ matter.title }}</h2>
    <DescriptionList
      :items="[
        { term: 'Party', description: matter.party },
        { term: 'Owner', description: matter.owner },
        { term: 'Opened', description: matter.opened },
        { term: 'Due', description: matter.due },
        { term: 'Status', description: matter.status },
      ]"
    />
    <Stepper :steps="steps" :active-index="stepIndex" />
    <ProgressBar label="Review" :value="stepIndex === 2 ? 100 : 60" show-value />
    <Divider />
    <h2>Clauses</h2>
    <Accordion :items="matter.clauses" />
    <h2>Dates</h2>
    <Timeline :items="matter.dates" />
    <h2>Files</h2>
    <List :items="matter.files" />
    <Card title="Signature page" :description="`Due ${matter.due}. ${matter.party} returns this page.`">
      <Button type="button" variant="secondary" @click="fileOpen = true">Open the page</Button>
    </Card>
    <Textarea v-model="note" label="Desk note" />
    <Button type="button" variant="secondary" @click="router.push('/briefwell/matters')">Back to matters</Button>
    <Drawer v-model:open="fileOpen" heading="Signature page" size="md">
      <p>{{ matter.number }} · {{ matter.title }}</p>
      <p v-for="file in matter.files" :key="file.id">{{ file.label }} — {{ file.description }}</p>
    </Drawer>
  </article>
  <p v-else class="bw-quiet">That matter is not in the ledger.</p>
</template>
