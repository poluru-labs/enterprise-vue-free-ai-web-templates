<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  maxValue: { type: Number, default: 0 },
  unit: { type: String, default: '%' },
});

function widthFor(item, peak) {
  return `${Math.max(5, (item.value / peak) * 100)}%`;
}

function peakOf(items, maxValue) {
  return maxValue || Math.max(1, ...items.map((item) => item.value || 0));
}
</script>

<template>
  <div class="bloom-hbar-list" role="list">
    <div v-for="item in items" :key="item.name" class="bloom-hbar" role="listitem">
      <div class="bloom-hbar-meta">
        <span>{{ item.name }}</span>
        <strong>{{ item.value }}{{ unit }}</strong>
      </div>
      <div class="bloom-hbar-track">
        <div
          class="bloom-hbar-fill"
          :style="{ width: widthFor(item, peakOf(items, maxValue)), background: item.color || 'var(--bloom)' }"
        />
      </div>
    </div>
  </div>
</template>
