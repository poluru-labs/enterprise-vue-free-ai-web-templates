<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, DescriptionList, EmptyState, List, Status } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { findProperty, money, unitsFor } from '@/data/portfolio'

const route = useRoute()
const router = useRouter()
const property = computed(() => findProperty(String(route.params.id ?? '')))
const units = computed(() => (property.value ? unitsFor(property.value.id) : []))
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
    <div class="lw-detail">
      <DescriptionList
        :items="[
          { term: 'Address', description: property.address },
          { term: 'City', description: property.city },
          { term: 'Manager', description: property.manager },
        ]"
      />
      <h2>Units</h2>
      <List
        :items="
          units.map((unit) => ({
            id: unit.id,
            label: `Unit ${unit.label}`,
            description: unit.status === 'Leased' ? `${unit.tenant} · ${money(unit.rent)}` : 'Vacant',
          }))
        "
      />
      <Status v-for="unit in units" :key="unit.id" :label="`${unit.label} ${unit.status}`" :tone="unit.status === 'Leased' ? 'success' : 'warning'" />
    </div>
  </template>
</template>
