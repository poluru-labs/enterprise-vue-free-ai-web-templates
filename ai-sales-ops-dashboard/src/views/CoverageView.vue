<script setup>
import { Card, ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import CoverageChip from '../components/widgets/CoverageChip.vue';
import { useQuotaStore } from '../stores/quota.js';

const { state, paddedCoverage } = useQuotaStore();
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Coverage"
      title="3.1× remaining quota"
      description="Weighted pipeline versus leftover plan. Escalate any rep below 2.5× in Monday’s forecast."
    >
      <template #actions>
        <CoverageChip :value="`${state.forecast.coverage}×`" />
      </template>
    </PageHeader>

    <EqualHeightGrid :columns="3" label="Coverage by rep">
      <Card v-for="rep in paddedCoverage" :key="rep.id" class-name="quota-eq-card">
        <div class="quota-card-fill">
          <span class="quota-eyebrow">{{ rep.coverage }} coverage</span>
          <strong>{{ rep.name }}</strong>
          <p class="quota-card-copy">{{ rep.pipeline }} pipeline · {{ rep.remaining }} remaining quota</p>
          <ProgressBar :label="`${rep.name} coverage`" :value="rep.fill" show-value />
        </div>
      </Card>
    </EqualHeightGrid>

    <Card class="quota-mt-lg" title="Coverage floor" description="Team coverage should stay above 3× remaining quota">
      <ProgressBar label="Team coverage vs 3× floor" :value="Math.min(100, (state.forecast.coverage / 3) * 100)" show-value />
      <p class="quota-muted quota-mt">Ananya Poluru is the gap — 2.4× against a $124k remainder. Move Fieldwork Co or add a mid-market deal this week.</p>
    </Card>
  </div>
</template>
