<script setup>
import { computed } from 'vue';
import { Badge, Status } from '@poluru-labs/enterprise-design-system-vue';
import { badgeVariant, statusLabel, statusTone } from '../../utils/status.js';

const props = defineProps({
  status: { type: [String, Number], default: '' },
});

const tone = computed(() => statusTone(props.status));
const label = computed(() => statusLabel(props.status));
const live = computed(() =>
  ['open', 'posted', 'current', 'busy', 'review', 'scheduled'].includes(String(props.status).toLowerCase()),
);
</script>

<template>
  <Status v-if="live" :label="label" :tone="tone === 'neutral' ? 'info' : tone" dot />
  <Badge v-else :label="label" :variant="badgeVariant(status)" soft pill size="sm" />
</template>
