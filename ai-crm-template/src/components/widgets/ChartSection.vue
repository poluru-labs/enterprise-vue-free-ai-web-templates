<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
});
</script>

<template>
  <section class="bloom-panel">
    <header class="bloom-panel-header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action" class="bloom-panel-action">
        <slot name="action" />
      </div>
    </header>
    <div class="bloom-panel-body">
      <slot />
    </div>
  </section>
</template>
