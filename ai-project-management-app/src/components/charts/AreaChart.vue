<script setup>
const props = defineProps({
  labels: { type: Array, default: () => [] },
  series: { type: Array, default: () => [] },
  height: { type: Number, default: 220 },
});

const width = 640;
const padX = 18;
const padY = 16;

function peak() {
  return Math.max(1, ...props.series.flatMap((item) => item.values || []));
}

function linePath(values) {
  if (!values.length) return '';
  const max = peak();
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
</script>

<template>
  <div class="keel-chart">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Throughput trend">
      <line
        v-for="tick in [0.25, 0.5, 0.75, 1]"
        :key="tick"
        :x1="padX"
        :x2="width - padX"
        :y1="padY + (height - padY * 2) * (1 - tick)"
        :y2="padY + (height - padY * 2) * (1 - tick)"
        class="keel-chart-grid"
      />
      <path
        v-if="series[0]"
        :d="areaPath(series[0].values)"
        :fill="series[0].color"
        opacity="0.12"
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
    <div class="keel-chart-labels">
      <span v-for="label in labels" :key="label">{{ label }}</span>
    </div>
    <div class="keel-chart-legend">
      <span v-for="item in series" :key="item.name">
        <i :style="{ background: item.color }" />
        {{ item.name }}
      </span>
    </div>
  </div>
</template>
