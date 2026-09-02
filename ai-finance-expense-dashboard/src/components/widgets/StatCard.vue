<script setup>
import { Card, Stat } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  hint: { type: String, default: '' },
  trend: { type: String, default: '' },
  trendValue: { type: String, default: '' },
});
</script>

<template>
  <Card class="mint-stat-card">
    <Stat :label="label" :value="value" :hint="hint" :trend="trend" :trend-value="trendValue" />
  </Card>
</template>
