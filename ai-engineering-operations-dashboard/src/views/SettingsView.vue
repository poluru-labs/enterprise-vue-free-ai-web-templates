<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Checkbox,
  CodeSnippet,
  DatePicker,
  FileUpload,
  Icon,
  Input,
  PinInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Spinner,
  Switch,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '@/constants/navigation'
import { desk } from '@/data/desk'

const saving = ref(false)
const digestOptions = [
  { value: 'off', label: 'Off' },
  { value: 'weekday', label: 'Weekdays' },
  { value: 'weekly', label: 'Weekly' },
]

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Desk saved',
      description: `${desk.settings.deskName} · ${SIGNED_IN_USER.name}`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead title="Settings" :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]">
    <template #actions>
      <Button size="sm" :loading="saving" @click="save">
        <Spinner v-if="saving" size="sm" label="Saving" />
        <span v-else>Save</span>
      </Button>
    </template>
  </PageHead>

  <div class="nl-split">
    <form class="nl-panel nl-form" @submit.prevent="save">
      <h2>
        <Icon name="settings" size="sm" />
        Profile
      </h2>
      <Input v-model="desk.settings.deskName" label="Desk name" />
      <Input :model-value="SIGNED_IN_USER.email" label="Mail" disabled />
      <Select v-model="desk.settings.digest" label="Digest" :options="digestOptions" />
      <TimePicker v-model="desk.settings.digestTime" label="Send time" />
      <DatePicker v-model="desk.settings.reviewDate" label="Next review" />
      <RadioGroup v-model="desk.settings.cadence" label="Review cadence" orientation="horizontal">
        <Radio value="daily" label="Daily" />
        <Radio value="weekly" label="Weekly" />
      </RadioGroup>
      <Slider v-model="desk.settings.holdMinutes" label="Hold window, minutes" :min="5" :max="60" :step="5" show-value />
      <Switch v-model="desk.settings.pager" label="Page Anika Poluru for open incidents" />
      <Switch v-model="desk.settings.mail" label="Mail the weekday digest to Sana Poluru" />
      <Checkbox v-model="desk.settings.quiet" label="Keep the ribbon quiet outside weekday hours" />
      <PinInput v-model="desk.settings.pin" label="Desk PIN" :length="4" type="number" />
    </form>
    <aside class="nl-panel">
      <h2>Identity</h2>
      <p class="nl-identity">{{ SIGNED_IN_USER.name }}</p>
      <p class="nl-muted">{{ SIGNED_IN_USER.role }}</p>
      <CodeSnippet :code="desk.settings.slug" language="text" />
      <FileUpload class="nl-upload" label="Desk mark" hint="SVG or PNG" accept=".svg,.png" />
    </aside>
  </div>
</template>
