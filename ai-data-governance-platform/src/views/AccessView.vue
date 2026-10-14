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
import { ACCESS_STEPS, BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useGovernance } from '../stores/governance.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useGovernance();
const status = ref('all');
const rangeStart = ref('2026-10-01');
const rangeEnd = ref('2026-10-31');
const selectedId = ref('req-1');

const rows = computed(() =>
  store.requests.filter((item) => {
    const matchesStatus = status.value === 'all' || item.status === status.value;
    const matchesRange = item.needed >= rangeStart.value && item.needed <= rangeEnd.value;
    return matchesStatus && matchesRange;
  }),
);

const selected = computed(() => rows.value.find((item) => item.id === selectedId.value) || rows.value[0] || null);
const stepIndex = computed(() => {
  const index = ACCESS_STEPS.findIndex((step) => step.id === selected.value?.step);
  return index < 0 ? 0 : index;
});

const tableRows = computed(() =>
  rows.value.map((item) => ({
    asset: item.asset,
    requester: item.requester,
    owner: item.owner,
    status: item.status,
    needed: formatDate(item.needed),
  })),
);

const timeline = computed(() =>
  rows.value.map((item) => ({
    id: item.id,
    title: item.asset,
    description: `${item.requester} · ${item.purpose}`,
    time: formatDate(item.needed),
  })),
);

function decide(next) {
  if (!selected.value) return;
  store.decideRequest(selected.value.id, next);
  showToast({
    title: next === 'granted' ? 'Access granted' : 'Request denied',
    description: `${selected.value.asset} · ${selected.value.requester}`,
    variant: next === 'granted' ? 'success' : 'warning',
  });
}
</script>

<template>
  <div class="cbt-page">
    <PageHeader
      title="Access"
      description="Requests waiting on a steward, and the ones already decided."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Access' }]"
    />

    <div class="cbt-filter-bar">
      <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" label="Needed by" />
      <SegmentedControl
        v-model="status"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'requested', label: 'Requested' },
          { value: 'review', label: 'Review' },
          { value: 'granted', label: 'Granted' },
          { value: 'denied', label: 'Denied' },
        ]"
      />
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Requests" subtitle="Pick a row, then grant or deny">
          <div class="cbt-table-block">
            <DataTable
              :columns="[
                { key: 'asset', label: 'Asset', sortable: true },
                { key: 'requester', label: 'Requester' },
                { key: 'owner', label: 'Owner' },
                { key: 'status', label: 'Status' },
                { key: 'needed', label: 'Needed' },
              ]"
              :rows="tableRows"
              striped
            />
          </div>
          <div class="cbt-inline-badges">
            <button
              v-for="item in rows"
              :key="item.id"
              type="button"
              class="cbt-inline-link"
              :class="{ 'is-active': selected?.id === item.id }"
              @click="selectedId = item.id"
            >
              {{ item.requester }}
              <StatusBadge :status="item.status" />
            </button>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection v-if="selected" :title="selected.asset" :subtitle="selected.purpose">
          <Stepper :steps="ACCESS_STEPS" :active-index="stepIndex" />
          <p class="cbt-subtle">{{ selected.requester }} asked {{ selected.owner }} · needed {{ formatDate(selected.needed) }}</p>
          <div class="cbt-page-actions">
            <Button size="sm" icon="check" @click="decide('granted')">Grant</Button>
            <Button size="sm" variant="secondary" icon="x" @click="decide('denied')">Deny</Button>
            <Button
              size="sm"
              variant="tertiary"
              icon-trailing="chevron-right"
              @click="router.push(`${BASE_PATH}/catalog/${selected.assetId}`)"
            >
              Open asset
            </Button>
          </div>
          <Timeline class="mt-3" :items="timeline" />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
