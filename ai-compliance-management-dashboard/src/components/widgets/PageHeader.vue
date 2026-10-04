<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  crumbs: { type: Array, default: () => [] },
});
</script>

<template>
  <header class="aeg-page-header">
    <nav v-if="crumbs.length" class="aeg-breadcrumb" aria-label="Breadcrumb">
      <span v-for="(crumb, index) in crumbs" :key="`${crumb.label}-${index}`" class="aeg-breadcrumb-item">
        <i v-if="index > 0" class="bi bi-chevron-right" aria-hidden="true" />
        <span v-if="index === crumbs.length - 1 || !crumb.to" aria-current="page">{{ crumb.label }}</span>
        <RouterLink v-else :to="crumb.to">{{ crumb.label }}</RouterLink>
      </span>
    </nav>
    <div class="aeg-page-header-row">
      <div>
        <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="aeg-page-actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
