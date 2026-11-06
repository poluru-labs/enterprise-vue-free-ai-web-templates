<script setup lang="ts">
import { Stepper } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'
</script>

<template>
  <PageHead
    title="Changes"
    lede="Windows that are already on the calendar."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Changes' }]"
  />

  <Stepper
    class="dk-stepper"
    :active-index="0"
    :steps="desk.changes.map((change) => ({ id: change.id, label: change.title, description: change.window }))"
  />

  <div class="dk-change-list">
    <article v-for="change in desk.changes" :key="change.id">
      <h2>{{ change.title }}</h2>
      <p class="dk-quiet">{{ change.window }} · {{ change.owner }}</p>
      <p>{{ change.note }}</p>
    </article>
  </div>
</template>
