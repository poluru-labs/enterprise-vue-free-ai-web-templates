<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import PageHead from '@/components/layout/PageHead.vue'

const route = useRoute()
const title = computed(() => (typeof route.meta.title === 'string' ? route.meta.title : 'Northline'))
</script>

<template>
  <PageHead :title="title" :crumbs="[BREADCRUMB_ROOT, { label: title }]" />
  <p class="nl-muted">This page is part of the Northline desk.</p>
</template>
