<script setup>
import { Card } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  item: { type: Object, required: true },
});
</script>

<template>
  <Card class-name="quota-eq-card quota-playbook-card" :title="item.title">
    <div class="quota-card-fill">
      <p class="quota-card-copy">{{ item.content }}</p>
      <div class="quota-card-meta">
        <span class="quota-muted">{{ item.owner }}</span>
        <strong>{{ item.impact }}</strong>
      </div>
    </div>
  </Card>
</template>
