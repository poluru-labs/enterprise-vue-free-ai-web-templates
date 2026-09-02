<script setup>
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { workspace } from '../stores/projects.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Roadmap"
      description="Quarter lanes for the Keel workspace — Q3 is the sprint rail, Q4 is identity freeze."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Roadmap' }]"
    />

    <div class="keel-stack">
      <ChartSection v-for="lane in workspace.roadmap" :key="lane.id" :title="lane.label" :subtitle="lane.window">
        <div class="row g-3">
          <div v-for="epic in lane.epics" :key="epic.id" class="col-12 col-xl-4">
            <article class="keel-issue-card">
              <div class="keel-issue-head">
                <h3>{{ epic.title }}</h3>
                <StatusBadge :status="epic.status" />
              </div>
              <p class="keel-note">{{ epic.detail }}</p>
              <div class="keel-hbar-track">
                <div class="keel-hbar-fill" :style="{ width: `${epic.span}%` }" />
              </div>
              <div class="keel-issue-meta">
                <span>{{ epic.owner }}</span>
                <span>{{ epic.span }}%</span>
              </div>
            </article>
          </div>
        </div>
      </ChartSection>
    </div>
  </div>
</template>
