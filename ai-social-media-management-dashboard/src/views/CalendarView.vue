<script setup lang="ts">
import { ref } from 'vue'
import { Button, SegmentedControl, Status, Tag } from '@poluru-labs/enterprise-design-system-vue'
import ComposerModal from '@/components/ComposerModal.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, CHANNELS } from '@/constants/navigation'
import { WEEK, openComposer, postsOn, type Post, type PostState } from '@/data/desk'

const channel = ref('all')
const segments = [{ value: 'all', label: 'All' }, ...CHANNELS.map((item) => ({ value: item, label: item }))]

function tone(state: PostState) {
  return state === 'Posted' ? ('success' as const) : ('info' as const)
}

function edit(post: Post) {
  openComposer(post)
}
</script>

<template>
  <PageHead title="9–15 November" lede="Bakery and park posts for the week." :crumbs="[BREADCRUMB_ROOT, { label: 'Calendar' }]">
    <template #actions>
      <Button type="button" @click="openComposer()">New post</Button>
    </template>
  </PageHead>
  <SegmentedControl v-model="channel" class="po-filters" :segments="segments" />
  <div class="po-board">
    <div class="po-week">
      <section v-for="day in WEEK" :key="day.id" class="po-day">
        <h2>{{ day.name }} {{ day.date }}</h2>
        <button v-for="post in postsOn(day.id, channel)" :key="post.id" type="button" class="po-post" @click="edit(post)">
          <Tag :label="post.channel" />
          <strong>{{ post.title }}</strong>
          <span>{{ post.caption }}</span>
          <span class="po-meta">
            {{ post.time }}
            <Status :label="post.state" :tone="tone(post.state)" />
          </span>
        </button>
        <p v-if="postsOn(day.id, channel).length === 0" class="po-quiet">Quiet</p>
      </section>
    </div>
  </div>
  <ComposerModal />
</template>
