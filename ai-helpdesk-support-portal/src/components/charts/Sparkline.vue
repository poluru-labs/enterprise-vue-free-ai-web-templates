<script setup>
const props = defineProps({
  values: { type: Array, default: () => [] },
  color: { type: String, default: '#0284C7' },
  width: { type: Number, default: 92 },
  height: { type: Number, default: 28 },
});

const points = (() => {
  const values = props.values;
  if (!values.length) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? (props.width - 2) / (values.length - 1) : props.width;
  return values
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
    class="lumen-sparkline"
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
