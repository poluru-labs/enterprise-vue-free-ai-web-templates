<script setup>
import { computed } from 'vue';
import { barLayout } from '../../utils/gauge.js';
import { useQuotaStore } from '../../stores/quota.js';
import { useDateRange } from '../../composables/useDateRange.js';

const { state } = useQuotaStore();
const { range } = useDateRange();

const width = 360;
const height = 128;

const values = computed(() => {
  if (range.value === 'week') return state.pipelineMonths.slice(-4);
  if (range.value === 'quarter') return state.pipelineMonths;
  return state.pipelineMonths.slice(-8);
});

const labels = computed(() => {
  if (range.value === 'week') return state.pipelineLabels.slice(-4);
  if (range.value === 'quarter') return state.pipelineLabels;
  return state.pipelineLabels.slice(-8);
});

const bars = computed(() => barLayout(values.value, { width, height }));
const total = computed(() => `$${state.pipelineMonths.at(-1)}M`);
</script>

<template>
  <div class="quota-pipeline-chart">
    <div class="quota-chart-meta">
      <strong>{{ total }}</strong>
      <span class="quota-muted">Trailing twelve months · open pipeline</span>
    </div>
    <svg
      class="quota-bars"
      :viewBox="`0 0 ${width} ${height}`"
      role="img"
      aria-label="Monthly weighted pipeline"
    >
      <rect
        v-for="(bar, index) in bars"
        :key="labels[index]"
        :x="bar.x"
        :y="bar.y"
        :width="bar.width"
        :height="bar.height"
        rx="3"
      />
      <text
        v-for="(bar, index) in bars"
        :key="`${labels[index]}-label`"
        :x="bar.x + bar.width / 2"
        :y="height - 2"
        text-anchor="middle"
        class="quota-bar-label"
      >
        {{ labels[index] }}
      </text>
    </svg>
  </div>
</template>
