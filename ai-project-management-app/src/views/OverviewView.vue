<script setup>
import { Button } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import overview from '../data/overview.json';
import { openIssueModal, sprintProgress, workspace } from '../stores/projects.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Overview"
      :description="`${SIGNED_IN_USER.name} · ${sprintProgress.name} · ${sprintProgress.done} of ${sprintProgress.committed} points with ${sprintProgress.daysLeft} days left.`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <Button variant="secondary" icon="clock" @click="$router.push(`${BASE_PATH}/sprint`)">Open sprint</Button>
        <Button icon="plus" @click="openIssueModal()">New issue</Button>
      </template>
    </PageHeader>

    <section class="keel-hero">
      <div>
        <p class="keel-kicker">{{ overview.hero.kicker }}</p>
        <h2>{{ overview.hero.title }}</h2>
        <p>{{ overview.hero.body }}</p>
      </div>
      <div class="keel-hero-meta">
        <div>
          <span>Done</span>
          <strong>{{ sprintProgress.done }}</strong>
        </div>
        <div>
          <span>Committed</span>
          <strong>{{ sprintProgress.committed }}</strong>
        </div>
        <div>
          <span>Days left</span>
          <strong>{{ sprintProgress.daysLeft }}</strong>
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
        <ChartSection title="Throughput" subtitle="Committed vs completed points">
          <AreaChart :labels="overview.throughput.labels" :series="overview.throughput.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Sprint mix" subtitle="Story points by column">
          <DonutChart :items="overview.columnMix" center-label="Pts" :center-value="sprintProgress.committed" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Focus" subtitle="What Arjun is protecting this week">
          <div class="keel-stack">
            <div v-for="item in overview.focus" :key="item.id">
              <strong>{{ item.title }}</strong>
              <p class="keel-note">{{ item.content }}</p>
            </div>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Activity" subtitle="Last moves on Keel">
          <div class="keel-stack">
            <div v-for="item in overview.timeline" :key="item.id" class="keel-row-between">
              <div>
                <strong>{{ item.title }}</strong>
                <div class="keel-muted">{{ item.description }}</div>
              </div>
              <StatusBadge :status="item.time" />
            </div>
          </div>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div v-for="team in workspace.teams" :key="team.id" class="col-12 col-sm-6 col-xl-4">
        <article class="keel-team-card">
          <header>
            <h3>{{ team.name }}</h3>
            <StatusBadge :status="team.status" />
          </header>
          <p>{{ team.focus }}</p>
          <footer>
            <strong>{{ team.load }}%</strong>
            <span>{{ team.lead }} · {{ team.points }}/{{ team.capacity }} pts</span>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>
