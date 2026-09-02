<script setup>
defineProps({
  eyebrow: { type: String, default: 'Quota' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
});
</script>

<template>
  <header class="quota-page-header">
    <div>
      <span class="quota-eyebrow">{{ eyebrow }}</span>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="quota-page-actions">
      <slot name="actions" />
    </div>
  </header>
</template>
