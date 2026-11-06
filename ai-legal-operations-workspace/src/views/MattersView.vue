<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Badge, Search, SegmentedControl, Status, Tag, Toolbar } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { ledger, type MatterStatus } from '@/data/ledger'

const router = useRouter()
const query = ref('')
const scope = ref('open')

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return ledger.matters.filter((matter) => {
    if (scope.value === 'open' && (matter.status === 'Signed' || matter.status === 'Closed')) return false
    if (!term) return true
    return (
      matter.number.toLowerCase().includes(term) ||
      matter.title.toLowerCase().includes(term) ||
      matter.party.toLowerCase().includes(term)
    )
  })
})

function tone(status: MatterStatus) {
  if (status === 'Signed') return 'success' as const
  if (status === 'Waiting') return 'warning' as const
  if (status === 'Closed') return 'neutral' as const
  return 'info' as const
}

function openMatter(id: string) {
  router.push(`/briefwell/matters/${id}`)
}
</script>

<template>
  <PageHead title="Matters" lede="Open files on the desk." :crumbs="[BREADCRUMB_ROOT, { label: 'Matters' }]" />
  <Toolbar class="bw-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Find a matter" />
      <SegmentedControl
        v-model="scope"
        :segments="[
          { value: 'open', label: 'Open' },
          { value: 'all', label: 'All' },
        ]"
      />
    </template>
  </Toolbar>
  <div class="bw-ledger">
    <div class="bw-ledger-head">
      <span>Matter</span>
      <span>Title</span>
      <span>Party</span>
      <span>Status</span>
      <span>Due</span>
    </div>
    <button
      v-for="matter in visible"
      :key="matter.id"
      type="button"
      class="bw-ledger-row"
      @click="openMatter(matter.id)"
    >
      <span class="bw-number">{{ matter.number }}</span>
      <span>
        {{ matter.title }}
        <Tag :label="matter.kind" />
      </span>
      <span>{{ matter.party }}</span>
      <Status :label="matter.status" :tone="tone(matter.status)" />
      <Badge :label="matter.due" variant="neutral" soft />
    </button>
  </div>
  <p v-if="visible.length === 0" class="bw-quiet">No matters match.</p>
</template>
