<script setup>
import { useRouter } from 'vue-router';
import { Breadcrumb } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  crumbs: { type: Array, default: () => [] },
});

const router = useRouter();

function onCrumbClick(event) {
  const link = event.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('http')) return;
  event.preventDefault();
  router.push(href);
}
</script>

<template>
  <header class="mrg-page-header">
    <div v-if="crumbs.length" @click.capture="onCrumbClick">
      <Breadcrumb
        :items="crumbs.map((crumb, index) => ({
          label: crumb.label,
          href: index < crumbs.length - 1 ? crumb.to : undefined,
        }))"
      />
    </div>
    <div class="mrg-page-header-row">
      <div>
        <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="mrg-page-actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
