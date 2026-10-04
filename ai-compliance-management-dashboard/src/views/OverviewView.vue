<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Divider,
  Meter,
  ProgressBar,
  Stat,
  Tag,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { formatDate } from '../utils/format.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useCompliance();

const kpis = computed(() => [
  { ...overview.kpis[0], value: String(store.controls.length), hint: `${store.effectiveControls.length} effective` },
  { ...overview.kpis[1], value: String(store.effectiveControls.length), hint: `${store.coverage}% coverage` },
  { ...overview.kpis[2], value: String(store.gapControls.length), hint: 'Need owners this week' },
  { ...overview.kpis[3], value: String(store.liveAudits.length), hint: `${store.audits.length} in the year` },
  { ...overview.kpis[4], value: String(store.publishedPolicies.length), hint: `${store.policies.length} in library` },
  { ...overview.kpis[5], value: String(store.openRisks.length), hint: 'Open or mitigating' },
]);

const timeline = computed(() =>
  store.dueAudits.slice(0, 4).map((item) => ({
    title: item.name,
    description: `${item.lead} · due ${formatDate(item.end)}`,
    time: item.status,
  })),
);
</script>

<template>
  <div class="aeg-page">
    <PageHeader
      title="Compliance desk"
      description="FY26 Q3 · Kavya Poluru · 12 controls, 5 frameworks, evidence window opens 22 Sep."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <Button
          variant="secondary"
          size="sm"
          icon="download"
          @click="showToast({ title: 'Program snapshot queued', variant: 'success' })"
        >
          Export
        </Button>
        <Button size="sm" icon="plus" @click="store.setControlOpen(true)">Add control</Button>
      </template>
    </PageHeader>

    <section class="aeg-hero">
      <div>
        <p class="aeg-kicker">{{ overview.hero.kicker }}</p>
        <h2>{{ overview.hero.title }}</h2>
        <p>{{ overview.hero.body }}</p>
      </div>
    </section>

    <div class="row g-3 mb-3">
      <div v-for="kpi in kpis" :key="kpi.id" class="col-12 col-sm-6 col-xl-4">
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
        <ChartSection title="Coverage trend" subtitle="Control coverage vs evidence ready · Apr–Sep 2026">
          <AreaChart :labels="overview.coverageTrend.labels" :series="overview.coverageTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Framework mix" subtitle="Controls mapped by standard">
          <DonutChart :items="overview.frameworkMix" center-label="Controls" :center-value="String(store.controls.length)" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-lg-4">
        <Card title="Program health">
          <div class="aeg-stack">
            <CircularProgress :value="store.coverage" show-value label="Coverage" />
            <Meter :value="store.effectiveControls.length" :max="store.controls.length" label="Effective controls" />
            <ProgressBar label="SOC 2 fieldwork" :value="74" show-value />
            <Stat label="Exceptions open" :value="String(overview.exceptions.length)" />
          </div>
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Upcoming audits" subtitle="Fieldwork and planned closes">
          <Timeline :items="timeline" />
          <RouterLink class="aeg-text-link mt-3 d-inline-block" :to="`${BASE_PATH}/audits`">Open audit calendar</RouterLink>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Evidence due" subtitle="Packs needed before the window">
          <ul class="aeg-note-list">
            <li v-for="item in overview.evidence" :key="item.label">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.label }}</strong>
                <p class="mb-0">{{ item.owner }}</p>
                <span class="aeg-subtle">Due {{ formatDate(item.due) }}</span>
              </div>
            </li>
          </ul>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="This week in Aegis" subtitle="Audits, exceptions, and policy review">
          <template #action>
            <RouterLink class="aeg-text-link" :to="`${BASE_PATH}/audits`">Open audits</RouterLink>
          </template>
          <ul class="aeg-note-list">
            <li v-for="item in overview.activity" :key="item.title">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.title }}</strong>
                <p class="mb-0">{{ item.description }}</p>
                <span class="aeg-subtle">{{ item.timestamp }}</span>
              </div>
            </li>
          </ul>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <section class="aeg-panel">
          <header class="aeg-panel-header">
            <div>
              <h2>Watch list</h2>
              <p>Gaps and exceptions still on Kavya Poluru’s desk.</p>
            </div>
          </header>
          <div class="aeg-alert-list aeg-panel-body">
            <Alert
              v-for="item in store.gapControls"
              :key="item.id"
              variant="danger"
              :title="item.title"
              :message="`${item.owner} · ${item.framework}`"
            />
            <Divider />
            <div v-for="item in overview.exceptions" :key="item.id" class="aeg-alert-item">
              <div>
                <Tag :label="item.status" />
                <strong class="d-block mt-1">{{ item.title }}</strong>
                <p class="aeg-subtle mb-0">{{ item.owner }} · {{ formatDate(item.due) }}</p>
              </div>
              <StatusBadge :status="item.status" />
            </div>
            <Button
              variant="tertiary"
              size="sm"
              icon-trailing="chevron-right"
              @click="router.push(`${BASE_PATH}/risks`)"
            >
              Review risks
            </Button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
