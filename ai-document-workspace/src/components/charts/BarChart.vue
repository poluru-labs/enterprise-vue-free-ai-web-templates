<script setup>
const props = defineProps({
  labels: { type: Array, default: () => [] },
  values: { type: Array, default: () => [] },
  color: { type: String, default: '#B45309' },
  height: { type: Number, default: 180 },
});

const width = 480;
const padX = 20;
const padY = 16;
const max = Math.max(1, ...props.values);
const gap = 10;
const barWidth = props.values.length
  ? (width - padX * 2 - gap * (props.values.length - 1)) / props.values.length
  : 0;

function barY(value) {
  const innerH = props.height - padY * 2;
  return padY + innerH - (value / max) * innerH;
}

function barHeight(value) {
  return Math.max(4, (value / max) * (props.height - padY * 2));
}
</script>

<template>
  <div class="vault-chart">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Bar chart">
      <rect
        v-for="(value, index) in values"
        :key="labels[index] || index"
        :x="padX + index * (barWidth + gap)"
        :y="barY(value)"
        :width="barWidth"
        :height="barHeight(value)"
        :fill="color"
        rx="4"
      />
    </svg>
    <div class="vault-chart-labels">
      <span v-for="label in labels" :key="label">{{ label }}</span>
    </div>
  </div>
</template>
