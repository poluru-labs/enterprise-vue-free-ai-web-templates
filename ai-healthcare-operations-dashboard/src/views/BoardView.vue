<script setup lang="ts">
import { Card, Stat, Status, Timeline } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, openBeds } from '@/data/board'
import { roomTone } from '@/utils/status'
</script>

<template>
  <PageHead
    title="Board"
    lede="Open beds, today's admissions, and the rooms on Cedar, Maple, and Harbor."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Board' }]"
  />

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

  <section v-for="unit in desk.units" :key="unit.id" class="wl-unit-block">
    <h2>{{ unit.name }}</h2>
    <p class="wl-quiet">{{ unit.charge }} · charge</p>
    <div class="wl-rooms">
      <Card v-for="room in unit.rooms" :key="room.id" :title="room.number" :description="unit.name">
        <Status :label="room.status" :tone="roomTone(room.status)" />
      </Card>
    </div>
  </section>

  <section class="wl-shift">
    <h2>This shift</h2>
    <Timeline :items="desk.shift" />
  </section>
</template>
