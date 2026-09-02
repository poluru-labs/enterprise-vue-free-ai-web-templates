<script setup>
import { Card, Stat } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  item: { type: Object, required: true },
});
</script>

<template>
  <Card class-name="quota-eq-card quota-kpi-card">
    <Stat
      :label="item.label"
      :value="item.value"
      :hint="item.hint"
      :trend="item.trend"
      :trend-value="item.trendValue"
    />
    <div
      class="quota-kpi-fill"
      role="meter"
      :aria-valuenow="item.fill"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`${item.label} fill`"
    >
      <span :style="{ width: `${Math.min(100, item.fill)}%` }"></span>
    </div>
  </Card>
</template>
