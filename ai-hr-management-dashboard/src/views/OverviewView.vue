<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { Alert, Button, showToast } from '@poluru-labs/enterprise-design-system-vue';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHr } from '../stores/hr.js';
import { formatNumber } from '../utils/format.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import PersonCard from '../components/widgets/PersonCard.vue';
import StatCard from '../components/widgets/StatCard.vue';

const router = useRouter();
const store = useHr();

const kpis = computed(() => [
  {
    ...overview.kpis[0],
    value: String(store.headcount),
    hint: `${store.people.filter((item) => item.status === 'active').length} active · ${store.onLeavePeople.length} on leave`,
  },
  {
    ...overview.kpis[1],
    value: String(store.openRolesCount),
    hint: `${store.openReqs.length} live reqs`,
  },
  {
    ...overview.kpis[2],
    value: String(store.onLeaveThisWeek.length),
  },
  overview.kpis[3],
  overview.kpis[4],
  {
    ...overview.kpis[5],
    value: formatNumber(store.learningHours),
  },
]);
</script>

<template>
  <div class="grove-page">
    <PageHeader
      title="People operations"
      description="FY26 Q3 · Sravani Poluru · 18 of Grove’s teammates, 8 open roles, Labor Day on Monday."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <Button
          variant="secondary"
          size="sm"
          icon="download"
          @click="showToast({ title: 'Headcount snapshot queued', variant: 'success' })"
        >
          Export
        </Button>
        <Button size="sm" icon="plus" @click="store.setAddEmployeeOpen(true)">Add employee</Button>
      </template>
    </PageHeader>

    <section class="grove-hero">
      <div>
        <p class="grove-kicker">{{ overview.hero.kicker }}</p>
        <h2>{{ overview.hero.title }}</h2>
        <p>{{ overview.hero.body }}</p>
      </div>
    </section>

    <div class="row g-3 mb-3">
      <div v-for="kpi in kpis" :key="kpi.id" class="col-12 col-sm-6 col-xl-4 col-xxl-2">
        <StatCard
          :label="kpi.label"
          :value="kpi.value"
          :hint="kpi.hint"
          :trend="kpi.trend"
          :trend-value="kpi.trendValue"
          :icon="kpi.icon"
          :tone="kpi.tone"
          :sparkline="kpi.sparkline"
        />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Headcount vs open roles" subtitle="Mar–Sep 2026">
          <AreaChart :labels="overview.headcountTrend.labels" :series="overview.headcountTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Department mix" subtitle="People by org group">
          <DonutChart :items="overview.deptMix" center-label="People" :center-value="String(store.headcount)" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div v-for="person in store.onLeaveThisWeek" :key="person.id" class="col-12 col-md-6 col-xl-4">
        <PersonCard :person="person" />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="This week in Grove" subtitle="Leave, hiring, and learning">
          <template #action>
            <RouterLink class="grove-text-link" :to="`${BASE_PATH}/leave`">Open leave</RouterLink>
          </template>
          <ul class="grove-note-list">
            <li v-for="item in overview.activity" :key="item.title">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.title }}</strong>
                <p class="mb-0">{{ item.description }}</p>
                <span class="grove-subtle">{{ item.timestamp }}</span>
              </div>
            </li>
          </ul>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <section class="grove-panel">
          <header class="grove-panel-header">
            <div>
              <h2>Pending leave</h2>
              <p>Approvals before the Labor Day close.</p>
            </div>
          </header>
          <div class="grove-alert-list grove-panel-body">
            <div v-for="item in store.pendingLeave" :key="item.id" class="grove-alert-item">
              <Alert
                variant="warning"
                :title="item.personName"
                :message="`${item.type} · ${item.start} to ${item.end}`"
              />
              <Button
                variant="tertiary"
                size="sm"
                icon-trailing="chevron-right"
                @click="router.push(`${BASE_PATH}/leave`)"
              >
                Review
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
