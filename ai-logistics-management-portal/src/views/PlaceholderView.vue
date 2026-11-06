<script setup lang="ts">
import { useRoute } from 'vue-router'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'

const route = useRoute()
const title = typeof route.meta.title === 'string' ? route.meta.title : 'Loads'
</script>

<template>
  <PageHead :title="title" lede="This page is part of the Waybill board." :crumbs="[BREADCRUMB_ROOT, { label: title }]" />
</template>
