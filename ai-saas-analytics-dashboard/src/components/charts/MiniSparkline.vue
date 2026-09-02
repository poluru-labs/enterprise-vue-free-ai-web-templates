<script setup>
import { computed } from 'vue';
import { sparkLastPoint, sparkPoints } from '../../utils/sparkline.js';

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  points: { type: Array, default: () => [] },
});

const width = 72;
const height = 22;
const polyline = computed(() => sparkPoints(props.points, width, height));
const last = computed(() => sparkLastPoint(props.points, width, height));
</script>

<template>
  <div class="pulse-mini-spark" :data-spark="label.toLowerCase()">
    <div class="pulse-mini-spark-copy">
      <span class="pulse-mini-spark-label">{{ label }}</span>
      <strong class="pulse-mini-spark-value">{{ value }}</strong>
    </div>
    <svg
      class="pulse-mini-spark-svg"
      :viewBox="`0 0 ${width} ${height}`"
      role="img"
      :aria-label="`${label} ${value}`"
    >
      <polyline :points="polyline" />
      <circle :cx="last.cx" :cy="last.cy" r="2" />
    </svg>
  </div>
</template>
