<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button, Card, Meter } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, occupiedCount } from '@/data/board'

const router = useRouter()
</script>

<template>
  <PageHead
    title="Units"
    lede="Cedar, Maple, and Harbor."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Units' }]"
  />

  <div class="wl-unit-grid">
    <Card
      v-for="unit in desk.units"
      :key="unit.id"
      :title="unit.name"
      :description="`${unit.rooms.length} rooms · ${unit.charge}`"
    >
      <Meter
        :value="occupiedCount(unit)"
        :max="unit.rooms.length"
        label="Occupied"
        show-value
      />
      <div class="wl-card-action">
        <Button size="sm" variant="secondary" @click="router.push(`${BASE_PATH}/units/${unit.id}`)">
          Open unit
        </Button>
      </div>
    </Card>
  </div>
</template>
