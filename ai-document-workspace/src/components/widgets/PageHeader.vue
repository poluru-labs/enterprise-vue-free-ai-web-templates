<script setup>
defineProps({
  eyebrow: { type: String, default: 'Knowledge ops' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
});
</script>

<template>
  <header class="vault-page-header">
    <div>
      <span class="vault-eyebrow">{{ eyebrow }}</span>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <div class="vault-page-header-actions">
      <slot name="actions" />
    </div>
  </header>
</template>
