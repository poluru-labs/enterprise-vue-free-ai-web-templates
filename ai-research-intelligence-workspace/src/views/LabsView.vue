<script setup lang="ts">
import { computed, ref } from 'vue'
import { Accordion, DataTable, DescriptionList, EmptyState, List, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { shelf } from '@/data/shelf'

const selected = ref('kiln-room')

const tree = computed(() =>
  shelf.rooms.map((room) => ({
    id: room.id,
    label: room.name,
    children: room.equipment.map((piece, index) => ({
      id: `${room.id}-${index}`,
      label: piece,
    })),
  })),
)

const room = computed(() => shelf.rooms.find((item) => item.id === selected.value))

const columns = [
  { key: 'piece', label: 'Piece' },
  { key: 'room', label: 'Room' },
  { key: 'keeper', label: 'Keeper' },
]

const rows = computed(() =>
  shelf.rooms.flatMap((item) =>
    item.equipment.map((piece) => ({
      piece,
      room: item.name,
      keeper: item.keeper,
    })),
  ),
)

const notes = computed(() =>
  room.value ? [{ id: room.value.id, title: 'Room note', content: room.value.note }] : [],
)

const pieces = computed(() =>
  (room.value?.equipment ?? []).map((piece, index) => ({
    id: `${room.value?.id ?? 'room'}-${index}`,
    label: piece,
    description: room.value?.keeper ?? '',
  })),
)

function onSelect(id: string) {
  const match = shelf.rooms.find((item) => item.id === id || id.startsWith(`${item.id}-`))
  if (match) selected.value = match.id
}
</script>

<template>
  <PageHead title="Labs" lede="Rooms and the equipment in them." :crumbs="[BREADCRUMB_ROOT, { label: 'Labs' }]" />
  <div class="sh-lab">
    <TreeView :nodes="tree" @select="onSelect" />
    <div v-if="room" class="sh-record">
      <h2>{{ room.name }}</h2>
      <DescriptionList
        :items="[
          { term: 'Floor', description: room.floor },
          { term: 'Keeper', description: room.keeper },
        ]"
      />
      <List :items="pieces" />
      <Accordion :items="notes" />
    </div>
    <EmptyState v-else title="Pick a room" description="Choose a room in the tree." icon="search" />
  </div>
  <h2 class="sh-shelf-title">Pieces on the shelf</h2>
  <div class="sh-table">
    <DataTable :columns="columns" :rows="rows" compact />
  </div>
</template>
