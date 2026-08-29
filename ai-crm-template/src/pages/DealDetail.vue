<script setup>
import { computed, reactive, ref, watch } from 'vue';
import {
  Accordion,
  Badge,
  Breadcrumb,
  Button,
  Card,
  DescriptionList,
  FileUpload,
  ProgressBar,
  Rating,
  Slider,
  Status,
  Stepper,
  Tabs,
  Tag,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { findDeal, playbooks, stages, timelineItems } from '../data';
import { route } from '../ui';

const emit = defineEmits(['log-activity']);
const tab = ref('notes');
const notes = ref('Meera Poluru asked for a 15-minute working session before 17:00.');
const quality = ref(4);
const probability = ref(70);

const deal = computed(() => findDeal(route.value.id));
watch(
  () => deal.value.probability,
  (value) => {
    probability.value = value;
  },
  { immediate: true },
);
const crumbs = computed(() => [
  { label: 'Deals', href: '#/deals' },
  { label: deal.value.name },
]);
const facts = computed(() => [
  { term: 'Account', description: deal.value.account },
  { term: 'Owner', description: deal.value.owner },
  { term: 'Contact', description: deal.value.contact },
  { term: 'Close date', description: deal.value.close },
  { term: 'Source', description: deal.value.source },
  { term: 'Next step', description: deal.value.next },
]);
const activeStep = computed(() => Math.max(0, stages.indexOf(deal.value.stage)));
const steps = stages.map((label, index) => ({ id: String(index), label }));
const history = reactive([...timelineItems]);

function saveNotes() {
  history.unshift({
    id: `note-${Date.now()}`,
    title: `${deal.value.owner} added a note`,
    description: notes.value,
    time: 'Just now',
  });
  showToast({ title: 'Notes saved', description: 'Priya Poluru’s working session is on the deal.', variant: 'success' });
}
</script>

<template>
  <Breadcrumb :items="crumbs" />
  <header class="page-head">
    <div>
      <span class="eyebrow">Opportunity</span>
      <h1>{{ deal.name }}</h1>
      <p>{{ deal.value }} · {{ deal.owner }} · next: {{ deal.next }}</p>
    </div>
    <div class="row">
      <Status :label="deal.stage" :tone="deal.stage === 'Closed won' ? 'success' : 'info'" />
      <Badge :label="deal.value" variant="brand" pill />
      <Button variant="secondary" @click="emit('log-activity')">Log activity</Button>
    </div>
  </header>

  <Stepper :steps="steps" :active-index="activeStep" />

  <div class="grid-2" style="margin-top: 1rem">
    <div class="stack">
      <Card title="Deal health">
        <ProgressBar label="Win probability" :value="probability" show-value />
        <Slider class="mt-3" v-model="probability" label="Adjust probability" :min="10" :max="100" :step="5" show-value />
        <div class="row" style="margin-top: 0.85rem">
          <span class="muted">Quality</span>
          <Rating v-model="quality" label="Deal quality" />
        </div>
      </Card>
      <Card title="Record">
        <DescriptionList :items="facts" />
      </Card>
      <Card title="Coaching">
        <Accordion :items="playbooks" multiple />
      </Card>
    </div>
    <Card title="Workspace">
      <Tabs
        v-model="tab"
        :items="[
          { id: 'notes', label: 'Notes' },
          { id: 'files', label: 'Files' },
          { id: 'history', label: 'History' },
        ]"
      >
        <template #default="{ active }">
          <div v-if="active === 'notes'" class="stack">
            <Textarea v-model="notes" label="Latest note" rows="5" />
            <Button size="sm" @click="saveNotes">Save note</Button>
          </div>
          <div v-else-if="active === 'files'" class="stack">
            <FileUpload label="Add an attachment" multiple hint="PDF, DOCX, or PPTX" />
            <Tag label="Harbor-redlines.pdf" icon="file" removable />
          </div>
          <Timeline v-else :items="history" />
        </template>
      </Tabs>
    </Card>
  </div>
</template>
