<script setup lang="ts">
import { computed, ref } from 'vue'
import { DescriptionList, Drawer, SegmentedControl, Status, Timeline } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { watch as desk, type ChangeState } from '@/data/watch'

const scope = ref('scheduled')
const openId = ref('')
const drawerOpen = ref(false)

const segments = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'draft', label: 'Draft' },
  { value: 'all', label: 'All' },
]

const visible = computed(() =>
  desk.changes
    .filter((item) => scope.value === 'all' || item.state.toLowerCase() === scope.value)
    .slice()
    .sort((a, b) => a.when.localeCompare(b.when)),
)

const log = computed(() =>
  visible.value.map((item) => ({
    id: item.id,
    title: item.title,
    description: `${item.number} · ${item.owner}`,
    time: item.when,
  })),
)

const change = computed(() => desk.changes.find((item) => item.id === openId.value))

function tone(state: ChangeState) {
  return state === 'Scheduled' ? ('info' as const) : ('neutral' as const)
}

function openChange(id: string) {
  openId.value = id
  drawerOpen.value = true
}
</script>

<template>
  <PageHead title="Changes" lede="Upcoming control changes." :crumbs="[BREADCRUMB_ROOT, { label: 'Changes' }]" />
  <SegmentedControl v-model="scope" class="wl-filters" :segments="segments" />
  <div class="wl-schedule">
    <button v-for="item in visible" :key="item.id" type="button" class="wl-change" @click="openChange(item.id)">
      <span>{{ item.when }}</span>
      <span>
        <strong>{{ item.title }}</strong>
        <span class="wl-quiet">{{ item.number }} · {{ item.owner }}</span>
      </span>
      <Status :label="item.state" :tone="tone(item.state)" />
    </button>
  </div>
  <h2 class="wl-record">On the calendar</h2>
  <Timeline :items="log" />
  <Drawer v-model:open="drawerOpen" :heading="change?.title ?? 'Change'" size="sm">
    <DescriptionList
      v-if="change"
      :items="[
        { term: 'Number', description: change.number },
        { term: 'When', description: change.when },
        { term: 'Owner', description: change.owner },
        { term: 'State', description: change.state },
      ]"
    />
  </Drawer>
</template>
