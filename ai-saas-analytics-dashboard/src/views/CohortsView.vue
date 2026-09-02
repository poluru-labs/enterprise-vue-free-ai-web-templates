<script setup>
import { Card, DataTable, ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import { usePulseStore } from '../stores/pulse.js';

const { state } = usePulseStore();

const columns = [
  { key: 'name', label: 'Cohort' },
  { key: 'size', label: 'Size' },
  { key: 'w1', label: 'W1' },
  { key: 'w4', label: 'W4' },
  { key: 'w8', label: 'W8' },
];
</script>

<template>
  <div class="pulse-page">
    <PageHeader
      eyebrow="Cohorts"
      title="Retention heatmap"
      description="Monthly signup cohorts. The heatmap widget shipped July 31 with Meera Poluru."
    />

    <EqualHeightGrid :columns="3" label="Latest cohorts">
      <Card v-for="cohort in state.cohorts" :key="cohort.id" class-name="pulse-eq-card" :title="cohort.name">
        <div class="pulse-card-fill">
          <p class="pulse-muted">{{ cohort.size.toLocaleString() }} activated workspaces</p>
          <ProgressBar label="Week 1" :value="cohort.w1" show-value />
          <ProgressBar label="Week 4" :value="cohort.w4" show-value />
          <ProgressBar label="Week 8" :value="cohort.w8" show-value />
        </div>
      </Card>
    </EqualHeightGrid>

    <Card class="pulse-mt-lg" title="Cohort table" description="Week 1 / 4 / 8 retained">
      <DataTable :columns="columns" :rows="state.cohorts" striped />
    </Card>
  </div>
</template>
