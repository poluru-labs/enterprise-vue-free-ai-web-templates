<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Avatar,
  Badge,
  Button,
  DescriptionList,
  EmptyState,
  List,
  Status,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { findPartner, openDealCount, partnerDeals, type Tier } from '@/data/directory'

const route = useRoute()
const router = useRouter()

const partner = computed(() => findPartner(String(route.params.id ?? '')))

const deals = computed(() => {
  if (!partner.value) return []
  return partnerDeals(partner.value.id).filter((deal) => deal.status !== 'Filed')
})

function tierVariant(value: Tier) {
  if (value === 'Premier') return 'brand' as const
  if (value === 'Select') return 'info' as const
  return 'neutral' as const
}
</script>

<template>
  <EmptyState
    v-if="!partner"
    title="Partner not found"
    description="That firm is not on the book."
    icon="search"
  />
  <template v-else>
    <PageHead
      :title="partner.firm"
      :lede="`${partner.lead} · ${partner.region}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Partners', to: `${BASE_PATH}/partners` }, { label: partner.firm }]"
    />
    <div class="ay-record">
      <Avatar :name="partner.lead" size="xl" />
      <div>
        <Badge :label="partner.tier" :variant="tierVariant(partner.tier)" soft />
        <Status
          :label="openDealCount(partner.id) ? `${openDealCount(partner.id)} open deals` : 'No open deals'"
          :tone="openDealCount(partner.id) ? 'info' : 'neutral'"
        />
      </div>
      <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/partners`)">Back to directory</Button>
    </div>
    <DescriptionList
      class="ay-block"
      :items="[
        { term: 'Region', description: partner.region },
        { term: 'Since', description: partner.since },
        { term: 'Phone', description: partner.phone },
        { term: 'Email', description: partner.email },
      ]"
    />
    <h2 class="ay-subhead">Recent</h2>
    <Timeline :items="partner.activity" />
    <h2 class="ay-subhead">Open deals</h2>
    <p v-if="deals.length === 0" class="ay-quiet">No open deals.</p>
    <List
      v-else
      :items="deals.map((deal) => ({ id: deal.id, label: `${deal.number} · ${deal.name}`, description: deal.status }))"
    />
  </template>
</template>
