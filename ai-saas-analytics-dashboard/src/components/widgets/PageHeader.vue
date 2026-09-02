<script setup>
defineProps({
  eyebrow: { type: String, default: 'Pulse' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
});
</script>

<template>
  <header class="pulse-page-header">
    <div>
      <span class="pulse-eyebrow">{{ eyebrow }}</span>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="pulse-page-actions">
      <slot name="actions" />
    </div>
  </header>
</template>
