<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  Checkbox,
  CircularProgress,
  CodeSnippet,
  Combobox,
  DatePicker,
  Icon,
  Input,
  PinInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Spinner,
  SplitButton,
  Switch,
  TimePicker,
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { yard } from '@/data/yard'

const saving = ref(false)
const dwell = ref(4)
const notice = ref('dock')
const countOn = ref('2026-11-07')
const lead = ref('Meera Poluru')
const doorNote = ref('North doors first')
const posted = ref(true)

const hubOptions = yard.hubs.map((hub) => ({ value: hub.city, label: hub.city }))
const leads = ['Meera Poluru', 'Padma Poluru', 'Nikhil Poluru'].map((name) => ({ value: name, label: name }))

const fill = computed(() => {
  const hub = yard.hubs.find((item) => item.city === yard.defaultHub) ?? yard.hubs[0]
  if (!hub || hub.capacity === 0) return 0
  return Math.round((hub.used / hub.capacity) * 100)
})

const tree = [
  {
    id: 'lanes',
    label: 'Lanes',
    children: [
      { id: 'aus-dal', label: 'Austin → Dallas' },
      { id: 'dal-chi', label: 'Dallas → Chicago' },
      { id: 'chi-aus', label: 'Chicago → Austin' },
    ],
  },
]

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Board saved',
      description: `${yard.defaultHub} cuts off at ${yard.cutoff}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="The home hub and the afternoon cutoff."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  />
  <form class="wy-form" @submit.prevent="save">
    <p class="wy-quiet"><Icon name="settings" size="sm" /> Dock desk</p>
    <Select v-model="yard.defaultHub" label="Default hub" :options="hubOptions" />
    <TimePicker v-model="yard.cutoff" label="Cutoff" />
    <CircularProgress :value="fill" show-value label="Hub fill" />
    <Slider v-model="dwell" label="Dwell target, hours" :min="1" :max="12" show-value />
    <DatePicker v-model="countOn" label="Next count" />
    <Input v-model="doorNote" label="Door note" />
    <Combobox v-model="lead" label="After-hours lead" :options="leads" />
    <RadioGroup v-model="notice" label="Call the dock" orientation="horizontal">
      <Radio value="dock" label="Dock only" />
      <Radio value="lane" label="Lane leads too" />
    </RadioGroup>
    <Checkbox v-model="posted" label="Post the cutoff on the board" />
    <Switch v-model="yard.holdShort" label="Hold a load when the count is short" />
    <PinInput v-model="yard.pin" label="Gate pin" :length="4" type="number" />
    <CodeSnippet :code="'Austin\nDallas\nChicago'" language="text" />
    <TreeView :nodes="tree" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
