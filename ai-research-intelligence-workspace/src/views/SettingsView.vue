<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  CodeSnippet,
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
  Stat,
  Switch,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, KINDS } from '@/constants/navigation'
import { shelf } from '@/data/shelf'

const saving = ref(false)
const weeks = ref(4)
const kinds = KINDS.map((kind) => ({ value: kind, label: kind }))

const openCount = computed(() => shelf.studies.filter((study) => study.status === 'Open').length)

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Lab saved',
      description: `Fiscal year is ${shelf.fiscalYear}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead title="Settings" lede="Lab name and fiscal year." :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]" />
  <Stat class="sh-stat" label="Open studies" :value="String(openCount)" hint="On the shelf" />
  <form class="sh-settings" @submit.prevent="save">
    <Card title="Lab" description="Name on the shelf.">
      <Input v-model="shelf.labName" label="Lab name" />
      <NumberInput v-model="shelf.fiscalYear" label="Fiscal year" :min="2020" :max="2035" :step="1" />
    </Card>
    <p class="sh-quiet"><Icon name="settings" size="sm" /> Shelf</p>
    <Textarea v-model="shelf.note" label="Shelf note" />
    <Select v-model="shelf.defaultKind" label="Default kind" :options="kinds" />
    <TimePicker v-model="shelf.boardTime" label="Board time" />
    <DatePicker v-model="shelf.boardDate" label="Next board" />
    <Slider v-model="weeks" label="Review window, weeks" :min="1" :max="8" show-value />
    <CircularProgress :value="85" show-value label="Year elapsed" />
    <Meter :value="openCount" :max="shelf.studies.length" label="Open studies" show-value />
    <RadioGroup v-model="shelf.notify" label="Who is told" orientation="horizontal">
      <Radio value="lead" label="Lab lead" />
      <Radio value="keepers" label="Room keepers too" />
    </RadioGroup>
    <Checkbox v-model="shelf.holdPaused" label="Keep paused studies on the list" />
    <Switch v-model="shelf.holdPaused" label="Show paused studies" />
    <PinInput v-model="shelf.pin" label="Lab pin" :length="4" type="number" />
    <CodeSnippet :code="shelf.labName" language="text" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
