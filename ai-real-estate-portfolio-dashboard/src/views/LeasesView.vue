<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  DatePicker,
  DescriptionList,
  Drawer,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, money, propertyName } from '@/data/portfolio'

const drawerOpen = ref(false)
const selectedId = ref('')
const renewOn = ref('2027-12-01')

const leases = computed(() => book.units.filter((unit) => unit.status === 'Leased'))
const selected = computed(() => leases.value.find((unit) => unit.id === selectedId.value))

function openLease(id: string) {
  const unit = book.units.find((item) => item.id === id)
  if (!unit) return
  selectedId.value = id
  renewOn.value = unit.ends || '2027-12-01'
  drawerOpen.value = true
}

function renew() {
  const unit = book.units.find((item) => item.id === selectedId.value)
  if (!unit || !renewOn.value) return
  unit.ends = renewOn.value
  drawerOpen.value = false
  showToast({
    title: 'Renewed',
    description: `${unit.tenant} stays through ${unit.ends}.`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    title="Leases"
    lede="End dates for the occupied units."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Leases' }]"
  />
  <div class="lw-leases">
    <button v-for="unit in leases" :key="unit.id" type="button" class="lw-lease" @click="openLease(unit.id)">
      <strong>{{ propertyName(unit.propertyId) }} {{ unit.label }}</strong>
      <span>{{ unit.tenant }}</span>
      <span class="lw-quiet">{{ money(unit.rent) }}</span>
      <span>{{ unit.ends }}</span>
    </button>
  </div>
  <Drawer v-model:open="drawerOpen" :heading="selected ? `${propertyName(selected.propertyId)} ${selected.label}` : 'Lease'" size="md">
    <template v-if="selected">
      <DescriptionList
        :items="[
          { term: 'Tenant', description: selected.tenant },
          { term: 'Rent', description: money(selected.rent) },
          { term: 'Ends', description: selected.ends },
        ]"
      />
      <DatePicker v-model="renewOn" label="Renew through" />
      <Button type="button" @click="renew">Renew</Button>
    </template>
  </Drawer>
</template>
