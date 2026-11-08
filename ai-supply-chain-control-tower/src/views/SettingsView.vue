<script setup lang="ts">
import { ref } from 'vue'
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
  NumberInput,
  PinInput,
  ProgressBar,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Spinner,
  SplitButton,
  Switch,
  Tabs,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, PEOPLE } from '@/constants/navigation'
import { tower } from '@/data/tower'

const saving = ref(false)
const tab = ref('plan')
const weeks = ref(1)
const review = ref('2026-11-16')
const backup = ref('Heena Poluru')
const people = PEOPLE.map((name) => ({ value: name, label: name }))
const sites = tower.sites.map((site) => ({ value: site.id, label: site.name }))
const rules = [
  { id: 'late', title: 'Late', content: 'Past the due date, the order stays on the delay list.' },
  { id: 'draft', title: 'Draft', content: 'A draft stays off the tower counts.' },
]

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    const site = tower.sites.find((item) => item.id === tower.defaultSite)
    showToast({ title: 'Sheet saved', description: `${tower.name} plans from ${site?.name ?? 'the dock'}.`, variant: 'success' })
  }, 400)
}
</script>

<template>
  <PageHead title="Settings" lede="Planning calendar and the default site." :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]" />
  <Tabs v-model="tab" class="sw-tools" :items="[{ id: 'plan', label: 'Planning' }, { id: 'desk', label: 'Desk' }]" />
  <form class="sw-settings" @submit.prevent="save">
    <template v-if="tab === 'plan'">
      <Card title="Planning" description="The week on the sheet.">
        <DateRangePicker v-model:start="tower.planStart" v-model:end="tower.planEnd" label="Planning week" />
        <DatePicker v-model="review" label="Next review" />
        <TimePicker v-model="tower.cutoff" label="Cutoff" />
        <Select v-model="tower.defaultSite" label="Default site" :options="sites" />
      </Card>
      <NumberInput v-model="weeks" label="Weeks ahead" :min="1" :max="6" :step="1" />
      <Slider v-model="weeks" label="Weeks ahead" :min="1" :max="6" show-value />
      <CircularProgress :value="tower.fillRate" show-value label="Fill rate" />
      <ProgressBar label="Fill rate" :value="tower.fillRate" show-value />
    </template>
    <template v-else>
      <p class="sw-quiet"><Icon name="settings" size="sm" /> Desk</p>
      <Input v-model="tower.name" label="Sheet name" />
      <Textarea v-model="tower.note" label="Sheet note" />
      <Combobox v-model="backup" label="Backup planner" :options="people" />
      <RadioGroup v-model="tower.notify" label="Who is told" orientation="horizontal">
        <Radio value="planner" label="Planner" />
        <Radio value="site" label="Site lead" />
      </RadioGroup>
      <Checkbox v-model="tower.holdDrafts" label="Keep drafts off the tower" />
      <Switch v-model="tower.holdDrafts" label="Hold drafts" />
      <PinInput v-model="tower.pin" label="Sheet pin" :length="4" type="number" />
      <Divider />
      <Accordion :items="rules" />
      <List :items="tower.sites.map((site) => ({ id: site.id, label: site.name, description: site.lead }))" />
      <CodeSnippet code="SW-" language="text" />
    </template>
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">{{ saving ? 'Saving' : 'Save' }}</Button>
  </form>
</template>
