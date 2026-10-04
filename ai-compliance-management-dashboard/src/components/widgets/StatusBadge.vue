<script setup>
import { Badge, Status } from '@poluru-labs/enterprise-design-system-vue';
import { badgeVariant, statusLabel } from '../../utils/status.js';

const props = defineProps({
  status: { type: [String, Number], default: '' },
  pulse: { type: Boolean, default: false },
});

const tone = badgeVariant(props.status);
const label = statusLabel(props.status);
const live =
  props.pulse ||
  ['effective', 'published', 'mapped', 'in_progress', 'fieldwork'].includes(
    String(props.status).toLowerCase().replace(/[\s-]+/g, '_'),
  );
</script>

<template>
  <Status v-if="live" :label="label" :tone="tone === 'brand' ? 'info' : tone" dot />
  <Badge v-else :label="label" :variant="tone" soft pill size="sm" />
</template>
