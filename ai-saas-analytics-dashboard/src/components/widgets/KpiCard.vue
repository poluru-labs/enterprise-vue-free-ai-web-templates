<script setup>
import { Card, Stat } from '@poluru-labs/enterprise-design-system-vue';
import Sparkline from '../charts/Sparkline.vue';

defineProps({
  item: { type: Object, required: true },
});
</script>

<template>
  <Card class-name="pulse-eq-card pulse-kpi-card">
    <Stat
      :label="item.label"
      :value="item.value"
      :hint="item.hint"
      :trend="item.trend"
      :trend-value="item.trendValue"
    />
    <Sparkline :values="item.spark" :width="180" :height="40" :label="`${item.label} trend`" />
  </Card>
</template>
