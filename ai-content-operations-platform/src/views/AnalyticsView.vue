<script setup>
import { computed } from 'vue';
import { Stat } from '@poluru-labs/enterprise-design-system-vue';
import overview from '../data/overview.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useContent } from '../stores/content.js';
import AreaChart from '../components/charts/AreaChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';

const store = useContent();
const reach = computed(() =>
  store.channels.map((item) => ({
    name: item.name,
    value: item.reach,
    color: '#102E50',
  })),
);
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Analytics"
      description="Measure what shipped and what is still filling the calendar."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Analytics' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Published" :value="store.published.length" icon="bi-check2-circle" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Fill" :value="`${store.calendarFill}%`" icon="bi-bar-chart" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Reviews" :value="store.reviews.length" icon="bi-inboxes" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <Stat label="Desk owner" value="Ananya Poluru" />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Output" subtitle="Published vs scheduled">
          <AreaChart :labels="overview.publishTrend.labels" :series="overview.publishTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Mix" subtitle="Pieces by channel">
          <DonutChart :items="overview.channelMix" center-label="Pieces" :center-value="String(store.pieces.length)" />
        </ChartSection>
      </div>
    </div>

    <ChartSection title="Reach by channel" subtitle="Monthly readers and followers">
      <BarChart :items="reach" />
    </ChartSection>
  </div>
</template>
