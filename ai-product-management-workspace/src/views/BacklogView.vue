<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { AREAS, BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { board, findSpec } from '@/data/board'

const router = useRouter()

const tree = computed(() =>
  AREAS.map((area) => ({
    id: area,
    label: area,
    children: board.specs
      .filter((spec) => spec.area === area)
      .map((spec) => ({ id: spec.id, label: `${spec.number} ${spec.title}` })),
  })),
)

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
  <div class="sb-tree">
    <TreeView :nodes="tree" @select="onSelect" />
  </div>
</template>
