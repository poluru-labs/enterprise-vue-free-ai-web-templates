<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, DescriptionList, Divider, Timeline, TreeView } from '@poluru-labs/enterprise-design-system-vue'
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

const picked = ref('')
const seriesTree = computed(() => {
  const series = ['Bakery', 'Park'] as const
  return series.map((name) => ({
    id: name,
    label: name,
    children: desk.posts.filter((post) => post.series === name).map((post) => ({ id: post.id, label: post.title })),
  }))
})

function onSelect(id: string) {
  const post = desk.posts.find((item) => item.id === id)
  if (post) picked.value = post.title
}

const coming = computed(() =>
  desk.posts
    .filter((post) => post.state === 'Scheduled')
    .slice()
    .sort((a, b) => `${a.day}${a.time}`.localeCompare(`${b.day}${b.time}`))
    .slice(0, 4)
    .map((post) => ({
      id: post.id,
      title: post.title,
      description: `${post.channel} · ${post.owner}`,
      time: `${post.day} ${post.time}`,
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
  <h2 class="po-coming">Series</h2>
  <TreeView :nodes="seriesTree" @select="onSelect" />
  <p v-if="picked" class="po-quiet">{{ picked }}</p>
  <h2 class="po-coming">Coming up</h2>
  <Timeline :items="coming" />
</template>
