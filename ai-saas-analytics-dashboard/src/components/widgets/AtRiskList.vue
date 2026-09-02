<script setup>
import { Card, CircularProgress } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <Card title="At-risk accounts" description="Accounts that need a growth-pod follow-up this week">
    <div class="pulse-risk-list">
      <div v-for="item in items" :key="item.id" class="pulse-risk-row">
        <CircularProgress :value="item.health" show-value :label="item.account" />
        <div>
          <strong>{{ item.account }}</strong>
          <p class="pulse-muted">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>
