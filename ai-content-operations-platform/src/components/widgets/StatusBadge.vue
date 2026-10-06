<script setup>
import { Badge, Status } from '@poluru-labs/enterprise-design-system-vue';
import { badgeVariant, statusLabel } from '../../utils/status.js';

const props = defineProps({
  status: { type: [String, Number], default: '' },
});

const tone = badgeVariant(props.status);
const label = statusLabel(props.status);
const live = ['published', 'scheduled', 'live', 'approved'].includes(
  String(props.status).toLowerCase().replace(/[\s-]+/g, '_'),
);
</script>

<template>
  <Status v-if="live" :label="label" :tone="tone === 'brand' ? 'info' : tone" dot />
  <Badge v-else :label="label" :variant="tone" soft pill size="sm" />
</template>
