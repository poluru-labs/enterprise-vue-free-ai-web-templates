<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Badge, Button, Card, DataTable, Meter, Rating, Stat, Tag } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, money, occupancyOf, propertyName } from '@/data/portfolio'

const router = useRouter()

const leased = computed(() => book.units.filter((unit) => unit.status === 'Leased'))
const occupancy = computed(() => {
  if (book.units.length === 0) return 0
  return Math.round((leased.value.length / book.units.length) * 100)
})
const collected = computed(() => leased.value.reduce((sum, unit) => sum + unit.rent, 0))

const columns = [
  { key: 'building', label: 'Building', sortable: true },
  { key: 'unit', label: 'Unit' },
  { key: 'tenant', label: 'Tenant', sortable: true },
  { key: 'rent', label: 'Rent' },
  { key: 'ends', label: 'Ends' },
  { key: 'status', label: 'Status' },
]

const rows = computed(() =>
  book.units.map((unit) => ({
    building: propertyName(unit.propertyId),
    unit: unit.label,
    tenant: unit.tenant || '—',
    rent: money(unit.status === 'Leased' ? unit.rent : 0),
    ends: unit.ends || '—',
    status: unit.status,
  })),
)

</script>

<template>
  <PageHead
    title="Portfolio"
    lede="Austin and Denver, on one sheet."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Portfolio' }]"
  />
  <section class="lw-sheet">
    <div class="lw-stats">
      <Stat label="Properties" :value="String(book.properties.length)" hint="Small buildings" />
      <Stat label="Occupancy" :value="`${occupancy}%`" :hint="`${leased.length} of ${book.units.length} units`" />
      <Stat label="Rent collected" :value="money(collected)" hint="Leased units this month" />
    </div>
    <div class="lw-cards">
      <Card v-for="property in book.properties" :key="property.id" class="lw-card">
        <div class="lw-card-body">
          <div class="lw-card-top">
            <div>
              <strong>{{ property.name }}</strong>
              <span class="lw-quiet">{{ property.address }}</span>
            </div>
            <Badge :label="property.city" variant="brand" soft />
          </div>
          <Tag :label="`${occupancyOf(property.id).leased} leased`" />
          <Meter
            :value="occupancyOf(property.id).leased"
            :max="Math.max(occupancyOf(property.id).total, 1)"
            label="Occupied"
            show-value
          />
          <Rating :model-value="property.score" label="Standing" read-only />
          <Button type="button" variant="secondary" size="sm" @click="router.push(`${BASE_PATH}/properties/${property.id}`)">
            Open
          </Button>
        </div>
      </Card>
    </div>
    <div class="lw-rent">
      <DataTable :columns="columns" :rows="rows" compact striped />
    </div>
  </section>
</template>
