<script setup>
function linePath(values, width, height, padX, padY, max) {
  if (!values.length) return '';
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  return values
    .map((value, index) => {
      const x = padX + (values.length === 1 ? innerW / 2 : (index / (values.length - 1)) * innerW);
      const y = padY + innerH - (value / (max || 1)) * innerH;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

function areaPath(values, width, height, padX, padY, max) {
  const line = linePath(values, width, height, padX, padY, max);
  if (!line) return '';
  const lastX = width - padX;
  return `${line} L${lastX} ${height - padY} L${padX} ${height - padY} Z`;
}

const props = defineProps({
  labels: { type: Array, default: () => [] },
  series: { type: Array, default: () => [] },
  height: { type: Number, default: 220 },
});

const width = 640;
const padX = 18;
const padY = 16;
const max = Math.max(1, ...props.series.flatMap((item) => item.values || []));
const fillSeries = props.series[0];
const ticks = [0.25, 0.5, 0.75, 1];
</script>

<template>
  <div class="hbr-chart">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Seat trend">
      <line
        v-for="tick in ticks"
        :key="tick"
        :x1="padX"
        :x2="width - padX"
        :y1="padY + (height - padY * 2) * (1 - tick)"
        :y2="padY + (height - padY * 2) * (1 - tick)"
        class="hbr-chart-grid"
      />
      <path
        v-if="fillSeries"
        :d="areaPath(fillSeries.values, width, height, padX, padY, max)"
        :fill="fillSeries.color"
        opacity="0.12"
      />
      <path
        v-for="item in series"
        :key="item.name"
        :d="linePath(item.values, width, height, padX, padY, max)"
        fill="none"
        :stroke="item.color"
        stroke-width="2.5"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
    <div class="hbr-chart-labels">
      <span v-for="label in labels" :key="label">{{ label }}</span>
    </div>
    <div class="hbr-chart-legend">
      <span v-for="item in series" :key="item.name">
        <i :style="{ background: item.color }" />
        {{ item.name }}
      </span>
    </div>
  </div>
</template>
