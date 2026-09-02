<script setup>
defineProps({
  title: { type: String, required: true },
  hint: { type: String, default: '' },
});
</script>

<template>
  <section class="atlas-panel">
    <div class="atlas-panel-head">
      <h2>{{ title }}</h2>
      <span v-if="hint" class="atlas-muted">{{ hint }}</span>
    </div>
    <div class="atlas-panel-body">
      <slot />
    </div>
  </section>
</template>
