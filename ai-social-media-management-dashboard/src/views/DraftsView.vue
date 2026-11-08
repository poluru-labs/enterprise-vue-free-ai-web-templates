<script setup lang="ts">
import { computed } from 'vue'
import { Button, DataTable } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'

const columns = [
  { key: 'title', label: 'Draft' },
  { key: 'channel', label: 'Channel' },
  { key: 'series', label: 'Series' },
  { key: 'owner', label: 'Owner' },
  { key: 'when', label: 'When' },
]

const drafts = computed(() => desk.posts.filter((post) => post.state === 'Draft'))
const rows = computed(() =>
  drafts.value.map((post) => ({
    title: post.title,
    channel: post.channel,
    series: post.series,
    owner: post.owner,
    when: `${post.day} ${post.time}`,
  })),
)
</script>

<template>
  <PageHead title="Drafts" lede="Posts still off the week board." :crumbs="[BREADCRUMB_ROOT, { label: 'Drafts' }]" />
  <div class="po-draft-actions">
    <Button v-for="post in drafts" :key="post.id" type="button" size="sm" variant="secondary">{{ post.title }}</Button>
  </div>
  <div class="po-table">
    <DataTable :columns="columns" :rows="rows" compact />
  </div>
</template>
