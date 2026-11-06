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
import { BREADCRUMB_ROOT, SITES } from '@/constants/navigation'
import { book, money } from '@/data/ledger'

const saving = ref(false)
const weeks = ref(2)
const notice = ref('buyer')
const posted = ref(true)

const sites = SITES.map((site) => ({ value: site, label: site }))

const receivedShare = computed(() => {
  const received = book.orders.filter((order) => order.stage === 'Received').length
  if (book.orders.length === 0) return 0
  return Math.round((received / book.orders.length) * 100)
})

const rules = computed(() => [
  { id: 'draft', title: 'Draft', content: 'The buyer still owns the lines.' },
  { id: 'review', title: 'Review', content: `Over ${money(book.threshold)} a named approver must clear it.` },
  { id: 'received', title: 'Received', content: 'The dock count matches the lines.' },
])

const tree = computed(() =>
  (['Office', 'Facilities', 'Software'] as const).map((category) => ({
    id: category,
    label: category,
    children: book.suppliers
      .filter((supplier) => supplier.category === category)
      .map((supplier) => ({ id: supplier.id, label: supplier.name })),
  })),
)

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Desk saved',
      description: `${book.site} cuts off at ${book.cutoff}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="The spend threshold and the home site."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  />
  <Stat class="pw-stat" label="Threshold" :value="money(book.threshold)" hint="Named approver above this" />
  <form class="pw-settings" @submit.prevent="save">
    <p class="pw-quiet"><Icon name="settings" size="sm" /> Buyer desk</p>
    <Select v-model="book.site" label="Home site" :options="sites" />
    <TimePicker v-model="book.cutoff" label="Cutoff" />
    <NumberInput v-model="book.threshold" label="Spend threshold" :min="100" :max="20000" :step="100" />
    <CircularProgress :value="receivedShare" show-value label="Received share" />
    <Slider v-model="weeks" label="Review window, weeks" :min="1" :max="8" show-value />
    <DatePicker v-model="book.reviewOn" label="Next review" />
    <Textarea v-model="book.note" label="Threshold note" />
    <RadioGroup v-model="notice" label="Who is told" orientation="horizontal">
      <Radio value="buyer" label="Buyer only" />
      <Radio value="approver" label="Approver too" />
    </RadioGroup>
    <Checkbox v-model="posted" label="Post the threshold on the sheet" />
    <Switch v-model="book.holdDraft" label="Hold a draft with no lines" />
    <PinInput v-model="book.pin" label="Desk pin" :length="4" type="number" />
    <Accordion :items="rules" />
    <List :items="SITES.map((site) => ({ id: site, label: site, description: 'Office site' }))" />
    <CodeSnippet :code="'Austin\nDallas\nChicago'" language="text" />
    <TreeView :nodes="tree" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
