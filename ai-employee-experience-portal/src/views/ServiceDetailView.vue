<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  CodeSnippet,
  DescriptionList,
  EmptyState,
  FileUpload,
  Link,
  Popover,
  ProgressBar,
  Rating,
  Skeleton,
  Slider,
  Stepper,
  Tabs,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, REQUEST_STEPS } from '../constants/navigation.js';
import { useExperience } from '../stores/experience.js';
import { formatDate, scoreBand } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useExperience();
const tab = ref('notes');
const noteOpen = ref(false);
const mapReady = ref(false);

const service = computed(() => store.serviceById(route.params.id));
const notes = computed(() => (service.value ? store.feedbackFor(service.value.id) : []));
const stepIndex = computed(() => {
  const current = notes.value[0];
  const index = REQUEST_STEPS.findIndex((step) => step.id === current?.step);
  return index < 0 ? 0 : index;
});

const facts = computed(() => {
  if (!service.value) return [];
  return [
    { term: 'Owner', description: service.value.owner },
    { term: 'Category', description: service.value.category },
    { term: 'Site', description: service.value.site },
    { term: 'Status', description: service.value.status },
    { term: 'Wait', description: `${service.value.wait} days` },
    { term: 'Score', description: String(service.value.score) },
  ];
});

const timeline = computed(() =>
  notes.value.map((item) => ({
    id: item.id,
    title: item.topic,
    description: `${item.author} · ${item.note}`,
    time: formatDate(item.opened),
  })),
);

function onScore(value) {
  if (!service.value) return;
  store.updateService(service.value.id, { score: value });
}

function onFiles(detail) {
  const count = detail?.files?.length || 0;
  showToast({
    title: count ? 'Guide attached' : 'No file selected',
    description: count ? `${count} file ready for the owner.` : 'Choose a guide to attach.',
    variant: count ? 'success' : 'info',
  });
}

function loadMap() {
  mapReady.value = false;
  window.setTimeout(() => {
    mapReady.value = true;
  }, 500);
}
</script>

<template>
  <div class="hrt-page">
    <EmptyState v-if="!service" title="Service not in the lobby" description="It may have been removed from this session." icon="search" />

    <template v-else>
      <PageHeader
        :title="service.name"
        :description="service.description"
        :crumbs="[BREADCRUMB_ROOT, { label: 'Services', to: `${BASE_PATH}/services` }, { label: service.name }]"
      >
        <template #actions>
          <StatusBadge :status="service.status" />
          <StatusBadge :status="scoreBand(service.score)" />
          <Popover v-model:open="noteOpen" heading="Owner note" placement="bottom">
            <template #trigger>
              <button type="button" class="hrt-text-btn">Owner note</button>
            </template>
            <p class="mb-0">{{ service.owner }} reviews this service for {{ service.site }}.</p>
          </Popover>
        </template>
      </PageHeader>

      <div class="row g-3 mb-3">
        <div class="col-12 col-xl-7">
          <ChartSection title="Service facts" :subtitle="service.externalId">
            <DescriptionList :items="facts" />
            <div class="hrt-snippet">
              <p class="hrt-subtle">External id</p>
              <CodeSnippet :code="service.externalId" language="text" />
            </div>
          </ChartSection>
        </div>
        <div class="col-12 col-xl-5">
          <ChartSection title="Score" subtitle="Drag to record this week’s score">
            <div class="hrt-stack">
              <Slider :model-value="service.score" label="Service score" :min="1" :max="5" :step="1" show-value @update:model-value="onScore" />
              <ProgressBar label="Score" :value="Math.round((service.score / 5) * 100)" show-value />
              <Rating :model-value="Math.max(1, Math.round(service.score))" label="Employee rating" read-only />
              <p class="hrt-subtle mb-0">
                Typical wait {{ service.wait }} days
                <span @click.capture="router.push(`${BASE_PATH}/feedback`); $event.preventDefault()">
                  <Link :href="`${BASE_PATH}/feedback`">Open feedback</Link>
                </span>
              </p>
            </div>
          </ChartSection>
        </div>
      </div>

      <Tabs
        v-model="tab"
        :items="[
          { id: 'notes', label: 'Notes' },
          { id: 'request', label: 'Request' },
          { id: 'files', label: 'Files' },
          { id: 'map', label: 'Map' },
        ]"
      />

      <div class="row g-3 mt-1">
        <div v-if="tab === 'notes'" class="col-12">
          <ChartSection title="Notes" subtitle="Feedback tied to this service">
            <Timeline v-if="timeline.length" :items="timeline" />
            <p v-else class="hrt-subtle mb-0">No notes yet.</p>
          </ChartSection>
        </div>
        <div v-else-if="tab === 'request'" class="col-12">
          <ChartSection title="Latest request" :subtitle="notes[0]?.topic || 'No open request.'">
            <Stepper v-if="notes.length" :steps="REQUEST_STEPS" :active-index="stepIndex" />
            <p v-else class="hrt-subtle mb-0">No one has asked yet.</p>
          </ChartSection>
        </div>
        <div v-else-if="tab === 'files'" class="col-12">
          <ChartSection title="Guide" subtitle="Attach the one-pager the owner shares">
            <FileUpload label="Service guide" hint="PDF or DOCX" accept=".pdf,.docx" @files-change="onFiles" />
          </ChartSection>
        </div>
        <div v-else class="col-12">
          <ChartSection title="Floor notes" :subtitle="`${service.site} · ${service.owner}`">
            <button type="button" class="hrt-text-btn" @click="loadMap">Load floor notes</button>
            <div v-if="!mapReady" class="hrt-stack mt-3">
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="rectangular" width="100%" height="72px" />
            </div>
            <p v-else class="hrt-subtle mt-3 mb-0">{{ service.site }} desks for {{ service.name }} are labeled with {{ service.owner }}.</p>
          </ChartSection>
        </div>
      </div>
    </template>
  </div>
</template>
