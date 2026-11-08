<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Alert,
  Button,
  ButtonGroup,
  DescriptionList,
  Divider,
  EmptyState,
  ProgressBar,
  Status,
  Stepper,
  Tabs,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, findProperty, findUnit, money, propertyName, unitsFor } from '@/data/portfolio'

const route = useRoute()
const router = useRouter()
const tab = ref('units')
const unitId = ref('')

const property = computed(() => findProperty(String(route.params.id ?? '')))
const units = computed(() => (property.value ? unitsFor(property.value.id) : []))
const selected = computed(() => findUnit(unitId.value) ?? units.value[0])
const orders = computed(() =>
  property.value ? book.orders.filter((order) => order.propertyId === property.value?.id) : [],
)

const tabs = [
  { id: 'units', label: 'Units' },
  { id: 'work', label: 'Work' },
]

const steps = [
  { id: 'listed', label: 'Listed', description: 'On the market.' },
  { id: 'leased', label: 'Leased', description: 'A tenant is in.' },
  { id: 'notice', label: 'Notice', description: 'The end date is near.' },
]

const soon = computed(() => {
  const unit = selected.value
  if (!unit || unit.status !== 'Leased') return false
  return unit.ends <= '2026-12-31'
})

const events = computed(() => {
  const unit = selected.value
  if (!unit || unit.status !== 'Leased') return []
  return [{ id: `${unit.id}-lease`, title: 'Leased', description: `${unit.tenant} signed.`, time: unit.ends }]
})
</script>

<template>
  <EmptyState v-if="!property" title="Property not found" description="That building is not on the sheet." icon="search" />
  <template v-else>
    <PageHead
      :title="property.name"
      :lede="`${property.address}, ${property.city}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Properties', to: `${BASE_PATH}/properties` }, { label: property.name }]"
    >
      <template #actions>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/portfolio`)">Back to portfolio</Button>
      </template>
    </PageHead>
    <Tabs v-model="tab" :items="tabs" class="lw-tabs" />
    <div v-if="tab === 'units'" class="lw-detail">
      <div class="lw-picks">
        <Button
          v-for="unit in units"
          :key="unit.id"
          type="button"
          size="sm"
          :variant="selected?.id === unit.id ? 'primary' : 'secondary'"
          @click="unitId = unit.id"
        >
          {{ unit.label }}
        </Button>
      </div>
      <template v-if="selected && selected.status === 'Vacant'">
        <EmptyState
          title="Vacant unit"
          :description="`No lease on ${selected.label}.`"
          icon="search"
        />
        <Status :label="`${selected.label} vacant`" tone="warning" />
      </template>
      <template v-else-if="selected">
        <Stepper :steps="steps" :active-index="soon ? 2 : 1" />
        <Alert v-if="soon" title="End date is near" :description="`${selected.tenant} ends ${selected.ends}.`" />
        <DescriptionList
          :items="[
            { term: 'Tenant', description: selected.tenant },
            { term: 'Rent', description: money(selected.rent) },
            { term: 'Ends', description: selected.ends },
            { term: 'Manager', description: property.manager },
          ]"
        />
        <ProgressBar label="Term" :value="soon ? 80 : 40" show-value />
        <Divider />
        <Timeline :items="events" />
        <ButtonGroup>
          <Button type="button" @click="router.push(`${BASE_PATH}/leases`)">Open leases</Button>
          <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/maintenance/new`)">New work order</Button>
        </ButtonGroup>
      </template>
    </div>
    <div v-else class="lw-orders">
      <article v-for="order in orders" :key="order.id" class="lw-order">
        <div>
          <strong>{{ order.number }} · {{ order.title }}</strong>
          <p class="lw-quiet">{{ propertyName(order.propertyId) }} · {{ order.status }}</p>
        </div>
        <Status :label="order.status" :tone="order.status === 'Open' ? 'warning' : 'success'" />
      </article>
    </div>
  </template>
</template>
