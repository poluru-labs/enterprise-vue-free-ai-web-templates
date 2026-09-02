<script setup>
import { Button } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import overview from '../data/overview.json';
import { crm, openActivityDrawer, openDealModal } from '../stores/crm.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const healthAccounts = crm.accounts.slice(0, 6);
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Overview"
      :description="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.attained}% to quota · Harbor still in commit.`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <Button variant="secondary" icon="calendar" @click="openActivityDrawer()">Log activity</Button>
        <Button icon="plus" @click="openDealModal()">New deal</Button>
      </template>
    </PageHeader>

    <section class="bloom-hero">
      <div>
        <p class="bloom-kicker">{{ overview.hero.kicker }}</p>
        <h2>{{ overview.hero.title }}</h2>
        <p>{{ overview.hero.body }}</p>
      </div>
      <div class="bloom-hero-meta">
        <div>
          <span>Commit coverage</span>
          <strong>1.4×</strong>
        </div>
        <div>
          <span>Closing this week</span>
          <strong>14</strong>
        </div>
        <div>
          <span>Ready leads</span>
          <strong>{{ crm.leads.filter((item) => item.status === 'Ready').length }}</strong>
        </div>
      </div>
    </section>

    <div class="row g-3 mb-3">
      <div v-for="kpi in overview.kpis" :key="kpi.id" class="col-12 col-sm-6 col-xl-4 col-xxl-2">
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
        <ChartSection title="Pipeline pulse" subtitle="Trailing twelve months · $4.86M open">
          <AreaChart :labels="overview.pipelineMonths.labels" :series="overview.pipelineMonths.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Stage mix" subtitle="Working set across five stages">
          <DonutChart :items="overview.stageMix" center-label="Stages" :center-value="75" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Team board" subtitle="Quota attained this quarter">
          <div class="bloom-stack">
            <div v-for="rep in overview.teamBoard" :key="rep.name" class="bloom-row-between">
              <div>
                <strong>{{ rep.name }}</strong>
                <div class="bloom-muted">{{ rep.closed }} closed · {{ rep.pipeline }} pipeline</div>
              </div>
              <StatusBadge :status="rep.quota >= 70 ? 'Healthy' : 'Working'" />
            </div>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Today" subtitle="Priya’s afternoon">
          <div class="bloom-stack">
            <div v-for="item in crm.agenda.slice(0, 4)" :key="item.id" class="bloom-row-between">
              <div>
                <strong>{{ item.title }}</strong>
                <div class="bloom-muted">{{ item.with }} · {{ item.time }}</div>
              </div>
              <StatusBadge :status="item.type" />
            </div>
          </div>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div v-for="account in healthAccounts" :key="account.id" class="col-12 col-sm-6 col-xl-4">
        <RouterLink class="bloom-account-card" :to="`${BASE_PATH}/accounts/${account.id}`">
          <article class="bloom-health-card">
            <header>
              <h3>{{ account.name }}</h3>
              <StatusBadge :status="account.health" />
            </header>
            <p>{{ account.industry }} · {{ account.region }}</p>
            <footer>
              <strong>{{ account.arr }}</strong>
              <span>{{ account.next }}</span>
            </footer>
          </article>
        </RouterLink>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <ChartSection title="Playbooks">
          <div class="bloom-stack">
            <div v-for="item in overview.playbooks" :key="item.id">
              <strong>{{ item.title }}</strong>
              <p class="bloom-note">{{ item.content }}</p>
            </div>
          </div>
          <template #action>
            <Button size="sm" variant="secondary" @click="$router.push(`${BASE_PATH}/activities`)">Open agenda</Button>
          </template>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-6">
        <ChartSection title="Follow-ups" subtitle="Motion across the book">
          <div class="bloom-stack">
            <div v-for="item in overview.timeline" :key="item.id">
              <strong>{{ item.title }}</strong>
              <p class="bloom-note">{{ item.description }} · {{ item.time }}</p>
            </div>
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
