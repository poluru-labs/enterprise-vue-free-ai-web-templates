<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, DescriptionList, Divider } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, CHANNELS } from '@/constants/navigation'
import { CHANNEL_OWNERS, desk } from '@/data/desk'

const rows = computed(() =>
  CHANNELS.map((channel) => ({
    channel,
    owners: [...CHANNEL_OWNERS[channel]],
    count: desk.posts.filter((post) => post.channel === channel && post.state !== 'Draft').length,
  })),
)
</script>

<template>
  <PageHead title="Channels" lede="Notes, Photos, and Mail, and who posts." :crumbs="[BREADCRUMB_ROOT, { label: 'Channels' }]" />
  <div class="po-channels">
    <section v-for="(row, index) in rows" :key="row.channel" class="po-channel">
      <Divider v-if="index > 0" />
      <h2>{{ row.channel }}</h2>
      <div class="po-owners">
        <span v-for="name in row.owners" :key="name" class="po-owner">
          <Avatar :name="name" size="sm" />
          {{ name }}
        </span>
      </div>
      <DescriptionList
        :items="[
          { term: 'On the week', description: String(row.count) },
          { term: 'Default', description: desk.defaultChannel === row.channel ? 'Yes' : 'No' },
        ]"
      />
    </section>
  </div>
</template>
