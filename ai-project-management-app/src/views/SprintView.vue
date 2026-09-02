<script setup>
import { computed } from 'vue';
import { Button, ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { currentSprint, openIssueModal, sprintIssues, sprintProgress, workspace } from '../stores/projects.js';
import { formatDate, formatPoints } from '../utils/format.js';
import BurndownChart from '../components/charts/BurndownChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const remaining = computed(() => sprintProgress.value.committed - sprintProgress.value.done);
const burndown = computed(() => currentSprint.value?.burndown || { labels: [], ideal: [], actual: [] });
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Sprint"
      :description="`${currentSprint.name} · ${currentSprint.goal}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Sprint' }]"
    >
      <template #actions>
        <Button variant="secondary" @click="$router.push(`${BASE_PATH}/board`)">Board</Button>
        <Button icon="plus" @click="openIssueModal()">New issue</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard label="Committed" :value="String(sprintProgress.committed)" hint="Story points" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard label="Done" :value="String(sprintProgress.done)" :hint="formatPoints(sprintProgress.done, sprintProgress.committed)" tone="success" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard label="Remaining" :value="String(remaining)" hint="Still on the board" tone="warning" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard label="Days left" :value="String(sprintProgress.daysLeft)" :hint="`${formatDate(currentSprint.start)} – ${formatDate(currentSprint.end)}`" />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-8">
        <ChartSection title="Burndown" subtitle="Ideal vs remaining points through 9 Sep">
          <BurndownChart :labels="burndown.labels" :ideal="burndown.ideal" :actual="burndown.actual" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Scope rail" :subtitle="currentSprint.status">
          <ProgressBar :value="sprintProgress.done" :max="sprintProgress.committed" :label="`${sprintProgress.name} points`" show-value />
          <p class="keel-note mt-3">{{ currentSprint.goal }}</p>
          <div class="keel-stack mt-3">
            <div v-for="sprint in workspace.sprints" :key="sprint.id" class="keel-row-between">
              <div>
                <strong>{{ sprint.name }}</strong>
                <div class="keel-muted">{{ sprint.completed }}/{{ sprint.committed }} pts</div>
              </div>
              <StatusBadge :status="sprint.status" />
            </div>
          </div>
        </ChartSection>
      </div>
    </div>

    <ChartSection title="Sprint issues" :subtitle="`${sprintIssues.length} on ${currentSprint.name}`">
      <div class="row g-3">
        <div v-for="issue in sprintIssues" :key="issue.id" class="col-12 col-sm-6 col-xl-4">
          <article class="keel-issue-card">
            <div class="keel-issue-head">
              <span class="keel-issue-key">{{ issue.key }}</span>
              <StatusBadge :status="issue.column" />
            </div>
            <strong>{{ issue.title }}</strong>
            <div class="keel-issue-meta">
              <span>{{ issue.assignee }}</span>
              <span>{{ issue.points }} pts</span>
            </div>
          </article>
        </div>
      </div>
    </ChartSection>
  </div>
</template>
