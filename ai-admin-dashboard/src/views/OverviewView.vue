<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Alert, Button, ProgressBar, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { RouterLink } from 'vue-router';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useWorkspace } from '../stores/workspace.js';
import { formatNumber } from '../utils/format.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useWorkspace();

const kpis = computed(() => [
  {
    ...overview.kpis[0],
    value: String(store.state.tenants.length),
  },
  {
    ...overview.kpis[1],
    value: String(store.activeMembers.value),
  },
  {
    ...overview.kpis[2],
    value: formatNumber(store.seatsUsed.value),
    hint: `of ${formatNumber(store.seatsLimit.value)} contracted`,
  },
  {
    ...overview.kpis[3],
    value: String(store.rolloutFlags.value.length),
  },
  overview.kpis[4],
  overview.kpis[5],
]);

const watchTenants = computed(() =>
  store.state.tenants.filter((item) => ['trial', 'inactive'].includes(item.status) || item.health < 70),
);
</script>

<template>
  <div class="hbr-page">
    <PageHeader
      title="Control plane"
      description="FY26 Q3 · Lakshmi Poluru · 660 of 1,070 seats across 9 Harbor workspaces."
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
        <Button
          size="sm"
          icon="plus"
          @click="store.setInviteOpen(true)"
        >
          Invite member
        </Button>
      </template>
    </PageHeader>

    <section class="hbr-hero">
      <div>
        <p class="hbr-kicker">{{ overview.hero.kicker }}</p>
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
        <ChartSection title="Seat trend" subtitle="Used seats vs pending invites · 24–30 Aug 2026">
          <AreaChart :labels="overview.seatTrend.labels" :series="overview.seatTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Plan mix" subtitle="Workspaces by contract">
          <DonutChart :items="overview.planMix" center-label="Tenants" :center-value="String(store.tenants.length)" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div v-for="tenant in store.tenants.slice(0, 6)" :key="tenant.id" class="col-12 col-md-6 col-xl-4">
        <article
          class="hbr-health-card"
          role="button"
          tabindex="0"
          @click="router.push(`${BASE_PATH}/tenants/${tenant.id}`)"
          @keydown.enter="router.push(`${BASE_PATH}/tenants/${tenant.id}`)"
        >
          <header>
            <div>
              <h3>{{ tenant.name }}</h3>
              <span class="hbr-subtle">{{ tenant.plan }} · {{ tenant.owner }}</span>
            </div>
            <StatusBadge :status="tenant.status" />
          </header>
          <div class="hbr-policy-metric">
            <strong>{{ tenant.health }}</strong>
            <span>health score</span>
          </div>
          <ProgressBar :value="tenant.health" :max="100" />
          <p class="hbr-policy-note">{{ tenant.note }}</p>
        </article>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Recent activity" subtitle="Invites, restores, and flag rollouts">
          <template #action>
            <RouterLink class="hbr-text-link" :to="`${BASE_PATH}/audit`">Open audit</RouterLink>
          </template>
          <ul class="hbr-note-list">
            <li v-for="item in overview.activity" :key="item.title">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.title }}</strong>
                <p class="mb-0">{{ item.description }}</p>
                <span class="hbr-subtle">{{ item.timestamp }}</span>
              </div>
            </li>
          </ul>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <section class="hbr-panel">
          <header class="hbr-panel-header">
            <div>
              <h2>Watch list</h2>
              <p>Trials, offline workspaces, and health drags.</p>
            </div>
          </header>
          <div class="hbr-alert-list">
            <div v-for="tenant in watchTenants" :key="tenant.id" class="hbr-alert-item">
              <Alert
                :variant="tenant.status === 'inactive' ? 'danger' : 'warning'"
                :title="tenant.name"
                :message="tenant.note"
              />
              <Button
                variant="tertiary"
                size="sm"
                icon-trailing="chevron-right"
                @click="router.push(`${BASE_PATH}/tenants/${tenant.id}`)"
              >
                Open tenant
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
