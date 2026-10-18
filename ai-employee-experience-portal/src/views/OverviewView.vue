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
import { useExperience } from '../stores/experience.js';
import { formatDate } from '../utils/format.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useExperience();

const kpis = computed(() => [
  { id: 'services', label: 'Services', value: String(store.services.length), hint: 'On the lobby', trend: 'up', trendValue: 'Listed', icon: 'bi-grid', tone: 'brand', sparkline: [8, 8, 9, 9, 10, store.services.length] },
  { id: 'score', label: 'Avg score', value: String(store.averageScore), hint: 'Out of 5', trend: 'flat', trendValue: 'Holding', icon: 'bi-star', tone: 'success', sparkline: [4.1, 4.2, 4.3, 4.2, 4.3, store.averageScore] },
  { id: 'notes', label: 'Open notes', value: String(store.openNotes.length), hint: 'New or in review', trend: 'down', trendValue: 'This week', icon: 'bi-chat-left-text', tone: 'warning', sparkline: [6, 5, 4, 5, 4, store.openNotes.length] },
  { id: 'open', label: 'Open services', value: String(store.openServices.length), hint: 'Ready for a request', trend: 'up', trendValue: 'Named', icon: 'bi-door-open', tone: 'brand', sparkline: [4, 5, 5, 6, 6, store.openServices.length] },
  { id: 'posts', label: 'Posted', value: String(store.postedAnnouncements.length), hint: 'Live announcements', trend: 'flat', trendValue: 'This month', icon: 'bi-megaphone', tone: 'info', sparkline: [2, 2, 3, 3, 3, store.postedAnnouncements.length] },
  { id: 'busy', label: 'Busy desks', value: String(store.busyServices.length), hint: 'Longer than usual', trend: 'down', trendValue: 'Watch', icon: 'bi-hourglass', tone: 'danger', sparkline: [2, 3, 3, 4, 3, store.busyServices.length] },
]);

const mix = computed(() => {
  const counts = { Open: 0, Busy: 0, Closed: 0 };
  const colors = { Open: '#FF6500', Busy: '#F6B27A', Closed: '#C9A48C' };
  store.services.forEach((item) => {
    const key = item.status === 'open' ? 'Open' : item.status === 'busy' ? 'Busy' : 'Closed';
    counts[key] += 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value, color: colors[name] }));
});

const noteTimeline = computed(() =>
  store.openNotes.slice(0, 4).map((item) => ({
    id: item.id,
    title: item.topic,
    description: `${item.author} · ${item.service}`,
    time: formatDate(item.opened),
  })),
);

const notes = computed(() =>
  store.services
    .filter((item) => item.score < 4)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      title: `${item.name} · ${item.site}`,
      content: `${item.owner} · score ${item.score}. Typical wait ${item.wait} days.`,
    })),
);

const pulse = computed(() => Math.round((store.averageScore / 5) * 100));
</script>

<template>
  <div class="hrt-page">
    <PageHeader
      title="Employee experience"
      description="Services, feedback, announcements, and workplace resources."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <ButtonGroup>
          <Button
            variant="secondary"
            size="sm"
            icon="download"
            @click="showToast({ title: 'Lobby export queued', description: 'Meera Poluru will get the file shortly.', variant: 'success' })"
          >
            Export
          </Button>
          <Button size="sm" icon="plus" @click="store.setServiceOpen(true)">Add service</Button>
        </ButtonGroup>
      </template>
    </PageHeader>

    <section class="hrt-hero">
      <div>
        <p class="hrt-kicker">{{ overview.hero.kicker }}</p>
        <h2>{{ overview.hero.title }}</h2>
        <p>{{ overview.hero.body }}</p>
      </div>
      <CircularProgress :value="pulse" show-value label="Pulse" />
    </section>

    <div class="row g-3 mb-3">
      <div v-for="kpi in kpis" :key="kpi.id" class="col-12 col-sm-6 col-xl-4">
        <StatCard v-bind="kpi" :trend-value="kpi.trendValue" />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Pulse trend" subtitle="Service score and open notes · May–Oct 2026">
          <AreaChart :labels="overview.pulseTrend.labels" :series="overview.pulseTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Service mix" subtitle="Open, busy, and closed desks">
          <DonutChart :items="mix" center-label="Services" :center-value="String(store.services.length)" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-lg-4">
        <ChartSection title="Monday lobby" subtitle="Meera Poluru · Weekday review">
          <div class="hrt-stack">
            <Stat label="Average score" :value="String(store.averageScore)" hint="Across services" trend="flat" trend-value="Stable" />
            <Meter :value="store.openServices.length" :max="store.services.length" label="Open services" show-value />
            <ProgressBar label="Pulse line" :value="pulse" show-value />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Open notes" subtitle="Feedback still waiting">
          <Timeline :items="noteTimeline" />
          <Button class="mt-3" variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/feedback`)">
            Open feedback
          </Button>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Sites" subtitle="Where the desks sit">
          <div class="hrt-step-pills">
            <Tag v-for="site in ['Austin', 'Chicago', 'London', 'Remote']" :key="site" :label="site" />
          </div>
          <p class="hrt-subtle mt-3 mb-0">Each site has a named owner for the services that run there.</p>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Needs a look" subtitle="Services under a score of 4">
          <Accordion :items="notes" />
          <Divider />
          <ul class="hrt-note-list">
            <li v-for="item in store.services.slice(0, 4)" :key="item.id">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.name }}</strong>
                <p class="mb-0">{{ item.owner }} · {{ item.site }}</p>
                <span class="hrt-subtle">Score {{ item.score }}</span>
              </div>
              <StatusBadge :status="item.status" />
            </li>
          </ul>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Busy desks" subtitle="Longer waits than usual">
          <div class="hrt-stack">
            <Alert
              v-for="item in store.busyServices"
              :key="item.id"
              variant="warning"
              :title="item.name"
              :message="`${item.owner} · ${item.wait} day wait · ${item.site}`"
            />
            <Button variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/services`)">
              Open services
            </Button>
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
