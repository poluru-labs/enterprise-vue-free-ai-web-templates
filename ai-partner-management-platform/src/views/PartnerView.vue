<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  DescriptionList,
  EmptyState,
  FileUpload,
  List,
  Modal,
  Rating,
  Status,
  Tag,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { findPartner, openDealCount, partnerDeals, type Tier } from '@/data/directory'

const route = useRoute()
const router = useRouter()
const noteOpen = ref(false)

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

function fileNote() {
  if (!partner.value) return
  noteOpen.value = false
  showToast({
    title: 'Note filed',
    description: `${partner.value.firm} has a desk note.`,
    variant: 'success',
  })
}

function onRateCard() {
  if (!partner.value) return
  showToast({
    title: 'Rate card received',
    description: partner.value.firm,
    variant: 'info',
  })
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
        <Tag :label="partner.region" />
        <Status
          :label="openDealCount(partner.id) ? `${openDealCount(partner.id)} open deals` : 'No open deals'"
          :tone="openDealCount(partner.id) ? 'info' : 'neutral'"
        />
      </div>
      <ButtonGroup>
        <Button type="button" @click="noteOpen = true">File a note</Button>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/partners`)">Back to directory</Button>
      </ButtonGroup>
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
    <Rating :model-value="partner.score" label="Standing" read-only />
    <h2 class="ay-subhead">Recent</h2>
    <Timeline :items="partner.activity" />
    <h2 class="ay-subhead">Open deals</h2>
    <p v-if="deals.length === 0" class="ay-quiet">No open deals.</p>
    <List
      v-else
      :items="deals.map((deal) => ({ id: deal.id, label: `${deal.number} · ${deal.name}`, description: deal.status }))"
    />
    <h2 class="ay-subhead">Rate card</h2>
    <FileUpload label="Signed rate card" accept=".pdf,.png" @files-change="onRateCard" />
    <Modal :open="noteOpen" heading="File a note" @update:open="noteOpen = $event">
      <p>A short note for {{ partner.firm }}.</p>
      <template #footer>
        <Button type="button" variant="secondary" @click="noteOpen = false">Cancel</Button>
        <Button type="button" @click="fileNote">File note</Button>
      </template>
    </Modal>
  </template>
</template>
