<script setup>
const props = defineProps({
  labels: { type: Array, default: () => [] },
  ideal: { type: Array, default: () => [] },
  actual: { type: Array, default: () => [] },
  height: { type: Number, default: 240 },
});

const width = 720;
const padX = 28;
const padY = 18;

function peak() {
  return Math.max(1, ...props.ideal, ...props.actual);
}

function linePath(values) {
  if (!values.length) return '';
  return values
    .map((value, index) => {
      const { x, y } = coord(props.labels.length ? props.labels : values, index);
      const plotted = padY + (props.height - padY * 2) - (value / peak()) * (props.height - padY * 2);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${plotted.toFixed(1)}`;
    })
    .join(' ');
}

function lastActual() {
  if (!props.actual.length) return null;
  const index = props.actual.length - 1;
  const x =
    padX +
    (props.labels.length <= 1 ? (width - padX * 2) / 2 : (index / (props.labels.length - 1)) * (width - padX * 2));
  const y = padY + (props.height - padY * 2) - (props.actual[index] / peak()) * (props.height - padY * 2);
  return { x, y, value: props.actual[index] };
}
</script>

<template>
  <div class="keel-chart" data-testid="burndown">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Sprint burndown remaining points">
      <line
        v-for="tick in [0.25, 0.5, 0.75, 1]"
        :key="tick"
        :x1="padX"
        :x2="width - padX"
        :y1="padY + (height - padY * 2) * (1 - tick)"
        :y2="padY + (height - padY * 2) * (1 - tick)"
        class="keel-chart-grid"
      />
      <path :d="linePath(ideal)" fill="none" stroke="#99F6E4" stroke-width="2" stroke-dasharray="5 5" />
      <path :d="linePath(actual)" fill="none" stroke="#0F766E" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" />
      <circle
        v-if="lastActual()"
        :cx="lastActual().x"
        :cy="lastActual().y"
        r="5"
        fill="#14B8A6"
        stroke="#0F766E"
        stroke-width="2"
      />
    </svg>
    <div class="keel-chart-labels">
      <span v-for="label in labels" :key="label">{{ label }}</span>
    </div>
    <div class="keel-chart-legend">
      <span><i style="background: #99f6e4" /> Ideal</span>
      <span><i style="background: #0f766e" /> Remaining</span>
    </div>
  </div>
</template>
