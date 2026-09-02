<script setup>
import { Avatar, Badge, Card } from '@poluru-labs/enterprise-design-system-vue';
import { quotaVariant } from '../../utils/status.js';

defineProps({
  item: { type: Object, required: true },
});
</script>

<template>
  <Card class-name="quota-eq-card quota-team-card" :title="item.name">
    <div class="quota-card-fill">
      <div class="quota-row">
        <Avatar :name="item.name" size="sm" />
        <div>
          <div class="quota-muted">{{ item.region }}</div>
          <div class="quota-muted">{{ item.closed }} closed · {{ item.pipeline }} pipeline</div>
        </div>
      </div>
      <div class="quota-card-meta">
        <span class="quota-muted">Quota attained</span>
        <Badge :label="`${item.quota}%`" :variant="quotaVariant(item.quota)" pill />
      </div>
    </div>
  </Card>
</template>
