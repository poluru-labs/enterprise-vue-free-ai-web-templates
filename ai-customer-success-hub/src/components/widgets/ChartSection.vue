<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
});
</script>

<template>
  <section class="mrg-panel">
    <header class="mrg-panel-header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action" class="mrg-panel-action">
        <slot name="action" />
      </div>
    </header>
    <div class="mrg-panel-body">
      <slot />
    </div>
  </section>
</template>
