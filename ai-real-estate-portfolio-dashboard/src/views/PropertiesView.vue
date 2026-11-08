<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Badge, EmptyState, Search, SegmentedControl } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, CITIES } from '@/constants/navigation'
import { book, occupancyOf } from '@/data/portfolio'

const router = useRouter()
const query = ref('')
const city = ref('all')

const segments = [
  { value: 'all', label: 'All' },
  ...CITIES.map((item) => ({ value: item, label: item })),
]

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return book.properties.filter((property) => {
    const cityOk = city.value === 'all' || property.city === city.value
    const text = `${property.name} ${property.address} ${property.manager}`.toLowerCase()
    return cityOk && (q.length === 0 || text.includes(q))
  })
})
</script>

<template>
  <PageHead
    title="Properties"
    lede="The four buildings."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Properties' }]"
  />
  <div class="lw-tools">
    <Search v-model="query" placeholder="Find a building" />
    <SegmentedControl v-model="city" :segments="segments" />
  </div>
  <EmptyState
    v-if="visible.length === 0"
    title="No buildings match"
    description="Try another city or a shorter name."
    icon="search"
  />
  <div v-else class="lw-leases">
    <button
      v-for="property in visible"
      :key="property.id"
      type="button"
      class="lw-lease"
      @click="router.push(`${BASE_PATH}/properties/${property.id}`)"
    >
      <strong>{{ property.name }}</strong>
      <span>{{ property.address }}</span>
      <Badge :label="property.city" variant="brand" soft />
      <span class="lw-quiet">{{ occupancyOf(property.id).leased }} of {{ occupancyOf(property.id).total }}</span>
    </button>
  </div>
</template>
