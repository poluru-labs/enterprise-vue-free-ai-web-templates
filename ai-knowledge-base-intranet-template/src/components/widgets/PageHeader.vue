<script setup>
defineProps({
  eyebrow: { type: String, default: 'Company intranet' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
});
</script>

<template>
  <header class="atlas-page-header">
    <div>
      <span class="atlas-eyebrow">{{ eyebrow }}</span>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <div class="atlas-page-header-actions">
      <slot name="actions" />
    </div>
  </header>
</template>
