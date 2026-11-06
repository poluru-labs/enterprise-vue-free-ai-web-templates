<script setup lang="ts">
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = typeof route.meta.title === 'string' ? route.meta.title : 'Board'
</script>

<template>
  <PageHead :title="title" lede="This page is part of the Wardline board." :crumbs="[BREADCRUMB_ROOT, { label: title }]" />
</template>
