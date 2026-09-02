<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  maxValue: { type: Number, default: 0 },
  unit: { type: String, default: '' },
});

const peak = props.maxValue || Math.max(1, ...props.items.map((item) => item.value || 0));

function widthFor(item) {
  return `${Math.max(5, (item.value / peak) * 100)}%`;
}
</script>

<template>
  <div class="grove-hbar-list" role="list">
    <div v-for="item in items" :key="item.name" class="grove-hbar" role="listitem">
      <div class="grove-hbar-meta">
        <span>{{ item.name }}</span>
        <strong>{{ Number(item.value).toLocaleString('en-US') }}{{ unit }}</strong>
      </div>
      <div class="grove-hbar-track">
        <div
          class="grove-hbar-fill"
          :style="{ width: widthFor(item), background: item.color || 'var(--grove-accent)' }"
        />
      </div>
    </div>
  </div>
</template>
