<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  Accordion,
  Badge,
  Button,
  FileUpload,
  Rating,
  Slider,
  Tag,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import overview from '../data/overview.json';
import { addDealNote, findDeal, openActivityDrawer, STAGES } from '../stores/crm.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const notes = ref('Meera Poluru asked for a 15-minute working session before 17:00.');
const quality = ref(4);
const probability = ref(70);
const tab = ref('notes');

const deal = computed(() => findDeal(route.params.id));
const crumbs = computed(() => [
  BREADCRUMB_ROOT,
  { label: 'Deals', to: `${BASE_PATH}/deals` },
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
const activeStep = computed(() => Math.max(0, STAGES.indexOf(deal.value.stage)));
const history = computed(() => deal.value.timeline || []);

watch(
  () => deal.value.probability,
  (value) => {
    probability.value = value;
  },
  { immediate: true },
);

function saveNotes() {
  addDealNote(deal.value.id, notes.value);
  showToast({ title: 'Notes saved', description: 'The note is now on this deal’s timeline.', variant: 'success' });
}
</script>

<template>
  <div class="bloom-page">
    <PageHeader :title="deal.name" :description="`${deal.value} · ${deal.owner} · next: ${deal.next}`" :crumbs="crumbs">
      <template #actions>
        <StatusBadge :status="deal.stage" />
        <Badge :label="deal.value" variant="brand" pill />
        <Button variant="secondary" @click="openActivityDrawer()">Log activity</Button>
      </template>
    </PageHeader>

    <ol class="bloom-stepper" :aria-label="`Stage ${deal.stage}`">
      <li v-for="(label, index) in STAGES" :key="label" :class="{ 'is-active': index <= activeStep }">
        {{ label }}
      </li>
    </ol>

    <div class="row g-3">
      <div class="col-12 col-xl-5">
        <div class="bloom-stack">
          <ChartSection title="Deal health">
            <p class="bloom-note">Win probability {{ probability }}%</p>
            <Slider v-model="probability" label="Adjust probability" :min="10" :max="100" :step="5" show-value />
            <div class="bloom-row" style="margin-top: 0.85rem">
              <span class="bloom-muted">Quality</span>
              <Rating v-model="quality" label="Deal quality" />
            </div>
          </ChartSection>
          <ChartSection title="Record">
            <dl class="bloom-facts">
              <div v-for="item in facts" :key="item.term">
                <dt>{{ item.term }}</dt>
                <dd>{{ item.description }}</dd>
              </div>
            </dl>
          </ChartSection>
          <ChartSection title="Coaching">
            <Accordion :items="overview.playbooks" multiple />
          </ChartSection>
        </div>
      </div>
      <div class="col-12 col-xl-7">
        <ChartSection title="Workspace">
          <div class="bloom-tab-row">
            <button type="button" :class="{ 'is-active': tab === 'notes' }" @click="tab = 'notes'">Notes</button>
            <button type="button" :class="{ 'is-active': tab === 'files' }" @click="tab = 'files'">Files</button>
            <button type="button" :class="{ 'is-active': tab === 'history' }" @click="tab = 'history'">History</button>
          </div>
          <div v-if="tab === 'notes'" class="bloom-stack">
            <Textarea v-model="notes" label="Latest note" rows="5" />
            <Button size="sm" @click="saveNotes">Save note</Button>
          </div>
          <div v-else-if="tab === 'files'" class="bloom-stack">
            <FileUpload label="Add an attachment" multiple hint="PDF, DOCX, or PPTX" />
            <Tag label="Harbor-redlines.pdf" icon="file" removable />
          </div>
          <Timeline v-else :items="history" />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
