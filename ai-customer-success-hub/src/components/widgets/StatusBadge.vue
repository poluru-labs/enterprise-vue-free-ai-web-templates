<script setup>
import { Badge, Status } from '@poluru-labs/enterprise-design-system-vue';
import { badgeVariant, statusLabel, statusTone } from '../../utils/status.js';

const props = defineProps({
  status: { type: [String, Number], default: '' },
});

const tone = statusTone(props.status);
const label = statusLabel(props.status);
const live = ['healthy', 'committed', 'live', 'train', 'integrate'].includes(
  String(props.status).toLowerCase().replace(/[\s-]+/g, '_'),
);
</script>

<template>
  <Status v-if="live" :label="label" :tone="tone === 'neutral' ? 'info' : tone" dot />
  <Badge v-else :label="label" :variant="badgeVariant(status)" soft pill size="sm" />
</template>
