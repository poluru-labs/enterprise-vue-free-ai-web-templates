<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import PageHead from '@/components/layout/PageHead.vue'

const route = useRoute()
const title = computed(() => (typeof route.meta.title === 'string' ? route.meta.title : 'Copperlane'))
</script>

<template>
  <PageHead :title="title" :crumbs="[BREADCRUMB_ROOT, { label: title }]" />
  <p class="cl-quiet">This page is part of the Copperlane inbox.</p>
</template>
