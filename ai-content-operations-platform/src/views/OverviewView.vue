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
import { useContent } from '../stores/content.js';
import { formatDate } from '../utils/format.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useContent();

const kpis = computed(() => [
  { ...overview.kpis[0], value: String(store.pieces.length), hint: `${store.drafts.length} still drafting` },
  { ...overview.kpis[1], value: String(store.reviews.length), hint: 'Waiting on Tara Poluru' },
  { ...overview.kpis[2], value: String(store.scheduled.length), hint: 'Approved or booked' },
  { ...overview.kpis[3], value: String(store.published.length), hint: 'Live this quarter' },
  { ...overview.kpis[4], value: String(store.liveChannels.length), hint: `${store.channels.length} mapped` },
  { ...overview.kpis[5], value: `${store.calendarFill}%`, hint: 'Ready for the window' },
]);

const timeline = computed(() =>
  store.upcoming.slice(0, 4).map((item) => ({
    title: item.title,
    description: `${item.owner} · ${item.channel}`,
    time: formatDate(item.publishOn),
  })),
);
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Content desk"
      description="October · Ananya Poluru · 12 pieces, 6 channels, launch window opens 8 Oct."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <Button
          variant="secondary"
          size="sm"
          icon="download"
          @click="showToast({ title: 'Desk snapshot queued', variant: 'success' })"
        >
          Export
        </Button>
        <Button size="sm" icon="plus" @click="store.setBriefOpen(true)">New brief</Button>
      </template>
    </PageHeader>

    <section class="flo-hero">
      <p class="flo-kicker">{{ overview.hero.kicker }}</p>
      <h2>{{ overview.hero.title }}</h2>
      <p>{{ overview.hero.body }}</p>
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
        <ChartSection title="Publish trend" subtitle="Shipped vs booked · May–Oct 2026">
          <AreaChart :labels="overview.publishTrend.labels" :series="overview.publishTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Channel mix" subtitle="Pieces on the October desk">
          <DonutChart :items="overview.channelMix" center-label="Pieces" :center-value="String(store.pieces.length)" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-lg-4">
        <Card title="Desk health">
          <div class="flo-stack">
            <CircularProgress :value="store.calendarFill" show-value label="Fill" />
            <Meter :value="store.published.length" :max="store.pieces.length" label="Published" />
            <ProgressBar label="Launch week" :value="72" show-value />
            <Stat label="Reviews open" :value="String(store.reviews.length)" />
          </div>
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Upcoming" subtitle="Next publish dates">
          <Timeline :items="timeline" />
          <RouterLink class="flo-text-link mt-3 d-inline-block" :to="`${BASE_PATH}/calendar`">
            Open calendar
          </RouterLink>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="This week" subtitle="Moves on Ananya Poluru’s desk">
          <ul class="flo-note-list">
            <li v-for="item in overview.activity" :key="item.title">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.title }}</strong>
                <p class="mb-0">{{ item.description }}</p>
                <span class="flo-subtle">{{ item.timestamp }}</span>
              </div>
            </li>
          </ul>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Review queue" subtitle="Waiting on Tara Poluru">
          <template #action>
            <RouterLink class="flo-text-link" :to="`${BASE_PATH}/reviews`">Open reviews</RouterLink>
          </template>
          <div class="flo-stack">
            <Alert
              v-for="item in store.reviews"
              :key="item.id"
              variant="warning"
              :title="item.title"
              :message="`${item.owner} · ${item.channel}`"
            />
            <Divider />
            <Button variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/reviews`)">
              Review now
            </Button>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <section class="flo-panel">
          <header class="flo-panel-header">
            <div>
              <h2>Watch list</h2>
              <p>Drafts still short of the window.</p>
            </div>
          </header>
          <div class="flo-panel-body flo-stack">
            <div v-for="item in store.drafts" :key="item.id" class="flo-alert-item">
              <div>
                <Tag :label="item.channel" />
                <strong class="d-block mt-1">{{ item.title }}</strong>
                <p class="flo-subtle mb-0">{{ item.owner }} · {{ formatDate(item.publishOn) }}</p>
              </div>
              <StatusBadge :status="item.status" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
