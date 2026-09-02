<script setup>
defineProps({
  columns: { type: Number, default: 3 },
  label: { type: String, default: '' },
});
</script>

<template>
  <section
    class="quota-eq-grid"
    :class="`quota-eq-grid--${columns}`"
    :aria-label="label || undefined"
  >
    <slot />
  </section>
</template>
