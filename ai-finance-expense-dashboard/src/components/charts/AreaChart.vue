<script setup>
import { computed } from 'vue';

const props = defineProps({
  values: { type: Array, default: () => [] },
  labels: { type: Array, default: () => [] },
  height: { type: Number, default: 160 },
});

const width = 640;
const padX = 16;
const padY = 16;

const path = computed(() => {
  if (!props.values.length) return '';
  const max = Math.max(...props.values, 1);
  return props.values
    .map((value, index) => {
      const x = padX + (index / Math.max(props.values.length - 1, 1)) * (width - padX * 2);
      const y = props.height - padY - (value / max) * (props.height - padY * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
});

const area = computed(() => {
  if (!path.value) return '';
  const lastX = padX + (width - padX * 2);
  return `${path.value} L ${lastX} ${props.height - padY} L ${padX} ${props.height - padY} Z`;
});
</script>

<template>
  <div class="mint-chart">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Spend trend">
      <path :d="area" fill="#A7F3D0" opacity="0.55" />
      <path :d="path" fill="none" stroke="#047857" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />
    </svg>
    <div v-if="labels.length" class="mint-chart-labels">
      <span v-for="label in labels" :key="label">{{ label }}</span>
    </div>
  </div>
</template>
