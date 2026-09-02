<script setup>
import { computed, ref } from 'vue';
import { DateRangePicker, SegmentedControl } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import overview from '../data/overview.json';
import reports from '../data/reports.json';
import AreaChart from '../components/charts/AreaChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';

const start = ref(reports.range.start);
const end = ref(reports.range.end);
const grain = ref('rep');

const reportColumns = [
  { key: 'name', label: 'Rep' },
  { key: 'closed', label: 'Closed' },
  { key: 'pipeline', label: 'Pipeline' },
  { key: 'quota', label: 'Quota' },
  { key: 'trend', label: 'Trend' },
];

const rows = computed(() =>
  grain.value === 'rep'
    ? overview.teamBoard.map((row) => ({
        name: row.name,
        closed: row.closed,
        pipeline: row.pipeline,
        quota: `${row.quota}%`,
        trend: row.trend,
      }))
    : reports.regionRows,
);
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Reports"
      description="Commit vs pipeline by rep. Priya Poluru is at 78% of $1.20M with Harbor still in the number."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Reports' }]"
    >
      <template #actions>
        <SegmentedControl
          v-model="grain"
          :segments="[
            { value: 'rep', label: 'By rep' },
            { value: 'region', label: 'By region' },
          ]"
        />
      </template>
    </PageHeader>

    <ChartSection class="mb-3" title="Range" subtitle="Forecast window">
      <DateRangePicker v-model:start="start" v-model:end="end" label="Range" />
    </ChartSection>

    <div class="row g-3 mb-3">
      <div v-for="item in overview.kpis.slice(0, 4)" :key="item.id" class="col-12 col-sm-6 col-xl-3">
        <StatCard
          :label="item.label"
          :value="item.value"
          :hint="item.hint"
          :trend="item.trend"
          :trend-value="item.trendValue"
          :icon="item.icon"
          :tone="item.tone"
          :sparkline="item.sparkline"
        />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-6">
        <ChartSection title="Quota attained" subtitle="Working set by owner">
          <BarChart :items="reports.forecastBars" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-6">
        <ChartSection title="Coverage" subtitle="Commit vs best case">
          <AreaChart :labels="reports.coverage.labels" :series="reports.coverage.series" />
        </ChartSection>
      </div>
    </div>

    <ChartSection :title="grain === 'rep' ? 'Attainment by Poluru' : 'Americas vs EMEA vs APAC'">
      <DataTable :columns="reportColumns" :rows="rows" />
    </ChartSection>
  </div>
</template>
