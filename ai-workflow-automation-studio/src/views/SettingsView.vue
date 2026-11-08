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
  Icon,
  Input,
  List,
  NumberInput,
  PinInput,
  ProgressBar,
  Radio,
  RadioGroup,
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
import { studio } from '@/data/studio'

const saving = ref(false)
const tab = ref('naming')
const people = PEOPLE.map((name) => ({ value: name, label: name }))
const rules = [
  { id: 'archive', title: 'Archive', content: 'Finished runs leave the list after the archive week.' },
  { id: 'prefix', title: 'Prefix', content: 'New runs use the prefix on the name.' },
]

const finishedShare = computed(() => {
  if (studio.runs.length === 0) return 0
  const finished = studio.runs.filter((run) => run.state === 'Finished').length
  return Math.round((finished / studio.runs.length) * 100)
})

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Library saved',
      description: `${studio.name} files runs as ${studio.prefix}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="Process naming and the archive rule."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  />
  <Tabs v-model="tab" class="fw-gap" :items="[{ id: 'naming', label: 'Naming' }, { id: 'archive', label: 'Archive' }]" />
  <form class="fw-settings" @submit.prevent="save">
    <template v-if="tab === 'naming'">
      <Card title="Naming" description="How a new run is labeled.">
        <p class="fw-quiet"><Icon name="settings" size="sm" /> Library</p>
        <Input v-model="studio.name" label="Library name" />
        <Input v-model="studio.prefix" label="Run prefix" />
        <Textarea v-model="studio.note" label="Library note" />
        <CodeSnippet :code="studio.prefix" language="text" />
      </Card>
      <Combobox v-model="studio.backup" label="Backup owner" :options="people" />
      <RadioGroup v-model="studio.notify" label="Who is told" orientation="horizontal">
        <Radio value="owner" label="Owner" />
        <Radio value="requester" label="Requester" />
      </RadioGroup>
      <TimePicker v-model="studio.cutoff" label="Cutoff" />
    </template>
    <template v-else>
      <Card title="Archive" description="When a finished run leaves the list.">
        <DatePicker v-model="studio.review" label="Next review" />
        <NumberInput v-model="studio.archiveWeeks" label="Archive after" :min="1" :max="16" :step="1" />
        <Slider v-model="studio.archiveWeeks" label="Archive after" :min="1" :max="16" show-value />
        <Checkbox v-model="studio.archiveFinished" label="Archive finished runs" />
        <Switch v-model="studio.holdDrafts" label="Hold unfinished runs" />
        <PinInput v-model="studio.pin" label="Library pin" :length="4" type="number" />
      </Card>
      <CircularProgress :value="finishedShare" show-value label="Finished" />
      <ProgressBar label="Finished" :value="finishedShare" show-value />
      <Accordion :items="rules" />
      <List :items="studio.processes.map((process) => ({ id: process.id, label: process.name, description: process.owner }))" />
    </template>
    <SplitButton :label="saving ? 'Saving' : 'Save'" :disabled="saving" @click="save" @select="save">
      <Spinner v-if="saving" size="sm" label="Saving" />
    </SplitButton>
    <Button type="submit" :disabled="saving">{{ saving ? 'Saving' : 'Save' }}</Button>
  </form>
</template>
