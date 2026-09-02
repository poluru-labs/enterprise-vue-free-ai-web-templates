<script setup>
import { Alert, Button, Card, ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import KpiCard from '../components/widgets/KpiCard.vue';
import AtRiskList from '../components/widgets/AtRiskList.vue';
import MrrChart from '../components/charts/MrrChart.vue';
import { usePulseStore } from '../stores/pulse.js';

const { state } = usePulseStore();
</script>

<template>
  <div class="pulse-page">
    <PageHeader
      eyebrow="Growth"
      title="Overview"
      description="Activation, retention, and product usage for a subscription business."
    >
      <template #actions>
        <Button icon="plus" @click="state.requestOpen = true">New request</Button>
      </template>
    </PageHeader>

    <Alert
      class="pulse-mb-lg"
      variant="info"
      title="Next best action"
      message="Trial-to-paid variant B is trending +6.2% — let it run 4 more days with Meera Poluru before calling it."
    />

    <EqualHeightGrid :columns="6" label="Key metrics">
      <KpiCard v-for="item in state.kpis" :key="item.id" :item="item" />
    </EqualHeightGrid>

    <div class="pulse-grid-2 pulse-mt-lg">
      <Card title="MRR pulse" description="Subscription revenue over the selected range">
        <MrrChart />
        <ProgressBar class="pulse-mt" label="Activation rate" :value="64" show-value />
      </Card>
      <AtRiskList :items="state.atRisk" />
    </div>
  </div>
</template>
