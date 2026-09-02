<script setup>
import { computed } from 'vue';
import { gaugeMetrics } from '../../utils/gauge.js';

const props = defineProps({
  percent: { type: Number, required: true },
  label: { type: String, default: 'Q3 attainment' },
  size: { type: Number, default: 64 },
  radius: { type: Number, default: 26 },
});

const metrics = computed(() => gaugeMetrics(props.percent, props.radius));
const center = computed(() => props.size / 2);
</script>

<template>
  <div class="quota-gauge" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg
      class="quota-gauge-svg"
      :viewBox="`0 0 ${size} ${size}`"
      role="img"
      :aria-label="`${label} ${metrics.value}%`"
    >
      <circle
        class="quota-gauge-track"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        stroke-width="6"
      />
      <circle
        class="quota-gauge-arc"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        :stroke-dasharray="metrics.circumference"
        :stroke-dashoffset="metrics.offset"
        :transform="`rotate(-90 ${center} ${center})`"
      />
      <text class="quota-gauge-value" :x="center" :y="center + 4" text-anchor="middle">
        {{ metrics.value }}%
      </text>
    </svg>
  </div>
</template>
