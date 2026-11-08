<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { EmptyState, Search, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { AREAS, BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { board, findSpec } from '@/data/board'

const router = useRouter()
const query = ref('')

const tree = computed(() => {
  const q = query.value.trim().toLowerCase()
  return AREAS.map((area) => ({
    id: area,
    label: area,
    children: board.specs
      .filter((spec) => {
        const text = `${spec.number} ${spec.title} ${spec.owner}`.toLowerCase()
        return spec.area === area && (q.length === 0 || text.includes(q))
      })
      .map((spec) => ({ id: spec.id, label: `${spec.number} ${spec.title}` })),
  })).filter((node) => node.children.length > 0)
})

function onSelect(id: string) {
  const spec = findSpec(id)
  if (!spec) return
  router.push(`${BASE_PATH}/specs/${spec.id}`)
}
</script>

<template>
  <PageHead
    title="Backlog"
    lede="Epics and the stories under them."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Backlog' }]"
  />
  <Search v-model="query" class="sb-jump" placeholder="Find a story" />
  <EmptyState
    v-if="tree.length === 0"
    title="Nothing in the backlog"
    description="No epic or story matches that search."
    icon="search"
  />
  <div v-else class="sb-tree">
    <TreeView :nodes="tree" @select="onSelect" />
  </div>
</template>
