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
import { ACCESS_STEPS, BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useGovernance } from '../stores/governance.js';
import { formatDate, formatNumber, qualityBand } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useGovernance();
const tab = ref('checks');
const noteOpen = ref(false);

const asset = computed(() => store.getAsset(route.params.id));
const checks = computed(() => store.quality.filter((item) => item.assetId === asset.value?.id));
const requests = computed(() => store.requests.filter((item) => item.assetId === asset.value?.id));
const stepIndex = computed(() => {
  const current = requests.value[0];
  const index = ACCESS_STEPS.findIndex((step) => step.id === current?.step);
  return index < 0 ? 0 : index;
});

const facts = computed(() => {
  if (!asset.value) return [];
  return [
    { term: 'Owner', description: asset.value.owner },
    { term: 'Steward', description: asset.value.steward },
    { term: 'Domain', description: asset.value.domain },
    { term: 'System', description: asset.value.system },
    { term: 'Rows', description: formatNumber(asset.value.rows) },
    { term: 'Freshness', description: formatDate(asset.value.freshness) },
    { term: 'Classification', description: asset.value.classification },
    { term: 'Quality', description: String(asset.value.quality) },
  ];
});

const timeline = computed(() =>
  checks.value.map((item) => ({
    id: item.id,
    title: item.check,
    description: `${item.owner} · score ${item.score}`,
    time: formatDate(item.ran),
  })),
);

function onQuality(value) {
  if (!asset.value) return;
  store.updateAsset(asset.value.id, { quality: value });
}

function onFiles(detail) {
  const count = detail?.files?.length || 0;
  showToast({
    title: count ? 'Dictionary attached' : 'No file selected',
    description: count ? `${count} file ready for the steward.` : 'Choose a dictionary to attach.',
    variant: count ? 'success' : 'info',
  });
}
</script>

<template>
  <div class="cbt-page">
    <EmptyState v-if="!asset" title="Asset not in the catalog" description="It may have been removed from this session." icon="search" />

    <template v-else>
      <PageHeader
        :title="asset.name"
        :description="asset.description"
        :crumbs="[BREADCRUMB_ROOT, { label: 'Catalog', to: `${BASE_PATH}/catalog` }, { label: asset.name }]"
      >
        <template #actions>
          <StatusBadge :status="asset.classification" />
          <StatusBadge :status="qualityBand(asset.quality)" />
          <Popover v-model:open="noteOpen" heading="Steward note" placement="bottom">
            <template #trigger>
              <button type="button" class="cbt-text-btn">Steward note</button>
            </template>
            <p class="mb-0">{{ asset.steward }} reviews this asset with {{ asset.owner }}.</p>
          </Popover>
        </template>
      </PageHeader>

      <div class="row g-3 mb-3">
        <div class="col-12 col-xl-7">
          <ChartSection title="Asset facts" :subtitle="asset.externalId">
            <DescriptionList :items="facts" />
            <div class="cbt-snippet">
              <p class="cbt-subtle">External id</p>
              <CodeSnippet :code="asset.externalId" language="text" />
            </div>
          </ChartSection>
        </div>
        <div class="col-12 col-xl-5">
          <ChartSection title="Quality" subtitle="Drag to record this week’s score">
            <div class="cbt-stack">
              <Slider :model-value="asset.quality" label="Quality score" :min="0" :max="100" show-value @update:model-value="onQuality" />
              <ProgressBar label="Quality" :value="asset.quality" show-value />
              <Rating :model-value="Math.max(1, Math.round(asset.quality / 20))" label="Steward confidence" read-only />
              <p class="cbt-subtle mb-0">
                Last refresh {{ formatDate(asset.freshness) }}
                <span @click.capture="router.push(`${BASE_PATH}/quality`); $event.preventDefault()">
                  <Link :href="`${BASE_PATH}/quality`">Open quality</Link>
                </span>
              </p>
            </div>
          </ChartSection>
        </div>
      </div>

      <Tabs
        v-model="tab"
        :items="[
          { id: 'checks', label: 'Checks' },
          { id: 'access', label: 'Access' },
          { id: 'files', label: 'Files' },
        ]"
      />

      <div class="row g-3 mt-1">
        <div v-if="tab === 'checks'" class="col-12">
          <ChartSection title="Checks" subtitle="Latest runs for this asset">
            <Timeline v-if="timeline.length" :items="timeline" />
            <p v-else class="cbt-subtle mb-0">No checks yet.</p>
          </ChartSection>
        </div>
        <div v-else-if="tab === 'access'" class="col-12">
          <ChartSection title="Access" :subtitle="requests[0]?.purpose || 'No open request.'">
            <Stepper v-if="requests.length" :steps="ACCESS_STEPS" :active-index="stepIndex" />
            <p v-else class="cbt-subtle mb-0">No one has asked for this asset.</p>
          </ChartSection>
        </div>
        <div v-else class="col-12">
          <ChartSection title="Dictionary" subtitle="Attach the field list the steward reviews">
            <FileUpload label="Data dictionary" hint="CSV or PDF" accept=".csv,.pdf" @files-change="onFiles" />
          </ChartSection>
        </div>
      </div>
    </template>
  </div>
</template>
