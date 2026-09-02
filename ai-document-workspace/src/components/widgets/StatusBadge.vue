<script setup>
import { Status } from '@poluru-labs/enterprise-design-system-vue';
import { statusTone } from '../../utils/status.js';

const props = defineProps({
  label: { type: String, required: true },
  tone: { type: String, default: '' },
});
</script>

<template>
  <Status :label="label" :tone="tone || statusTone(label)" />
</template>
