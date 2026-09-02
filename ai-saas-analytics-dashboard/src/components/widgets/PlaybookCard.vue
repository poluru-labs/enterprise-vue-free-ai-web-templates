<script setup>
import { Card } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  item: { type: Object, required: true },
});
</script>

<template>
  <Card class-name="pulse-eq-card pulse-playbook-card" :title="item.title">
    <div class="pulse-card-fill">
      <p class="pulse-card-copy">{{ item.content }}</p>
      <div class="pulse-card-meta">
        <span class="pulse-muted">{{ item.owner }}</span>
        <strong>{{ item.impact }}</strong>
      </div>
    </div>
  </Card>
</template>
