<script setup>
import { Alert, Button, Card, SegmentedControl } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import KpiCard from '../components/widgets/KpiCard.vue';
import AtRiskList from '../components/widgets/AtRiskList.vue';
import PipelineChart from '../components/charts/PipelineChart.vue';
import { useQuotaStore } from '../stores/quota.js';
import { useDateRange } from '../composables/useDateRange.js';

const { state } = useQuotaStore();
const { range, segments } = useDateRange();
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Revenue ops"
      title="Overview"
      description="Forecast, coverage, and deal hygiene for the sales operations team."
    >
      <template #actions>
        <Button icon="plus" @click="state.activityOpen = true">Log activity</Button>
      </template>
    </PageHeader>

    <Alert
      class="quota-mb-lg"
      variant="info"
      title="Next best action"
      message="Book 15 minutes with Meera Poluru before 17:00 — Harbor Labs' $184k expansion stays in commit if legal moves today."
    />

    <EqualHeightGrid :columns="6" label="Key metrics">
      <KpiCard v-for="item in state.kpis" :key="item.id" :item="item" />
    </EqualHeightGrid>

    <div class="quota-grid-2 quota-mt-lg">
      <Card title="Pipeline pulse" description="Weighted open pipeline over the selected range">
        <div class="quota-row quota-row-between quota-mb">
          <SegmentedControl v-model="range" :segments="segments" />
        </div>
        <PipelineChart />
      </Card>
      <AtRiskList :items="state.atRisk" />
    </div>
  </div>
</template>
