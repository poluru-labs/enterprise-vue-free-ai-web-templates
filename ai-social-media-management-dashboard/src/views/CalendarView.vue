<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Alert,
  Autocomplete,
  Badge,
  Button,
  EmptyState,
  Kbd,
  Popover,
  SegmentedControl,
  Skeleton,
  Stat,
  Status,
  Tag,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import ComposerModal from '@/components/ComposerModal.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, CHANNELS } from '@/constants/navigation'
import { WEEK, desk, openComposer, postsOn, type Post, type PostState } from '@/data/desk'

const channel = ref('all')
const jump = ref('')
const helpOpen = ref(false)
const loading = ref(false)
const segments = [{ value: 'all', label: 'All' }, ...CHANNELS.map((item) => ({ value: item, label: item }))]
const titles = computed(() => desk.posts.map((post) => ({ value: post.title, label: `${post.title} · ${post.channel}` })))
const scheduled = computed(() => desk.posts.filter((post) => post.state === 'Scheduled').length)
const drafts = computed(() => desk.posts.filter((post) => post.state === 'Draft').length)

function tone(state: PostState) {
  return state === 'Posted' ? ('success' as const) : ('info' as const)
}

function edit(post: Post) {
  openComposer(post)
}

function onJump(value: string) {
  const post = desk.posts.find((item) => item.title === value)
  if (post) openComposer(post)
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}
</script>

<template>
  <PageHead title="9–15 November" lede="Bakery and park posts for the week." :crumbs="[BREADCRUMB_ROOT, { label: 'Calendar' }]">
    <template #actions>
      <Tooltip content="Write a caption by hand">
        <Button type="button" @click="openComposer()">New post</Button>
      </Tooltip>
    </template>
  </PageHead>
  <Stat class="po-stat" label="Scheduled" :value="String(scheduled)" hint="On this week" />
  <Alert v-if="drafts > 0" class="po-filters" variant="info" title="Drafts" :message="`${drafts} posts are off the board.`" />
  <Toolbar class="po-filters">
    <template #start>
      <SegmentedControl v-model="channel" :segments="segments" />
    </template>
    <template #end>
      <Kbd :keys="['N']" />
      <Popover v-model:open="helpOpen" heading="Caption" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">Caption</Button>
        </template>
        <p>Captions stay short. Write them by hand.</p>
      </Popover>
      <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
    </template>
  </Toolbar>
  <Autocomplete v-model="jump" class="po-filters" label="Jump to a post" :options="titles" @update:model-value="onJump" />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="180px" />
  <div v-else class="po-board">
    <div class="po-week">
      <section v-for="day in WEEK" :key="day.id" class="po-day">
        <h2>{{ day.name }} {{ day.date }}</h2>
        <button v-for="post in postsOn(day.id, channel)" :key="post.id" type="button" class="po-post" @click="edit(post)">
          <span class="po-marks">
            <Tag :label="post.channel" />
            <Badge :label="post.series" variant="neutral" soft />
          </span>
          <strong>{{ post.title }}</strong>
          <span>{{ post.caption }}</span>
          <span class="po-meta">
            {{ post.time }}
            <Status :label="post.state" :tone="tone(post.state)" />
          </span>
        </button>
        <EmptyState
          v-if="postsOn(day.id, channel).length === 0"
          title="Quiet day"
          description="Nothing is scheduled."
          icon="check"
        />
      </section>
    </div>
  </div>
  <ComposerModal />
</template>
