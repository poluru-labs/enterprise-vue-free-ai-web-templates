<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Drawer,
  EmptyState,
  Kbd,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Spinner,
  Stat,
  Status,
  Tag,
  Timeline,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, openBeds, type RoomStatus } from '@/data/board'
import { roomTone } from '@/utils/status'

const filter = ref('all')
const query = ref('')
const refreshing = ref(false)
const noteOpen = ref(false)
const drawerOpen = ref(false)
const activeId = ref('')

const visibleUnits = computed(() =>
  desk.units
    .filter((unit) => filter.value === 'all' || unit.name === filter.value)
    .map((unit) => ({
      ...unit,
      rooms: unit.rooms.filter((room) => room.number.includes(query.value.trim())),
    }))
    .filter((unit) => unit.rooms.length),
)

const active = computed(() => {
  for (const unit of desk.units) {
    const room = unit.rooms.find((item) => item.id === activeId.value)
    if (room) return { room, unit }
  }
  return null
})

function refresh() {
  refreshing.value = true
  window.setTimeout(() => {
    refreshing.value = false
  }, 450)
}

function openRoom(id: string) {
  activeId.value = id
  drawerOpen.value = true
}

function setStatus(status: RoomStatus) {
  const current = active.value
  if (!current) return
  current.room.status = status
  drawerOpen.value = false
}
</script>

<template>
  <PageHead
    title="Board"
    lede="Open beds, today's admissions, and the rooms on Cedar, Maple, and Harbor."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Board' }]"
  >
    <template #actions>
      <Popover v-model:open="noteOpen" heading="Open beds" placement="bottom">
        <template #trigger>
          <button type="button" class="wl-text-btn">How this is counted</button>
        </template>
        <p class="wl-quiet">A bed counts as open when the room status is Open.</p>
      </Popover>
      <Tooltip content="Reload the board">
        <Button size="sm" variant="secondary" :loading="refreshing" @click="refresh">Refresh</Button>
      </Tooltip>
      <Kbd :keys="['/']" />
    </template>
  </PageHead>

  <div class="wl-stats">
    <Stat label="Beds open" :value="String(openBeds())" hint="Ready for an admission" />
    <Stat label="Admissions today" :value="String(desk.admissionsToday)" hint="Since 07:00" />
    <Stat
      label="Delayed discharges"
      :value="String(desk.delayedDischarges)"
      hint="Still on the board"
      trend="flat"
      trend-value="This shift"
    />
  </div>

  <Toolbar class="wl-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Room number" clearable />
    </template>
    <template #end>
      <SegmentedControl
        v-model="filter"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'Cedar', label: 'Cedar' },
          { value: 'Maple', label: 'Maple' },
          { value: 'Harbor', label: 'Harbor' },
        ]"
      />
    </template>
  </Toolbar>

  <div v-if="refreshing" class="wl-skeleton">
    <Spinner label="Refreshing the board" show-label />
    <Skeleton variant="rectangular" width="100%" height="120px" />
  </div>

  <EmptyState
    v-else-if="!visibleUnits.length"
    title="No rooms match"
    description="Try another number, or show every unit."
    icon="search"
  />

  <template v-else>
    <section v-for="unit in visibleUnits" :key="unit.id" class="wl-unit-block">
      <h2>{{ unit.name }}</h2>
      <p class="wl-quiet">{{ unit.charge }} · charge</p>
      <div class="wl-rooms">
        <button v-for="room in unit.rooms" :key="room.id" type="button" class="wl-room-btn" @click="openRoom(room.id)">
          <Card :title="room.number" :description="unit.name">
            <span class="wl-pills">
              <Status :label="room.status" :tone="roomTone(room.status)" />
              <Tag :label="unit.name" />
              <Badge v-if="room.status === 'Open'" label="Ready" variant="success" soft />
            </span>
          </Card>
        </button>
      </div>
    </section>
  </template>

  <section class="wl-shift">
    <h2>This shift</h2>
    <Timeline :items="desk.shift" />
  </section>

  <Drawer v-model:open="drawerOpen" :heading="active ? `Room ${active.room.number}` : 'Room'" size="md">
    <template v-if="active">
      <p class="wl-quiet">{{ active.unit.name }} · {{ active.unit.charge }}</p>
      <p class="wl-room-status">
        <Status :label="active.room.status" :tone="roomTone(active.room.status)" />
      </p>
      <ButtonGroup>
        <Button @click="setStatus('Open')">Mark open</Button>
        <Button variant="secondary" @click="setStatus('Cleaning')">Cleaning</Button>
      </ButtonGroup>
    </template>
  </Drawer>
</template>
