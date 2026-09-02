<script setup>
import { computed } from 'vue';
import { Status } from '@poluru-labs/enterprise-design-system-vue';
import { statusLabel, statusTone } from '../../utils/status.js';

const props = defineProps({
  status: { type: [String, Number], default: '' },
});

const tone = computed(() => statusTone(props.status));
const label = computed(() => statusLabel(props.status));
</script>

<template>
  <Status :tone="tone" :label="label" dot />
</template>
