<script setup>
defineProps({
  values: { type: Array, default: () => [] },
  color: { type: String, default: '#0F766E' },
  width: { type: Number, default: 92 },
  height: { type: Number, default: 28 },
});

function points(values, width, height) {
  if (!values.length) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? (width - 2) / (values.length - 1) : width;
  return values
    .map((value, index) => {
      const x = 1 + index * step;
      const y = height - 2 - ((value - min) / range) * (height - 4);
      return `${x},${y}`;
    })
    .join(' ');
}
</script>

<template>
  <svg
    v-if="values.length"
    class="keel-sparkline"
    :viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
    aria-hidden="true"
    data-testid="sparkline"
  >
    <polyline
      :points="points(values, width, height)"
      fill="none"
      :stroke="color"
      stroke-width="1.8"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
</template>
