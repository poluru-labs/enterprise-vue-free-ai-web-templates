<script setup>
const props = defineProps({
  labels: { type: Array, default: () => [] },
  series: { type: Array, default: () => [] },
  height: { type: Number, default: 220 },
});

const width = 640;
const padX = 18;
const padY = 16;
const max = Math.max(1, ...props.series.flatMap((item) => item.values || []));

function linePath(values) {
  if (!values.length) return '';
  const innerW = width - padX * 2;
  const innerH = props.height - padY * 2;
  return values
    .map((value, index) => {
      const x = padX + (values.length === 1 ? innerW / 2 : (index / (values.length - 1)) * innerW);
      const y = padY + innerH - (value / max) * innerH;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

function areaPath(values) {
  const line = linePath(values);
  if (!line) return '';
  return `${line} L${width - padX} ${props.height - padY} L${padX} ${props.height - padY} Z`;
}

const ticks = [0.25, 0.5, 0.75, 1];
const fillSeries = props.series[0];
</script>

<template>
  <div class="atlas-chart">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Reads and searches">
      <line
        v-for="tick in ticks"
        :key="tick"
        :x1="padX"
        :x2="width - padX"
        :y1="padY + (height - padY * 2) * (1 - tick)"
        :y2="padY + (height - padY * 2) * (1 - tick)"
        class="atlas-chart-grid"
      />
      <path
        v-if="fillSeries"
        :d="areaPath(fillSeries.values)"
        :fill="fillSeries.color"
        opacity="0.14"
      />
      <path
        v-for="item in series"
        :key="item.name"
        :d="linePath(item.values)"
        fill="none"
        :stroke="item.color"
        stroke-width="2.5"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
    <div class="atlas-chart-labels">
      <span v-for="label in labels" :key="label">{{ label }}</span>
    </div>
    <div class="atlas-chart-legend">
      <span v-for="item in series" :key="item.name">
        <i :style="{ background: item.color }" />
        {{ item.name }}
      </span>
    </div>
  </div>
</template>
