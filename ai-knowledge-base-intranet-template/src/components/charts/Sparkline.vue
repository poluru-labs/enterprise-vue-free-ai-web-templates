<script setup>
const props = defineProps({
  values: { type: Array, default: () => [] },
  color: { type: String, default: '#65A30D' },
  width: { type: Number, default: 92 },
  height: { type: Number, default: 28 },
});

const points = (() => {
  if (!props.values.length) return '';
  const min = Math.min(...props.values);
  const max = Math.max(...props.values);
  const range = max - min || 1;
  const step = props.values.length > 1 ? (props.width - 2) / (props.values.length - 1) : props.width;
  return props.values
    .map((value, index) => {
      const x = 1 + index * step;
      const y = props.height - 2 - ((value - min) / range) * (props.height - 4);
      return `${x},${y}`;
    })
    .join(' ');
})();
</script>

<template>
  <svg
    v-if="values.length"
    class="atlas-sparkline"
    :viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
    aria-hidden="true"
    data-testid="sparkline"
  >
    <polyline
      :points="points"
      fill="none"
      :stroke="color"
      stroke-width="1.8"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
</template>
