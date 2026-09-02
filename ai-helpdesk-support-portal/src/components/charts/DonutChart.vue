<script setup>
const TAU = Math.PI * 2;

function polar(cx, cy, radius, angle) {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function arcPath(cx, cy, radius, startAngle, endAngle) {
  const start = polar(cx, cy, radius, startAngle);
  const end = polar(cx, cy, radius, endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

const props = defineProps({
  items: { type: Array, default: () => [] },
  centerLabel: { type: String, default: 'Total' },
  centerValue: { type: [String, Number], default: null },
});

const total = props.items.reduce((sum, item) => sum + Number(item.value || 0), 0) || 1;
const radius = 54;
let cursor = -Math.PI / 2;
const slices = props.items.map((item) => {
  const sweep = Math.max((Number(item.value || 0) / total) * TAU, 0.02);
  const start = cursor;
  const end = cursor + sweep;
  cursor = end;
  return { ...item, start, end };
});
</script>

<template>
  <div class="lumen-donut">
    <svg viewBox="0 0 160 160" role="img" :aria-label="centerLabel">
      <circle cx="80" cy="80" :r="radius" class="lumen-donut-track" />
      <path
        v-for="slice in slices"
        :key="slice.name"
        :d="arcPath(80, 80, radius, slice.start, slice.end)"
        fill="none"
        :stroke="slice.color"
        stroke-width="16"
        stroke-linecap="butt"
      />
      <text x="80" y="76" text-anchor="middle" class="lumen-donut-value">
        {{ centerValue ?? total }}
      </text>
      <text x="80" y="96" text-anchor="middle" class="lumen-donut-label">
        {{ centerLabel }}
      </text>
    </svg>
    <ul class="lumen-donut-legend">
      <li v-for="item in items" :key="item.name">
        <i :style="{ background: item.color }" />
        <span>{{ item.name }}</span>
        <strong>{{ item.value }}</strong>
      </li>
    </ul>
  </div>
</template>
