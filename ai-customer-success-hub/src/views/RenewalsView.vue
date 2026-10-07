<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  DataTable,
  DateRangePicker,
  Meter,
  SegmentedControl,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useSuccess } from '../stores/success.js';
import { formatDate, formatMoney } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useSuccess();
const stage = ref('all');
const rangeStart = ref('2026-10-01');
const rangeEnd = ref('2026-12-31');

const rows = computed(() =>
  store.renewals.filter((item) => {
    const inStage = stage.value === 'all' || item.stage === stage.value;
    const inRange = item.date >= rangeStart.value && item.date <= rangeEnd.value;
    return inStage && inRange;
  }),
);

const tableRows = computed(() =>
  rows.value.map((item) => ({
    account: item.account,
    owner: item.owner,
    arr: formatMoney(item.arr),
    date: formatDate(item.date),
    stage: item.stage.replaceAll('_', ' '),
    probability: `${item.probability}%`,
  })),
);

const timeline = computed(() =>
  rows.value.map((item) => ({
    title: item.account,
    description: `${item.owner} · ${item.note}`,
    time: formatDate(item.date),
  })),
);

const committed = computed(() =>
  Math.round(
    (rows.value.filter((item) => item.stage === 'committed' || item.stage === 'renewed').reduce((sum, item) => sum + item.arr, 0)
      / Math.max(1, rows.value.reduce((sum, item) => sum + item.arr, 0)))
      * 100,
  ),
);
</script>

<template>
  <div class="mrg-page">
    <PageHeader
      title="Renewals"
      description="Dates, stage, and probability for the open book."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Renewals' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="In window" :value="rows.length" icon="bi-calendar3" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="At risk"
          :value="rows.filter((item) => item.stage === 'at_risk').length"
          icon="bi-exclamation-circle"
          tone="danger"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="ARR in view" :value="formatMoney(rows.reduce((sum, item) => sum + item.arr, 0))" icon="bi-cash" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Committed" :value="`${committed}%`" icon="bi-check2-circle" tone="success" />
      </div>
    </div>

    <div class="mrg-filter-bar">
      <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" label="Window" />
      <SegmentedControl
        v-model="stage"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'committed', label: 'Committed' },
          { value: 'negotiating', label: 'Negotiating' },
          { value: 'at_risk', label: 'At risk' },
        ]"
      />
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-8">
        <ChartSection title="Renewal table" subtitle="Click a row’s account from the timeline to open it">
          <Meter :value="committed" :max="100" label="Committed ARR in this window" show-value />
          <div class="mrg-table-block">
            <DataTable
              :columns="[
                { key: 'account', label: 'Account', sortable: true },
                { key: 'owner', label: 'Owner' },
                { key: 'arr', label: 'ARR' },
                { key: 'date', label: 'Date' },
                { key: 'stage', label: 'Stage' },
                { key: 'probability', label: 'Probability' },
              ]"
              :rows="tableRows"
              striped
            />
          </div>
          <div class="mrg-inline-badges">
            <button
              v-for="item in rows"
              :key="item.id"
              type="button"
              class="mrg-inline-link"
              @click="router.push(`${BASE_PATH}/accounts/${item.accountId}`)"
            >
              {{ item.account }}
              <StatusBadge :status="item.stage" />
            </button>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Sequence" subtitle="Ordered by date">
          <Timeline :items="timeline" />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
