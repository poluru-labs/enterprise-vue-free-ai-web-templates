<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
  CodeSnippet,
  DatePicker,
  Icon,
  Input,
  List,
  NumberInput,
  PinInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Spinner,
  SplitButton,
  Stat,
  Switch,
  Textarea,
  TimePicker,
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, CITIES } from '@/constants/navigation'
import { book } from '@/data/portfolio'

const saving = ref(false)
const weeks = ref(2)
const notice = ref('manager')
const posted = ref(true)

const cities = CITIES.map((city) => ({ value: city, label: city }))

const occupiedShare = computed(() => {
  const leased = book.units.filter((unit) => unit.status === 'Leased').length
  if (book.units.length === 0) return 0
  return Math.round((leased / book.units.length) * 100)
})

const rules = computed(() => [
  { id: 'rent', title: 'Rent', content: 'Collected on the first for leased units.' },
  { id: 'vacant', title: 'Vacant', content: 'A vacant unit has no lease and no tenant.' },
  { id: 'fiscal', title: 'Fiscal start', content: `The year opens on ${book.fiscalStart}.` },
])

const tree = computed(() =>
  CITIES.map((city) => ({
    id: city,
    label: city,
    children: book.properties
      .filter((property) => property.city === city)
      .map((property) => ({ id: property.id, label: property.name })),
  })),
)

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Portfolio saved',
      description: `Fiscal year starts ${book.fiscalStart}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="The portfolio name and the fiscal start."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  />
  <Stat class="lw-stat" label="Portfolio" :value="book.name" hint="Austin and Denver" />
  <form class="lw-settings" @submit.prevent="save">
    <p class="lw-quiet"><Icon name="settings" size="sm" /> Books</p>
    <Input v-model="book.name" label="Portfolio name" />
    <DatePicker v-model="book.fiscalStart" label="Fiscal start" />
    <Select v-model="book.city" label="Home city" :options="cities" />
    <TimePicker v-model="book.cutoff" label="Office cutoff" />
    <NumberInput v-model="weeks" label="Notice window, weeks" :min="1" :max="12" :step="1" />
    <CircularProgress :value="occupiedShare" show-value label="Occupied" />
    <Slider v-model="weeks" label="Review window, weeks" :min="1" :max="8" show-value />
    <Textarea v-model="book.note" label="Rent note" />
    <RadioGroup v-model="notice" label="Who is told" orientation="horizontal">
      <Radio value="manager" label="Manager only" />
      <Radio value="lead" label="Portfolio lead too" />
    </RadioGroup>
    <Checkbox v-model="posted" label="Show occupancy on the sheet" />
    <Switch v-model="book.holdVacant" label="Keep a vacant unit on the sheet" />
    <PinInput v-model="book.pin" label="Office pin" :length="4" type="number" />
    <Accordion :items="rules" />
    <List :items="CITIES.map((city) => ({ id: city, label: city, description: 'Portfolio city' }))" />
    <CodeSnippet :code="CITIES.join('\n')" language="text" />
    <TreeView :nodes="tree" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
