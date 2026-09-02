<script setup>
import { Button } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  onReset: { type: Function, default: null },
});
</script>

<template>
  <div class="bloom-filter-bar">
    <div v-if="$slots.search" class="bloom-filter-search">
      <slot name="search" />
    </div>
    <div class="bloom-filter-fields">
      <slot />
    </div>
    <Button v-if="onReset" variant="tertiary" size="sm" @click="onReset">Reset</Button>
  </div>
</template>
