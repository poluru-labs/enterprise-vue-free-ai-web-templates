<script setup>
defineProps({
  columns: { type: Number, default: 3 },
  label: { type: String, default: '' },
});
</script>

<template>
  <section
    class="pulse-eq-grid"
    :class="`pulse-eq-grid--${columns}`"
    :aria-label="label || undefined"
  >
    <slot />
  </section>
</template>
