<script setup>
import { Card, ProgressBar, Timeline } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import GrowthPod from '../components/widgets/GrowthPod.vue';
import { usePulseStore } from '../stores/pulse.js';

const { state } = usePulseStore();
</script>

<template>
  <div class="pulse-page">
    <PageHeader
      eyebrow="Usage"
      title="Who is in product"
      description="WAU / MAU sits at 42%. Feature adoption is led by cohort export."
    />

    <EqualHeightGrid :columns="3" label="Feature adoption">
      <Card v-for="feature in state.usageFeatures.slice(0, 3)" :key="feature.id" class-name="pulse-eq-card">
        <div class="pulse-card-fill">
          <span class="pulse-eyebrow">{{ feature.delta }}</span>
          <strong>{{ feature.name }}</strong>
          <ProgressBar :label="`${feature.adoption}% adoption`" :value="feature.adoption" show-value />
        </div>
      </Card>
    </EqualHeightGrid>

    <div class="pulse-grid-2 pulse-mt-lg">
      <GrowthPod :members="state.growthPod" />
      <Card title="Recent activity">
        <Timeline :items="state.timelineItems" />
      </Card>
    </div>
  </div>
</template>
