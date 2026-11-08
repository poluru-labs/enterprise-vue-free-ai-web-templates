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
  Divider,
  Icon,
  Input,
  List,
  Meter,
  Modal,
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
  Stat,
  Switch,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, PEOPLE, SEVERITIES } from '@/constants/navigation'
import { watch as desk } from '@/data/watch'

const saving = ref(false)
const handoffOpen = ref(false)
const weeks = ref(1)
const nextOnCall = ref('Krish Poluru')
const people = PEOPLE.map((name) => ({ value: name, label: name }))

const openCount = computed(() => desk.incidents.filter((incident) => incident.state === 'Open').length)
const highCount = computed(() => desk.incidents.filter((incident) => incident.state === 'Open' && incident.severity === 'High').length)
const highShare = computed(() => (openCount.value === 0 ? 0 : Math.round((highCount.value / openCount.value) * 100)))
const labels = computed(() => SEVERITIES.map((level) => ({ id: level, title: level, content: `${level} stays on the queue label.` })))

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Watch saved',
      description: `${desk.onCall} is on call.`,
      variant: 'success',
    })
  }, 400)
}

function handoff() {
  desk.onCall = nextOnCall.value
  handoffOpen.value = false
  showToast({ title: 'Handed off', description: `${desk.onCall} is on call.`, variant: 'success' })
}
</script>

<template>
  <PageHead title="Settings" lede="On-call rotation and severity labels." :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]" />
  <Stat class="wl-stat" label="Open" :value="String(openCount)" hint="On the queue" />
  <form class="wl-settings" @submit.prevent="save">
    <Card title="On call" description="Who holds the watch.">
      <Select v-model="desk.onCall" label="On call" :options="people" />
      <TimePicker v-model="desk.shiftStart" label="Shift start" />
      <DatePicker v-model="desk.handoff" label="Next handoff" />
    </Card>
    <p class="wl-quiet"><Icon name="settings" size="sm" /> Labels</p>
    <Input v-model="desk.note" label="Label note" />
    <Textarea v-model="desk.note" label="Rotation note" />
    <NumberInput v-model="weeks" label="Rotation, weeks" :min="1" :max="4" :step="1" />
    <Slider v-model="weeks" label="Rotation, weeks" :min="1" :max="4" show-value />
    <CircularProgress :value="highShare" show-value label="Open at High" />
    <Meter :value="openCount" :max="desk.incidents.length" label="Open incidents" show-value />
    <ProgressBar label="Open share" :value="highShare" show-value />
    <RadioGroup v-model="desk.notify" label="Who is told" orientation="horizontal">
      <Radio value="lead" label="Watch lead" />
      <Radio value="oncall" label="On call too" />
    </RadioGroup>
    <Checkbox v-model="desk.showClosed" label="Keep closed incidents in All" />
    <Switch v-model="desk.showClosed" label="Show closed with All" />
    <PinInput v-model="desk.pin" label="Watch pin" :length="4" type="number" />
    <Rating :model-value="4" label="Handoff checklist" read-only />
    <Divider />
    <Accordion :items="labels" />
    <List :items="SEVERITIES.map((level) => ({ id: level, label: level, description: 'Queue label' }))" />
    <CodeSnippet :code="SEVERITIES.join('\n')" language="text" />
    <Button type="button" variant="secondary" @click="handoffOpen = true">Hand off</Button>
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
  <Modal v-model:open="handoffOpen" heading="Hand off the watch">
    <div class="wl-modal">
      <Combobox v-model="nextOnCall" label="Next on call" :options="people" />
      <DatePicker v-model="desk.handoff" label="Handoff day" />
    </div>
    <template #footer>
      <Button type="button" @click="handoff">Hand off</Button>
    </template>
  </Modal>
</template>
