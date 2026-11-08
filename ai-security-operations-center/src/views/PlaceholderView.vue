<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'

const route = useRoute()
const title = computed(() => (typeof route.meta.title === 'string' ? route.meta.title : 'Watchline'))
</script>

<template>
  <PageHead :title="title" lede="The watch is being set." :crumbs="[BREADCRUMB_ROOT, { label: title }]" />
</template>
