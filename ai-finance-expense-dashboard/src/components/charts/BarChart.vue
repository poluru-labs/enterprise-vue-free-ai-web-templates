<script setup>
import { computed } from 'vue';
import { formatNumber } from '../../utils/format.js';

const props = defineProps({
  items: { type: Array, default: () => [] },
  unit: { type: String, default: '' },
});

const peak = computed(() => Math.max(1, ...props.items.map((item) => Number(item.value || 0))));
</script>

<template>
  <div class="mint-hbar-list" role="list">
    <div v-for="item in items" :key="item.name" class="mint-hbar" role="listitem">
      <div class="mint-hbar-meta">
        <span>{{ item.name }}</span>
        <strong>{{ formatNumber(item.value) }}{{ unit }}</strong>
      </div>
      <div class="mint-hbar-track">
        <span
          class="mint-hbar-fill"
          :style="{ width: `${Math.max(6, (item.value / peak) * 100)}%`, background: item.color || '#10B981' }"
        />
      </div>
    </div>
  </div>
</template>
