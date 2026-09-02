<script setup>
import { computed } from 'vue';
import Sparkline from './Sparkline.vue';
import { usePulseStore } from '../../stores/pulse.js';
import { useDateRange } from '../../composables/useDateRange.js';

const { state } = usePulseStore();
const { range } = useDateRange();

const values = computed(() => {
  if (range.value === 'week') return state.mrrMonths.slice(-4);
  if (range.value === 'quarter') return state.mrrMonths;
  return state.mrrMonths.slice(-8);
});

const total = computed(() => `$${state.mrrMonths.at(-1)}k`);
</script>

<template>
  <div class="pulse-mrr-chart">
    <div class="pulse-mrr-meta">
      <strong>{{ total }}</strong>
      <span class="pulse-muted">Trailing twelve months</span>
    </div>
    <Sparkline :values="values" label="Monthly recurring revenue" />
  </div>
</template>
