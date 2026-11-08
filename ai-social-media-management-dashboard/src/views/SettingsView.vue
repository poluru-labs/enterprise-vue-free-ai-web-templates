<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Accordion,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  CodeSnippet,
  Combobox,
  DatePicker,
  DateRangePicker,
  Divider,
  Icon,
  Input,
  List,
  Meter,
  NumberInput,
  PinInput,
  ProgressBar,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Slider,
  Spinner,
  SplitButton,
  Switch,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, CHANNELS, PEOPLE } from '@/constants/navigation'
import { desk } from '@/data/desk'

const saving = ref(false)
const weeks = ref(1)
const review = ref('2026-11-16')
const rangeStart = ref('2026-11-09')
const rangeEnd = ref('2026-11-15')
const backup = ref('Tanvi Poluru')
const people = PEOPLE.map((name) => ({ value: name, label: name }))
const channels = CHANNELS.map((channel) => ({ value: channel, label: channel }))
const scheduled = computed(() => desk.posts.filter((post) => post.state === 'Scheduled').length)
const share = computed(() => Math.round((scheduled.value / desk.posts.length) * 100))
const rules = [
  { id: 'short', title: 'Short captions', content: 'One or two lines.' },
  { id: 'hand', title: 'Written by hand', content: 'No rewrite action on this desk.' },
]

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({ title: 'Desk saved', description: `${desk.brand} uses ${desk.defaultChannel}.`, variant: 'success' })
  }, 400)
}
</script>

<template>
  <PageHead title="Settings" lede="Brand name and the default channel." :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]" />
  <form class="po-settings" @submit.prevent="save">
    <Card title="Brand" description="What the desk is called.">
      <Input v-model="desk.brand" label="Brand name" />
      <Select v-model="desk.defaultChannel" label="Default channel" :options="channels" />
      <TimePicker v-model="desk.cutoff" label="Last post time" />
    </Card>
    <p class="po-quiet"><Icon name="settings" size="sm" /> Desk</p>
    <Textarea v-model="desk.note" label="Desk note" />
    <DatePicker v-model="review" label="Next review" />
    <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" label="This week" />
    <Combobox v-model="backup" label="Backup publisher" :options="people" />
    <NumberInput v-model="weeks" label="Weeks on the board" :min="1" :max="4" :step="1" />
    <Slider v-model="weeks" label="Weeks on the board" :min="1" :max="4" show-value />
    <CircularProgress :value="share" show-value label="Scheduled share" />
    <Meter :value="scheduled" :max="desk.posts.length" label="Scheduled posts" show-value />
    <ProgressBar label="Scheduled share" :value="share" show-value />
    <RadioGroup v-model="desk.notify" label="Who is told" orientation="horizontal">
      <Radio value="publisher" label="Publisher" />
      <Radio value="channel" label="Channel owners" />
    </RadioGroup>
    <Checkbox v-model="desk.holdDrafts" label="Keep drafts off the week board" />
    <Switch v-model="desk.holdDrafts" label="Hold drafts" />
    <PinInput v-model="desk.pin" label="Desk pin" :length="4" type="number" />
    <Rating :model-value="4" label="Caption check" read-only />
    <Divider />
    <Accordion :items="rules" />
    <List :items="CHANNELS.map((channel) => ({ id: channel, label: channel, description: 'Channel' }))" />
    <CodeSnippet :code="CHANNELS.join('\n')" language="text" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">{{ saving ? 'Saving' : 'Save' }}</Button>
  </form>
</template>
