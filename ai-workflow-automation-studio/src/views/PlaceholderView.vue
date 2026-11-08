<script setup lang="ts">
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'

defineProps<{ title: string; lede: string }>()
</script>

<template>
  <PageHead :title="title" :lede="lede" :crumbs="[BREADCRUMB_ROOT, { label: title }]" />
</template>
