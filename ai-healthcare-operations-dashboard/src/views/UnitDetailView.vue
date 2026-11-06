<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Alert, Avatar, Card, DescriptionList, Status } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/board'
import { roomTone } from '@/utils/status'

const route = useRoute()

const unit = computed(() => desk.units.find((item) => item.id === route.params.id) ?? desk.units[0])

const facts = computed(() => {
  const current = unit.value
  if (!current) return []
  const open = current.rooms.filter((room) => room.status === 'Open').length
  return [
    { term: 'Charge', description: current.charge },
    { term: 'Rooms', description: String(current.rooms.length) },
    { term: 'Beds open', description: String(open) },
  ]
})
</script>

<template>
  <PageHead
    v-if="unit"
    :title="unit.name"
    lede="Rooms, the charge nurse, and supply notes."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Units', to: `${BASE_PATH}/units` }, { label: unit.name }]"
  />

  <section v-if="unit" class="wl-charge">
    <Avatar :name="unit.charge" size="md" />
    <DescriptionList :items="facts" />
  </section>

  <Alert
    v-for="alert in unit?.alerts ?? []"
    :key="alert.id"
    class="wl-alert"
    variant="warning"
    :title="alert.item"
    :message="alert.note"
  />
  <p v-if="unit && !unit.alerts.length" class="wl-quiet">No supply alerts.</p>

  <div class="wl-rooms">
    <Card v-for="room in unit?.rooms ?? []" :key="room.id" :title="room.number" :description="unit?.name">
      <Status :label="room.status" :tone="roomTone(room.status)" />
    </Card>
  </div>
</template>
