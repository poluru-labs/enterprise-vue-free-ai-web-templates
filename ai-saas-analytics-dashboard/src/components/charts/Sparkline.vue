<script setup>
import { computed } from 'vue';
import { sparkLastPoint, sparkPoints } from '../../utils/sparkline.js';

const props = defineProps({
  values: { type: Array, default: () => [] },
  width: { type: Number, default: 220 },
  height: { type: Number, default: 56 },
  label: { type: String, default: '' },
});

const points = computed(() => sparkPoints(props.values, props.width, props.height));
const last = computed(() => sparkLastPoint(props.values, props.width, props.height));
</script>

<template>
  <svg
    class="pulse-spark"
    :viewBox="`0 0 ${width} ${height}`"
    role="img"
    :aria-label="label || 'Sparkline'"
  >
    <polyline :points="points" />
    <circle :cx="last.cx" :cy="last.cy" r="3.5" />
  </svg>
</template>
