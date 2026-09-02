<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
});
</script>

<template>
  <section class="keel-panel">
    <header class="keel-panel-header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action" class="keel-panel-action">
        <slot name="action" />
      </div>
    </header>
    <div class="keel-panel-body">
      <slot />
    </div>
  </section>
</template>
