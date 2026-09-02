<script setup>
import { Badge, Status } from '@poluru-labs/enterprise-design-system-vue';
import { statusLabel, statusTone } from '../../utils/status.js';

const props = defineProps({
  status: { type: String, default: '' },
  pulse: { type: Boolean, default: false },
});

const tone = statusTone(props.status);
const label = statusLabel(props.status);
const live = props.pulse || ['In progress', 'Watch', 'Tight', 'Active'].includes(props.status);
const variant = tone === 'brand' ? 'info' : tone;
</script>

<template>
  <Status v-if="live" :label="label" :tone="variant" />
  <Badge v-else :label="label" :variant="variant" pill />
</template>
