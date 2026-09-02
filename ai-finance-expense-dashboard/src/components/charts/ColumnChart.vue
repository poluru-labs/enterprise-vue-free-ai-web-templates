<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  height: { type: Number, default: 180 },
});

const width = 640;
const padX = 28;
const padY = 18;

const max = computed(() => Math.max(1, ...props.items.map((item) => Number(item.value || 0))));
const barWidth = computed(() => (width - padX * 2) / Math.max(props.items.length, 1));
</script>

<template>
  <div class="mint-chart">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Monthly spend">
      <line
        v-for="tick in [0.25, 0.5, 0.75, 1]"
        :key="tick"
        :x1="padX"
        :x2="width - padX"
        :y1="padY + (height - padY * 2) * (1 - tick)"
        :y2="padY + (height - padY * 2) * (1 - tick)"
        class="mint-chart-grid"
      />
      <rect
        v-for="(item, index) in items"
        :key="item.name"
        :x="padX + index * barWidth + 10"
        :y="height - padY - (item.value / max) * (height - padY * 2)"
        :width="Math.max(barWidth - 18, 8)"
        :height="Math.max((item.value / max) * (height - padY * 2), 4)"
        rx="6"
        :fill="item.color || '#10B981'"
      />
    </svg>
    <div class="mint-chart-labels">
      <span v-for="item in items" :key="item.name">{{ item.name }}</span>
    </div>
  </div>
</template>
