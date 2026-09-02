<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  className: { type: String, default: '' },
});
</script>

<template>
  <section class="lumen-panel" :class="className">
    <header class="lumen-panel-header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action" class="lumen-panel-action">
        <slot name="action" />
      </div>
    </header>
    <div class="lumen-panel-body">
      <slot />
    </div>
  </section>
</template>
