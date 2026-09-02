<script setup>
defineProps({
  title: { type: String, required: true },
  hint: { type: String, default: '' },
});
</script>

<template>
  <section class="vault-panel">
    <div class="vault-panel-head">
      <h2>{{ title }}</h2>
      <span v-if="hint" class="vault-muted">{{ hint }}</span>
    </div>
    <div class="vault-panel-body">
      <slot />
    </div>
  </section>
</template>
