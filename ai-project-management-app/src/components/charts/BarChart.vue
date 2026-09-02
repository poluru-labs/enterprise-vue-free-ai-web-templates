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
  <div class="keel-hbar-list" role="list">
    <div v-for="item in items" :key="item.name" class="keel-hbar" role="listitem">
      <div class="keel-hbar-meta">
        <span>{{ item.name }}</span>
        <strong>{{ item.value }}{{ unit }}</strong>
      </div>
      <div class="keel-hbar-track">
        <div
          class="keel-hbar-fill"
          :style="{ width: widthFor(item, peakOf(items, maxValue)), background: item.color || 'var(--keel)' }"
        />
      </div>
    </div>
  </div>
</template>
