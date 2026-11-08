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
  Rating,
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
import { AREAS, BREADCRUMB_ROOT } from '@/constants/navigation'
import { board } from '@/data/board'

const saving = ref(false)
const weeks = ref(2)
const notice = ref('owner')
const posted = ref(true)

const areas = AREAS.map((area) => ({ value: area, label: area }))

const lockedShare = computed(() => {
  const locked = board.specs.filter((spec) => spec.status === 'Locked' || spec.status === 'Shipped').length
  if (board.specs.length === 0) return 0
  return Math.round((locked / board.specs.length) * 100)
})

const rules = computed(() => [
  { id: 'prefix', title: 'Prefix', content: `New specs use ${board.prefix}- and the next open number.` },
  { id: 'areas', title: 'Areas', content: 'A spec belongs to Notifications, Audit, or Access.' },
  { id: 'horizon', title: 'Horizon', content: 'Now, Next, and Later are the only columns on the roadmap.' },
])

const tree = computed(() =>
  AREAS.map((area) => ({
    id: area,
    label: area,
    children: board.specs
      .filter((spec) => spec.area === area)
      .map((spec) => ({ id: spec.id, label: spec.number })),
  })),
)

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Board saved',
      description: `Specs use the ${board.prefix} prefix.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="Product areas and how specs are named."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  />
  <Stat class="sb-stat" label="Product" :value="board.product" hint="Workplace desk" />
  <form class="sb-settings" @submit.prevent="save">
    <p class="sb-quiet"><Icon name="settings" size="sm" /> Naming</p>
    <Input v-model="board.product" label="Product name" />
    <Input v-model="board.prefix" label="Spec prefix" />
    <Select v-model="board.area" label="Default area" :options="areas" />
    <TimePicker v-model="board.cutoff" label="Review cutoff" />
    <NumberInput v-model="weeks" label="Horizon length, weeks" :min="1" :max="12" :step="1" />
    <CircularProgress :value="lockedShare" show-value label="Scope locked" />
    <Slider v-model="weeks" label="Review window, weeks" :min="1" :max="8" show-value />
    <DatePicker v-model="board.reviewOn" label="Next review" />
    <Textarea v-model="board.note" label="Naming note" />
    <RadioGroup v-model="notice" label="Who is told" orientation="horizontal">
      <Radio value="owner" label="Owner only" />
      <Radio value="lead" label="Product lead too" />
    </RadioGroup>
    <Checkbox v-model="posted" label="Show the prefix on the roadmap" />
    <Switch v-model="board.holdDraft" label="Hold a draft with no scope" />
    <PinInput v-model="board.pin" label="Board pin" :length="4" type="number" />
    <Rating :model-value="4" label="Naming clarity" read-only />
    <Accordion :items="rules" />
    <List :items="AREAS.map((area) => ({ id: area, label: area, description: 'Product area' }))" />
    <CodeSnippet :code="AREAS.join('\n')" language="text" />
    <TreeView :nodes="tree" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
