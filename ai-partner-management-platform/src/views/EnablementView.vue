<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  Divider,
  ProgressBar,
  Select,
  Stepper,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, ENABLEMENT_STEPS } from '@/constants/navigation'
import { desk, findPartner } from '@/data/directory'

const partnerId = ref('pt-harbor')

const options = desk.partners.map((partner) => ({ value: partner.id, label: partner.firm }))

const steps = ENABLEMENT_STEPS.map((step) => ({
  id: step.id,
  label: step.label,
  description: step.description,
}))

const partner = computed(() => findPartner(partnerId.value))

const progress = computed(() => {
  if (!partner.value) return 0
  return Math.round((partner.value.step / 3) * 100)
})

function advance() {
  const current = partner.value
  if (!current || current.step >= 3) return
  current.step += 1
  const step = steps[current.step]
  showToast({
    title: 'Step marked',
    description: step ? `${current.firm} is on ${step.label}.` : `${current.firm} moved ahead.`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    title="Enablement"
    lede="The checklist for a new partner."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Enablement' }]"
  />
  <div v-if="partner" class="ay-checklist">
    <Select v-model="partnerId" label="Partner" :options="options" />
    <p class="ay-quiet">{{ partner.lead }} · {{ partner.region }}</p>
    <Stepper :steps="steps" :active-index="partner.step" />
    <ProgressBar label="Along the checklist" :value="progress" show-value />
    <Button type="button" :disabled="partner.step >= 3" @click="advance">Mark this step done</Button>
    <Divider />
    <h2 class="ay-subhead">So far</h2>
    <Timeline :items="partner.activity" />
  </div>
</template>
