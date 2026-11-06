<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  CodeSnippet,
  Icon,
  PinInput,
  Select,
  Slider,
  Spinner,
  Switch,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '@/constants/navigation'
import { desk, money } from '@/data/claims'

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
      title: 'Settings saved',
      description: `${SIGNED_IN_USER.name} · approval line ${money(desk.threshold)}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="Approval line, currency, and the weekday note."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  >
    <template #actions>
      <Button size="sm" :loading="saving" @click="save">
        <Spinner v-if="saving" size="sm" label="Saving" />
        <span v-else>Save</span>
      </Button>
    </template>
  </PageHead>

  <form class="cl-form" @submit.prevent="save">
    <h2>
      <Icon name="settings" size="sm" />
      Desk
    </h2>
    <Slider v-model="desk.threshold" label="Approval line, USD" :min="50" :max="1000" :step="10" show-value />
    <Select v-model="desk.digest" label="Digest" :options="digestOptions" />
    <TimePicker v-model="desk.digestTime" label="Send time" />
    <Switch v-model="desk.pager" label="Page Farah Poluru when a claim is over the line" />
    <Switch v-model="desk.quietHours" label="Hold the digest outside weekday hours" />
    <PinInput v-model="desk.pin" label="Desk PIN" :length="4" type="number" />
    <CodeSnippet :code="desk.currency" language="text" />
  </form>
</template>
