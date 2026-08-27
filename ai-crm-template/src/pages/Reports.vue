<script setup>
import { ref } from 'vue';
import { Card, DataTable, DateRangePicker, ProgressBar, SegmentedControl, Stat } from '@poluru-labs/enterprise-design-system-vue';
import { kpis, reportColumns, reportRows } from '../data';

const start = ref('2026-06-01');
const end = ref('2026-08-27');
const grain = ref('rep');
</script>

<template>
  <header class="page-head">
    <div>
      <span class="eyebrow">Forecast</span>
      <h1>Reports</h1>
      <p>Commit vs pipeline by rep. Priya Poluru is at 78% of $1.20M with Harbor still in the number.</p>
    </div>
    <SegmentedControl
      v-model="grain"
      :segments="[
        { value: 'rep', label: 'By rep' },
        { value: 'region', label: 'By region' },
      ]"
    />
  </header>

  <Card class="mb-3">
    <DateRangePicker v-model:start="start" v-model:end="end" label="Range" />
  </Card>

  <section class="metrics">
    <Card v-for="item in kpis" :key="item.label">
      <Stat :label="item.label" :value="item.value" :hint="item.hint" :trend="item.trend" :trend-value="item.trendValue" />
    </Card>
  </section>

  <Card :title="grain === 'rep' ? 'Attainment by Poluru' : 'Americas vs EMEA'">
    <ProgressBar class="mb-3" label="Team quota" :value="78" show-value />
    <DataTable :columns="reportColumns" :rows="reportRows" sortable striped />
  </Card>
</template>
