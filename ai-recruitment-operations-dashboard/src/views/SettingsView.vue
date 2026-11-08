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
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, LOCATIONS, STAGES } from '@/constants/navigation'
import { desk } from '@/data/desk'

const saving = ref(false)
const weeks = ref(2)
const notice = ref('lead')
const posted = ref(true)

const locations = LOCATIONS.map((location) => ({ value: location, label: location }))

const offerShare = computed(() => {
  const offered = desk.candidates.filter((candidate) => candidate.stage === 'Offer').length
  if (desk.candidates.length === 0) return 0
  return Math.round((offered / desk.candidates.length) * 100)
})

const rules = computed(() =>
  STAGES.map((stage) => ({ id: stage.id, title: stage.label, content: stage.description })),
)

const tree = computed(() =>
  LOCATIONS.map((location) => ({
    id: location,
    label: location,
    children: desk.roles
      .filter((role) => role.location === location)
      .map((role) => ({ id: role.id, label: role.title })),
  })),
)

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Desk saved',
      description: `Home office is ${desk.office}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="Default stages and the home locations."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  />
  <Stat class="hw-stat" label="Open roles" :value="String(desk.roles.filter((role) => role.status === 'Open').length)" hint="On the desk" />
  <form class="hw-settings" @submit.prevent="save">
    <p class="hw-quiet"><Icon name="settings" size="sm" /> Stages</p>
    <Input v-model="desk.note" label="Stage note" />
    <Select v-model="desk.office" label="Home office" :options="locations" />
    <TimePicker v-model="desk.cutoff" label="Interview cutoff" />
    <DatePicker v-model="desk.reviewOn" label="Next review" />
    <NumberInput v-model="weeks" label="Screen window, weeks" :min="1" :max="8" :step="1" />
    <Slider v-model="weeks" label="Review window, weeks" :min="1" :max="8" show-value />
    <CircularProgress :value="offerShare" show-value label="At offer" />
    <Meter :value="desk.roles.filter((role) => role.status === 'Open').length" :max="desk.roles.length" label="Open roles" show-value />
    <Textarea v-model="desk.note" label="Location note" />
    <RadioGroup v-model="notice" label="Who is told" orientation="horizontal">
      <Radio value="lead" label="Recruiting lead" />
      <Radio value="hiring" label="Hiring manager too" />
    </RadioGroup>
    <Checkbox v-model="posted" label="Show closed roles in All" />
    <Switch v-model="desk.holdClosed" label="Keep a closed role on the list" />
    <PinInput v-model="desk.pin" label="Desk pin" :length="4" type="number" />
    <Accordion :items="rules" />
    <List :items="LOCATIONS.map((location) => ({ id: location, label: location, description: 'Office' }))" />
    <CodeSnippet :code="STAGES.map((stage) => stage.label).join('\n')" language="text" />
    <TreeView :nodes="tree" />
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
