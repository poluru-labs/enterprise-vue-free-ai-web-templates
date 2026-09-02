<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  className: { type: String, default: '' },
});
</script>

<template>
  <section class="hbr-panel" :class="className">
    <header class="hbr-panel-header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action" class="hbr-panel-action">
        <slot name="action" />
      </div>
    </header>
    <div class="hbr-panel-body">
      <slot />
    </div>
  </section>
</template>
