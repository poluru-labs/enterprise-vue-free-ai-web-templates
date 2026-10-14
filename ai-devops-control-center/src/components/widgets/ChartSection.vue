<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
});
</script>

<template>
  <section class="tde-panel">
    <header class="tde-panel-header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action" class="tde-panel-action">
        <slot name="action" />
      </div>
    </header>
    <div class="tde-panel-body">
      <slot />
    </div>
  </section>
</template>
