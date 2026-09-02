<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { Button, showToast } from '@poluru-labs/enterprise-design-system-vue';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';

const router = useRouter();
const store = useHelpdesk();

const kpis = computed(() => overview.kpis);

function assignNext() {
  const ticket = store.assignNext();
  if (!ticket) {
    showToast({ title: 'Queue is clear', variant: 'info' });
    return;
  }
  showToast({
    title: 'Assigned to Meera Poluru',
    description: `${ticket.id} · ${ticket.subject}`,
    variant: 'success',
  });
  router.push(`${BASE_PATH}/tickets/${ticket.id}`);
}
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Desk pulse"
      :description="`FY26 Q3 · ${SIGNED_IN_USER.name} · first response ${store.headerCounts.firstResponse} across Identity and Billing.`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <Button
          variant="secondary"
          size="sm"
          icon="download"
          @click="showToast({ title: 'Snapshot queued', variant: 'success' })"
        >
          Export
        </Button>
        <Button size="sm" icon="user" @click="assignNext">Assign next</Button>
      </template>
    </PageHeader>

    <section class="lumen-hero">
      <div>
        <p class="lumen-kicker">{{ overview.hero.kicker }}</p>
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
        <ChartSection title="Ticket volume" subtitle="Created vs resolved · 24–30 Aug 2026">
          <AreaChart :labels="overview.volumeTrend.labels" :series="overview.volumeTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Channel mix" subtitle="Conversations this week">
          <DonutChart :items="overview.channelMix" center-label="Channels" center-value="47" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div v-for="queue in overview.queues" :key="queue.id" class="col-12 col-md-6 col-xl-3">
        <article class="lumen-macro-card" role="button" tabindex="0" @click="router.push(`${BASE_PATH}/inbox?queue=${queue.name}`)">
          <header>
            <div>
              <h3>{{ queue.name }}</h3>
              <span class="lumen-subtle">{{ queue.owner }}</span>
            </div>
            <strong>{{ queue.open }}</strong>
          </header>
          <p class="lumen-policy-note">{{ queue.waiting }} waiting · {{ queue.breached }} breached</p>
        </article>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12">
        <ChartSection title="Recent desk activity" subtitle="Assignments, macros, and articles">
          <template #action>
            <RouterLink class="lumen-text-link" :to="`${BASE_PATH}/inbox`">Open inbox</RouterLink>
          </template>
          <ul class="lumen-note-list">
            <li v-for="item in overview.activity" :key="item.title">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.title }}</strong>
                <p class="mb-0">{{ item.description }}</p>
                <span class="lumen-subtle">{{ item.timestamp }}</span>
              </div>
            </li>
          </ul>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
