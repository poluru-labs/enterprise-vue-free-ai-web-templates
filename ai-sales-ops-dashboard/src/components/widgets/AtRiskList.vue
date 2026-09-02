<script setup>
import { Card, CircularProgress } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <Card title="At-risk deals" description="Commit and hygiene risks that need a next step this week">
    <div class="quota-risk-list">
      <div v-for="item in items" :key="item.id" class="quota-risk-row">
        <CircularProgress :value="item.health" show-value :label="item.account" />
        <div>
          <strong>{{ item.account }}</strong>
          <p class="quota-muted">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>
