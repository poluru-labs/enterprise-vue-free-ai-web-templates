<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  Accordion,
  Alert,
  Button,
  ButtonGroup,
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
import { useDevops } from '../stores/devops.js';
import { formatDate, formatPercent } from '../utils/format.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useDevops();

const kpis = computed(() => [
  { id: 'pipes', label: 'Pipelines', value: String(store.pipelines.length), hint: 'On the board', trend: 'up', trendValue: 'Registered', icon: 'bi-arrow-repeat', tone: 'brand', sparkline: [7, 8, 8, 9, 10, store.pipelines.length] },
  { id: 'success', label: 'Avg success', value: `${store.averageSuccess}%`, hint: 'Last six runs', trend: 'flat', trendValue: 'Holding', icon: 'bi-check2-circle', tone: 'success', sparkline: [90, 91, 90, 91, 90, store.averageSuccess] },
  { id: 'flight', label: 'In flight', value: String(store.inFlight.length), hint: 'Queued, building, or rolling', trend: 'up', trendValue: 'This morning', icon: 'bi-box-arrow-up', tone: 'warning', sparkline: [1, 2, 2, 3, 2, store.inFlight.length] },
  { id: 'uptime', label: 'Uptime', value: formatPercent(store.averageUptime), hint: 'Across watched services', trend: 'flat', trendValue: 'Stable', icon: 'bi-activity', tone: 'info', sparkline: [99.1, 99.2, 99.1, 99.0, 99.1, store.averageUptime] },
  { id: 'envs', label: 'Healthy envs', value: String(store.healthyEnvs.length), hint: `${store.environments.length} environments`, trend: 'up', trendValue: 'Named', icon: 'bi-hdd-stack', tone: 'brand', sparkline: [2, 2, 3, 3, 3, store.healthyEnvs.length] },
  { id: 'failing', label: 'Failing', value: String(store.failingPipelines.length), hint: 'Need a rerun', trend: 'down', trendValue: 'This week', icon: 'bi-exclamation-circle', tone: 'danger', sparkline: [1, 1, 2, 2, 2, store.failingPipelines.length] },
]);

const envMix = computed(() => {
  const counts = { Healthy: 0, Watch: 0, Down: 0 };
  const colors = { Healthy: '#086288', Watch: '#5AA3BA', Down: '#8FB8C6' };
  store.environments.forEach((item) => {
    const key = item.status === 'healthy' ? 'Healthy' : item.status === 'down' ? 'Down' : 'Watch';
    counts[key] += 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value, color: colors[name] }));
});

const deployTimeline = computed(() =>
  store.inFlight.slice(0, 4).map((item) => ({
    id: item.id,
    title: item.service,
    description: `${item.owner} · ${item.environment}`,
    time: formatDate(item.started),
  })),
);

const notes = computed(() =>
  store.pipelines
    .filter((item) => item.status !== 'passing')
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      title: `${item.name} · ${item.branch}`,
      content: `${item.owner} · success ${item.success}%. Last run ${formatDate(item.lastRun)}.`,
    })),
);
</script>

<template>
  <div class="tde-page">
    <PageHeader
      title="DevOps control"
      description="Pipelines, environments, deployments, uptime, and infrastructure health."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <ButtonGroup>
          <Button
            variant="secondary"
            size="sm"
            icon="download"
            @click="showToast({ title: 'Board export queued', description: 'Meera Poluru will get the file shortly.', variant: 'success' })"
          >
            Export
          </Button>
          <Button size="sm" icon="plus" @click="store.setPipelineOpen(true)">Start pipeline</Button>
        </ButtonGroup>
      </template>
    </PageHeader>

    <section class="tde-hero">
      <div>
        <p class="tde-kicker">{{ overview.hero.kicker }}</p>
        <h2>{{ overview.hero.title }}</h2>
        <p>{{ overview.hero.body }}</p>
      </div>
      <CircularProgress :value="store.averageSuccess" show-value label="Success" />
    </section>

    <div class="row g-3 mb-3">
      <div v-for="kpi in kpis" :key="kpi.id" class="col-12 col-sm-6 col-xl-4">
        <StatCard v-bind="kpi" :trend-value="kpi.trendValue" />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Ship trend" subtitle="Shipped and failed deploys · May–Oct 2026">
          <AreaChart :labels="overview.deployTrend.labels" :series="overview.deployTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Environments" subtitle="Health across the five books">
          <DonutChart :items="envMix" center-label="Envs" :center-value="String(store.environments.length)" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-lg-4">
        <ChartSection title="Morning pulse" subtitle="Meera Poluru · Weekday review">
          <div class="tde-stack">
            <Stat label="Average success" :value="`${store.averageSuccess}%`" hint="Across pipelines" trend="flat" trend-value="Stable" />
            <Meter :value="store.passingPipelines.length" :max="store.pipelines.length" label="Passing pipelines" show-value />
            <ProgressBar label="Uptime line" :value="Math.round(store.averageUptime)" show-value />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="In flight" subtitle="Deploys still moving">
          <Timeline :items="deployTimeline" />
          <Button class="mt-3" variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/deployments`)">
            Open deployments
          </Button>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Regions" subtitle="Where the runners live">
          <div class="tde-step-pills">
            <Tag v-for="region in ['us-east', 'us-west', 'eu-central']" :key="region" :label="region" />
          </div>
          <p class="tde-subtle mt-3 mb-0">Each region has a named owner for the cluster.</p>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Needs a look" subtitle="Pipelines under the success line">
          <Accordion :items="notes" />
          <Divider />
          <ul class="tde-note-list">
            <li v-for="item in store.pipelines.slice(0, 4)" :key="item.id">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.name }}</strong>
                <p class="mb-0">{{ item.owner }} · {{ item.environment }}</p>
                <span class="tde-subtle">{{ formatDate(item.lastRun) }}</span>
              </div>
              <StatusBadge :status="item.status" />
            </li>
          </ul>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Failed this week" subtitle="Rerun before the next window">
          <div class="tde-stack">
            <Alert
              v-for="item in store.failingPipelines"
              :key="item.id"
              variant="danger"
              :title="item.name"
              :message="`${item.owner} · success ${item.success}% · ${item.branch}`"
            />
            <Button variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/pipelines`)">
              Open pipelines
            </Button>
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
