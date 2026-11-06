<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
  CodeSnippet,
  Combobox,
  DatePicker,
  Icon,
  Input,
  Meter,
  NumberInput,
  PinInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Spinner,
  SplitButton,
  Switch,
  Textarea,
  TimePicker,
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, findPartner, type Region } from '@/data/directory'

const saving = ref(false)
const weeks = ref(4)
const notice = ref('desk')
const posted = ref(true)
const lead = ref('Asha Poluru')
const deskLabel = ref('Alliance desk')

const regions: Region[] = ['Midwest', 'South', 'Coast', 'West']
const regionOptions = regions.map((region) => ({ value: region, label: region }))
const leads = desk.partners.map((partner) => ({ value: partner.lead, label: partner.lead }))

const premier = computed(() => desk.partners.filter((partner) => partner.tier === 'Premier').length)
const share = computed(() => Math.round((premier.value / desk.partners.length) * 100))

const rules = computed(() => [
  { id: 'registered', title: 'Registered', content: 'A signed agreement and a named contact.' },
  { id: 'select', title: 'Select', content: 'Portal access and one open deal.' },
  { id: 'premier', title: 'Premier', content: `${desk.premierDeals} open deals and a named lead.` },
])

const tree = computed(() =>
  regions.map((region) => ({
    id: region,
    label: region,
    children: desk.partners
      .filter((partner) => partner.region === region)
      .map((partner) => ({ id: partner.id, label: partner.firm })),
  })),
)

function onTree(id: string) {
  const partner = findPartner(id)
  if (!partner) return
  showToast({ title: partner.firm, description: `${partner.lead} · ${partner.region}`, variant: 'info' })
}

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Desk saved',
      description: `${desk.defaultRegion} cuts off at ${desk.cutoff}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="Tier rules and the home region."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  />
  <form class="ay-form" @submit.prevent="save">
    <p class="ay-quiet"><Icon name="settings" size="sm" /> {{ deskLabel }}</p>
    <Select v-model="desk.defaultRegion" label="Home region" :options="regionOptions" />
    <TimePicker v-model="desk.cutoff" label="Cutoff" />
    <NumberInput v-model="desk.premierDeals" label="Open deals for Premier" :min="1" :max="8" />
    <Meter :value="premier" :max="desk.partners.length" label="Premier firms" show-value />
    <CircularProgress :value="share" show-value label="Premier share" />
    <Slider v-model="weeks" label="Review window, weeks" :min="1" :max="12" show-value />
    <DatePicker v-model="desk.reviewOn" label="Next review" />
    <Input v-model="deskLabel" label="Desk label" />
    <Textarea v-model="desk.note" label="Tier note" />
    <Combobox v-model="lead" label="After-hours lead" :options="leads" />
    <RadioGroup v-model="notice" label="Who sees tier changes" orientation="horizontal">
      <Radio value="desk" label="Desk only" />
      <Radio value="leads" label="Leads too" />
    </RadioGroup>
    <Checkbox v-model="posted" label="Post the cutoff on the directory" />
    <Switch v-model="desk.holdQuiet" label="Hold a firm with no open deals" />
    <PinInput v-model="desk.pin" label="Desk pin" :length="4" type="number" />
    <Accordion :items="rules" />
    <CodeSnippet :code="'Midwest\nSouth\nCoast\nWest'" language="text" />
    <TreeView :nodes="tree" @select="onTree" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
