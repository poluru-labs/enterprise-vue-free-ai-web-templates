<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  crumbs: { type: Array, default: () => [] },
});
</script>

<template>
  <header class="keel-page-header">
    <nav v-if="crumbs.length" class="keel-breadcrumb" aria-label="Breadcrumb">
      <span v-for="(crumb, index) in crumbs" :key="`${crumb.label}-${index}`" class="keel-breadcrumb-item">
        <i v-if="index > 0" class="bi bi-chevron-right" aria-hidden="true" />
        <span v-if="index === crumbs.length - 1 || !crumb.to" aria-current="page">{{ crumb.label }}</span>
        <RouterLink v-else :to="crumb.to">{{ crumb.label }}</RouterLink>
      </span>
    </nav>
    <div class="keel-page-header-row">
      <div>
        <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="keel-page-actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
