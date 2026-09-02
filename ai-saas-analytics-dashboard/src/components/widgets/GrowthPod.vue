<script setup>
import { Avatar, Badge, Card } from '@poluru-labs/enterprise-design-system-vue';
import { quotaVariant } from '../../utils/status.js';

defineProps({
  members: { type: Array, required: true },
});
</script>

<template>
  <Card title="Growth pod" description="Experiments shipped this month">
    <div class="pulse-stack">
      <div v-for="member in members" :key="member.name" class="pulse-row pulse-row-between">
        <div class="pulse-row">
          <Avatar :name="member.name" size="sm" />
          <div>
            <strong>{{ member.name }}</strong>
            <div class="pulse-muted">{{ member.closed }} shipped · {{ member.pipeline }}</div>
          </div>
        </div>
        <Badge :label="`${member.quota}%`" :variant="quotaVariant(member.quota)" pill />
      </div>
    </div>
  </Card>
</template>
