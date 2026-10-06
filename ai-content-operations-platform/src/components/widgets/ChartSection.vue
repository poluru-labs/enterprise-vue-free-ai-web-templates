<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
});
</script>

<template>
  <section class="flo-panel">
    <header class="flo-panel-header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action" class="flo-panel-action">
        <slot name="action" />
      </div>
    </header>
    <div class="flo-panel-body">
      <slot />
    </div>
  </section>
</template>
