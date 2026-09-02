<script setup>
import { computed } from 'vue';
import { ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { workspace } from '../stores/projects.js';
import BarChart from '../components/charts/BarChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const loadBars = computed(() =>
  workspace.teams.map((team) => ({
    name: team.name,
    value: team.load,
    color: team.load >= 85 ? '#0F766E' : '#14B8A6',
  })),
);
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Teams"
      description="Equal-height capacity cards. QA and Platform sit above the 85% load line."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Teams' }]"
    />

    <div class="row g-3 mb-3">
      <div v-for="team in workspace.teams" :key="team.id" class="col-12 col-sm-6 col-xl-4">
        <article class="keel-team-card">
          <header>
            <h3>{{ team.name }}</h3>
            <StatusBadge :status="team.status" pulse />
          </header>
          <p>{{ team.focus }}</p>
          <ProgressBar :value="team.load" :max="100" :label="`${team.points} of ${team.capacity} pts`" show-value />
          <footer>
            <strong>{{ team.lead }}</strong>
            <span>{{ team.members }} people · {{ team.load }}%</span>
          </footer>
        </article>
      </div>
    </div>

    <ChartSection title="Load by crew" subtitle="Percent of sprint capacity">
      <BarChart :items="loadBars" unit="%" :max-value="100" />
    </ChartSection>
  </div>
</template>
