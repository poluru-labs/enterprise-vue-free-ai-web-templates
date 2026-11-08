<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar, Card, Status, Tabs } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, HORIZONS } from '@/constants/navigation'
import { board, type Horizon, type SpecStatus } from '@/data/board'

const router = useRouter()
const horizon = ref<Horizon>('Now')

const tabs = HORIZONS.map((item) => ({ id: item, label: item }))

const visible = computed(() => board.specs.filter((spec) => spec.horizon === horizon.value))

function tone(status: SpecStatus) {
  if (status === 'Shipped') return 'success' as const
  if (status === 'Locked') return 'info' as const
  if (status === 'In review') return 'warning' as const
  return 'neutral' as const
}

function openSpec(id: string) {
  router.push(`${BASE_PATH}/specs/${id}`)
}
</script>

<template>
  <PageHead
    title="Roadmap"
    lede="Now, next, and later for the workplace desk."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Roadmap' }]"
  />
  <Tabs v-model="horizon" :items="tabs" class="sb-tabs" />
  <div class="sb-board">
    <Card v-for="spec in visible" :key="spec.id" class="sb-spec">
      <button type="button" class="sb-spec-btn" @click="openSpec(spec.id)">
        <span class="sb-kicker">{{ spec.number }} · {{ spec.area }}</span>
        <strong>{{ spec.title }}</strong>
        <span class="sb-problem">{{ spec.problem }}</span>
        <span class="sb-foot">
          <Avatar :name="spec.owner" size="sm" />
          <span>{{ spec.owner }}</span>
          <Status :label="spec.status" :tone="tone(spec.status)" />
        </span>
      </button>
    </Card>
  </div>
</template>
