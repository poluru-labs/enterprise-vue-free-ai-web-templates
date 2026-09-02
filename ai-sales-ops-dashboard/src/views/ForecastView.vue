<script setup>
import { Card, Meter, ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import ForecastGauge from '../components/charts/ForecastGauge.vue';
import CoverageChip from '../components/widgets/CoverageChip.vue';
import { useQuotaStore } from '../stores/quota.js';

const { state } = useQuotaStore();
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Forecast"
      title="Q3 plan versus commit"
      description="Closed won is 86% of the $1.2M plan. Commit coverage sits at 1.4× for next quarter."
    />

    <div class="quota-grid-2 quota-mb-lg">
      <Card title="Q3 attainment" description="$1.03M closed against a $1.2M quota">
        <div class="quota-forecast-hero">
          <ForecastGauge :percent="state.forecast.attainment" :size="140" :radius="54" />
          <div>
            <span class="quota-eyebrow">Closed / plan</span>
            <strong class="quota-big">{{ state.forecast.attainment }}%</strong>
            <p class="quota-muted">${{ (state.forecast.closed / 1000).toFixed(2) }}M of ${{ (state.forecast.quota / 1000).toFixed(1) }}M</p>
            <CoverageChip :value="`${state.forecast.coverage}×`" />
          </div>
        </div>
        <ProgressBar class="quota-mt" label="Quota attained" :value="state.forecast.attainment" show-value />
        <Meter class="quota-mt" label="Commit coverage" :value="1.4" :min="0" :max="3" :low="1" :high="2" :optimum="2" show-value />
      </Card>
      <Card title="Today" description="Forecast motions on Priya Poluru’s calendar">
        <div class="quota-stack">
          <div v-for="item in state.agenda" :key="item.id" class="quota-row quota-row-between">
            <div>
              <strong>{{ item.title }}</strong>
              <div class="quota-muted">{{ item.with }} · {{ item.time }}</div>
            </div>
            <span class="quota-muted">{{ item.type }}</span>
          </div>
        </div>
      </Card>
    </div>

    <EqualHeightGrid :columns="4" label="Forecast bands">
      <Card v-for="band in state.forecastBands" :key="band.id" class-name="quota-eq-card">
        <div class="quota-card-fill">
          <span class="quota-eyebrow">{{ band.label }}</span>
          <strong class="quota-big">{{ band.value }}</strong>
          <p class="quota-card-copy">{{ band.hint }}</p>
          <ProgressBar :label="band.label" :value="Math.min(100, band.fill)" show-value />
        </div>
      </Card>
    </EqualHeightGrid>
  </div>
</template>
