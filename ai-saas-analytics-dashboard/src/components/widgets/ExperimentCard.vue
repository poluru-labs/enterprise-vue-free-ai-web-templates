<script setup>
import { Card, Status, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { statusTone } from '../../utils/status.js';

defineProps({
  item: { type: Object, required: true },
});
</script>

<template>
  <Card class-name="pulse-eq-card pulse-experiment-card" :title="item.title">
    <div class="pulse-card-fill">
      <p class="pulse-card-copy">{{ item.summary }}</p>
      <div class="pulse-card-meta">
        <Status :label="item.status" :tone="statusTone(item.status)" />
        <Tag :label="item.lift" variant="brand" />
      </div>
      <div class="pulse-muted">{{ item.owner }} · {{ item.confidence }} confidence</div>
    </div>
  </Card>
</template>
