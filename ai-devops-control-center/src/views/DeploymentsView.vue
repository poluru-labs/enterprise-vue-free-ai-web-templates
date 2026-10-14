<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Button,
  DataTable,
  DateRangePicker,
  SegmentedControl,
  Stepper,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, RELEASE_STEPS } from '../constants/navigation.js';
import { useDevops } from '../stores/devops.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useDevops();
const status = ref('all');
const rangeStart = ref('2026-10-01');
const rangeEnd = ref('2026-10-31');
const selectedId = ref('dep-3');

const rows = computed(() =>
  store.deployments.filter((item) => {
    const matchesStatus = status.value === 'all' || item.status === status.value;
    const matchesRange = item.started >= rangeStart.value && item.started <= rangeEnd.value;
    return matchesStatus && matchesRange;
  }),
);

const selected = computed(() => rows.value.find((item) => item.id === selectedId.value) || rows.value[0] || null);
const stepIndex = computed(() => {
  const index = RELEASE_STEPS.findIndex((step) => step.id === selected.value?.step);
  return index < 0 ? 0 : index;
});

const tableRows = computed(() =>
  rows.value.map((item) => ({
    service: item.service,
    owner: item.owner,
    environment: item.environment,
    version: item.version,
    status: item.status,
    started: formatDate(item.started),
  })),
);

const timeline = computed(() =>
  rows.value.map((item) => ({
    id: item.id,
    title: item.service,
    description: `${item.owner} · ${item.note}`,
    time: formatDate(item.started),
  })),
);

function decide(next) {
  if (!selected.value) return;
  store.decideDeploy(selected.value.id, next);
  showToast({
    title: next === 'shipped' ? 'Deploy shipped' : 'Deploy marked failed',
    description: `${selected.value.service} · ${selected.value.owner}`,
    variant: next === 'shipped' ? 'success' : 'warning',
  });
}
</script>

<template>
  <div class="tde-page">
    <PageHeader
      title="Deployments"
      description="What is queued, rolling, shipped, or failed."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Deployments' }]"
    />

    <div class="tde-filter-bar">
      <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" label="Started" />
      <SegmentedControl
        v-model="status"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'queued', label: 'Queued' },
          { value: 'rolling', label: 'Rolling' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'failed', label: 'Failed' },
        ]"
      />
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Release table" subtitle="Pick a deploy, then ship or fail it">
          <div class="tde-table-block">
            <DataTable
              :columns="[
                { key: 'service', label: 'Service', sortable: true },
                { key: 'owner', label: 'Owner' },
                { key: 'environment', label: 'Environment' },
                { key: 'version', label: 'Version' },
                { key: 'status', label: 'Status' },
                { key: 'started', label: 'Started' },
              ]"
              :rows="tableRows"
              striped
            />
          </div>
          <div class="tde-inline-badges">
            <button
              v-for="item in rows"
              :key="item.id"
              type="button"
              class="tde-inline-link"
              :class="{ 'is-active': selected?.id === item.id }"
              @click="selectedId = item.id"
            >
              {{ item.service }}
              <StatusBadge :status="item.status" />
            </button>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection v-if="selected" :title="selected.service" :subtitle="selected.note">
          <Stepper :steps="RELEASE_STEPS" :active-index="stepIndex" />
          <p class="tde-subtle">{{ selected.owner }} · {{ selected.environment }} · {{ selected.version }}</p>
          <div class="tde-page-actions">
            <Button size="sm" icon="check" @click="decide('shipped')">Ship</Button>
            <Button size="sm" variant="secondary" icon="x" @click="decide('failed')">Fail</Button>
            <Button
              size="sm"
              variant="tertiary"
              icon-trailing="chevron-right"
              @click="router.push(`${BASE_PATH}/pipelines/${selected.pipelineId}`)"
            >
              Open pipeline
            </Button>
          </div>
          <Timeline class="mt-3" :items="timeline" />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
