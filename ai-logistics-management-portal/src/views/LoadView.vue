<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Button,
  ButtonGroup,
  Card,
  DescriptionList,
  Divider,
  FileUpload,
  Modal,
  NumberInput,
  ProgressBar,
  Status,
  Stepper,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, STAGES } from '@/constants/navigation'
import { findLoad, type LoadStatus } from '@/data/yard'

const route = useRoute()
const router = useRouter()
const note = ref('')
const confirmOpen = ref(false)
const load = computed(() => findLoad(String(route.params.id ?? '')))
const counted = ref(0)

watch(
  load,
  (current) => {
    counted.value = current?.pieces ?? 0
  },
  { immediate: true },
)

function tone(status: LoadStatus) {
  if (status === 'Delivered') return 'success' as const
  if (status === 'Held') return 'warning' as const
  if (status === 'On dock') return 'info' as const
  return 'neutral' as const
}

function markDelivered() {
  const current = load.value
  if (!current) return
  current.stage = 4
  current.status = 'Delivered'
  current.pieces = counted.value
  confirmOpen.value = false
  showToast({
    title: 'Marked delivered',
    description: `${current.number} is signed for.`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    v-if="load"
    :title="load.number"
    :lede="`${load.from} to ${load.to}`"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Loads', to: '/waybill/loads' }, { label: load.number }]"
  />
  <article v-if="load" class="wy-detail">
    <Stepper :steps="[...STAGES]" :active-index="load.stage" />
    <ProgressBar label="Along the lane" :value="Math.round((load.stage / 4) * 100)" show-value />
    <Status :label="load.status" :tone="tone(load.status)" />
    <DescriptionList
      :items="[
        { term: 'Lane', description: `${load.from} → ${load.to}` },
        { term: 'Carrier', description: load.carrier },
        { term: 'Pieces', description: `${load.pieces} of ${load.expected}` },
      ]"
    />
    <Divider />
    <h2>Scans</h2>
    <Timeline :items="load.scans" />
    <NumberInput v-model="counted" label="Pieces on the dock" :min="0" :max="load.expected" />
    <Textarea v-model="note" label="Proof note" />
    <Card title="Proof of delivery" description="The signed page for this load.">
      <FileUpload label="Signed page" @files-change="() => undefined" />
    </Card>
    <ButtonGroup>
      <Button type="button" :disabled="load.status === 'Delivered'" @click="confirmOpen = true">Mark delivered</Button>
      <Button type="button" variant="secondary" @click="router.push('/waybill/loads')">Back to loads</Button>
    </ButtonGroup>
    <Modal :open="confirmOpen" heading="Mark this load delivered?" @update:open="confirmOpen = $event">
      <p>{{ load.number }} · {{ counted }} pieces.</p>
      <template #footer>
        <Button type="button" variant="secondary" @click="confirmOpen = false">Cancel</Button>
        <Button type="button" @click="markDelivered">Confirm</Button>
      </template>
    </Modal>
  </article>
  <p v-else class="wy-quiet">That load is not on the board.</p>
</template>
