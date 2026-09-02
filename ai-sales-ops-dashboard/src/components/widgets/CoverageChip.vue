<script setup>
defineProps({
  value: { type: [Number, String], required: true },
  label: { type: String, default: 'Coverage' },
});
</script>

<template>
  <div class="quota-coverage-chip" :aria-label="`${label} ${value}`">
    <small>{{ label }}</small>
    <strong>{{ value }}</strong>
  </div>
</template>
