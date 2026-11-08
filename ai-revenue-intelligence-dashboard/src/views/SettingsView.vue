<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Card,
  Checkbox,
  CodeSnippet,
  DatePicker,
  Icon,
  Input,
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
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, CURRENCIES } from '@/constants/navigation'
import { book } from '@/data/book'

const saving = ref(false)
const weeks = ref(2)
const currencies = CURRENCIES.map((code) => ({ value: code, label: code }))

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Books saved',
      description: `Currency is ${book.currency}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead title="Settings" lede="Fiscal calendar and currency." :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]" />
  <Stat class="ll-team" label="Reps" :value="String(book.reps.length)" hint="On the sheet" />
  <form class="ll-settings" @submit.prevent="save">
    <Card title="Fiscal calendar" description="Year open and the close.">
      <Input v-model="book.deskName" label="Books name" />
      <NumberInput v-model="weeks" label="Close window, weeks" :min="1" :max="8" :step="1" />
    </Card>
    <p class="ll-quiet"><Icon name="settings" size="sm" /> Close</p>
    <Select v-model="book.currency" label="Currency" :options="currencies" />
    <DatePicker v-model="book.fiscalStart" label="Fiscal start" />
    <DatePicker v-model="book.closeDay" label="Fiscal close" />
    <TimePicker v-model="book.closeTime" label="Close time" />
    <Slider v-model="weeks" label="Close window, weeks" :min="1" :max="8" show-value />
    <Textarea v-model="book.note" label="Books note" />
    <RadioGroup v-model="book.notify" label="Who is told" orientation="horizontal">
      <Radio value="controller" label="Controller" />
      <Radio value="reps" label="Reps too" />
    </RadioGroup>
    <Checkbox v-model="book.lockPaid" label="Lock a paid invoice" />
    <Switch v-model="book.lockPaid" label="Keep paid invoices locked" />
    <PinInput v-model="book.pin" label="Books pin" :length="4" type="number" />
    <Rating :model-value="4" label="Close checklist" read-only />
    <CodeSnippet :code="book.currency" language="text" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
