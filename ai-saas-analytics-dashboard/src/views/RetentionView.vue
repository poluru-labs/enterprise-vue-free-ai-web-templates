<script setup>
import { Card, ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import PlaybookCard from '../components/widgets/PlaybookCard.vue';
import AtRiskList from '../components/widgets/AtRiskList.vue';
import { usePulseStore } from '../stores/pulse.js';

const { state } = usePulseStore();
const playbook = state.playbooks[1];
</script>

<template>
  <div class="pulse-page">
    <PageHeader
      eyebrow="Retention"
      title="Stay and expand"
      description="Logo churn is 2.4%. Win-back at day 14 is the playbook for Northwind Co."
    />

    <EqualHeightGrid :columns="5" label="Retention curve">
      <Card v-for="week in state.retentionWeeks" :key="week.week" class-name="pulse-eq-card">
        <div class="pulse-card-fill">
          <span class="pulse-eyebrow">{{ week.week }}</span>
          <strong class="pulse-big">{{ week.value }}%</strong>
          <ProgressBar :label="`${week.week} retained`" :value="week.value" show-value />
        </div>
      </Card>
    </EqualHeightGrid>

    <div class="pulse-grid-2 pulse-mt-lg">
      <PlaybookCard :item="playbook" />
      <AtRiskList :items="state.atRisk" />
    </div>
  </div>
</template>
