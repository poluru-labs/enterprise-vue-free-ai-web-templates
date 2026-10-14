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
  Slider,
  Stepper,
  Tabs,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, RELEASE_STEPS } from '../constants/navigation.js';
import { useDevops } from '../stores/devops.js';
import { formatDate, formatDateTime, formatPercent } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useDevops();
const tab = ref('runs');
const noteOpen = ref(false);

const pipeline = computed(() => store.getPipeline(route.params.id));
const deploys = computed(() => store.deployments.filter((item) => item.pipelineId === pipeline.value?.id));
const stepIndex = computed(() => {
  const index = RELEASE_STEPS.findIndex((step) => step.id === deploys.value[0]?.step);
  return index < 0 ? 0 : index;
});

const facts = computed(() => {
  if (!pipeline.value) return [];
  return [
    { term: 'Owner', description: pipeline.value.owner },
    { term: 'Service', description: pipeline.value.service },
    { term: 'Branch', description: pipeline.value.branch },
    { term: 'Environment', description: pipeline.value.environment },
    { term: 'Region', description: pipeline.value.region },
    { term: 'Duration', description: `${pipeline.value.durationMin} min` },
    { term: 'Last run', description: formatDateTime(pipeline.value.lastRun) },
    { term: 'Success', description: formatPercent(pipeline.value.success) },
  ];
});

const timeline = computed(() =>
  deploys.value.map((item) => ({
    id: item.id,
    title: item.version,
    description: `${item.owner} · ${item.note}`,
    time: formatDate(item.started),
  })),
);

function onSuccess(value) {
  if (!pipeline.value) return;
  store.updatePipeline(pipeline.value.id, { success: value });
}

function onFiles(detail) {
  const count = detail?.files?.length || 0;
  showToast({
    title: count ? 'Release note attached' : 'No file selected',
    description: count ? `${count} file ready for the release lead.` : 'Choose a note to attach.',
    variant: count ? 'success' : 'info',
  });
}
</script>

<template>
  <div class="tde-page">
    <EmptyState v-if="!pipeline" title="Pipeline not on the board" description="It may have been removed from this session." icon="search" />

    <template v-else>
      <PageHeader
        :title="pipeline.name"
        :description="pipeline.description"
        :crumbs="[BREADCRUMB_ROOT, { label: 'Pipelines', to: `${BASE_PATH}/pipelines` }, { label: pipeline.name }]"
      >
        <template #actions>
          <StatusBadge :status="pipeline.status" />
          <Popover v-model:open="noteOpen" heading="Release note" placement="bottom">
            <template #trigger>
              <button type="button" class="tde-text-btn">Release note</button>
            </template>
            <p class="mb-0">{{ pipeline.owner }} owns this pipeline in {{ pipeline.environment }}.</p>
          </Popover>
        </template>
      </PageHeader>

      <div class="row g-3 mb-3">
        <div class="col-12 col-xl-7">
          <ChartSection title="Pipeline facts" :subtitle="pipeline.externalId">
            <DescriptionList :items="facts" />
            <div class="tde-snippet">
              <p class="tde-subtle">External id</p>
              <CodeSnippet :code="pipeline.externalId" language="text" />
            </div>
          </ChartSection>
        </div>
        <div class="col-12 col-xl-5">
          <ChartSection title="Success" subtitle="Drag to record this morning’s rate">
            <div class="tde-stack">
              <Slider :model-value="pipeline.success" label="Success rate" :min="0" :max="100" show-value @update:model-value="onSuccess" />
              <ProgressBar label="Success" :value="pipeline.success" show-value />
              <Rating :model-value="Math.max(1, Math.round(pipeline.success / 20))" label="Release confidence" read-only />
              <p class="tde-subtle mb-0">
                Last run {{ formatDateTime(pipeline.lastRun) }}
                <span @click.capture="router.push(`${BASE_PATH}/deployments`); $event.preventDefault()">
                  <Link :href="`${BASE_PATH}/deployments`">Open deployments</Link>
                </span>
              </p>
            </div>
          </ChartSection>
        </div>
      </div>

      <Tabs
        v-model="tab"
        :items="[
          { id: 'runs', label: 'Runs' },
          { id: 'release', label: 'Release' },
          { id: 'files', label: 'Files' },
        ]"
      />

      <div class="row g-3 mt-1">
        <div v-if="tab === 'runs'" class="col-12">
          <ChartSection title="Recent deploys" subtitle="Versions shipped from this pipeline">
            <Timeline v-if="timeline.length" :items="timeline" />
            <p v-else class="tde-subtle mb-0">No deploys yet.</p>
          </ChartSection>
        </div>
        <div v-else-if="tab === 'release'" class="col-12">
          <ChartSection title="Release" :subtitle="deploys[0]?.note || 'No open release.'">
            <Stepper v-if="deploys.length" :steps="RELEASE_STEPS" :active-index="stepIndex" />
            <p v-else class="tde-subtle mb-0">Nothing is queued for this pipeline.</p>
          </ChartSection>
        </div>
        <div v-else class="col-12">
          <ChartSection title="Release note" subtitle="Attach the note the release lead reviews">
            <FileUpload label="Release note" hint="Markdown or PDF" accept=".md,.pdf" @files-change="onFiles" />
          </ChartSection>
        </div>
      </div>
    </template>
  </div>
</template>
