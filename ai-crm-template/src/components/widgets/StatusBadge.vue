<script setup>
import { Badge, Status } from '@poluru-labs/enterprise-design-system-vue';
import { statusLabel, statusTone } from '../../utils/status.js';

const props = defineProps({
  status: { type: String, default: '' },
  pulse: { type: Boolean, default: false },
});

const tone = statusTone(props.status);
const label = statusLabel(props.status);
const live = props.pulse || ['Negotiation', 'Working', 'Ready'].includes(props.status);
</script>

<template>
  <Status v-if="live" :label="label" :tone="tone === 'brand' ? 'info' : tone" />
  <Badge v-else :label="label" :variant="tone === 'brand' ? 'info' : tone" pill />
</template>
