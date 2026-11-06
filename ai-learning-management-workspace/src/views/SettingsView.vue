<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  CodeSnippet,
  Combobox,
  Icon,
  NumberInput,
  PinInput,
  Select,
  Slider,
  Spinner,
  Switch,
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { school } from '@/data/school'

const saving = ref(false)
const seats = ref(12)
const owner = ref('Aditi Poluru')

const reminderOptions = [
  { value: 'Same morning', label: 'Same morning' },
  { value: '1 day before', label: '1 day before' },
  { value: '3 days before', label: '3 days before' },
]

const owners = ['Aditi Poluru', 'Bharat Poluru', 'Chitra Poluru', 'Esha Poluru'].map((name) => ({
  value: name,
  label: name,
}))

const tree = [
  {
    id: 'shelf',
    label: 'Shelf',
    children: school.courses.map((course) => ({ id: course.id, label: course.title })),
  },
]

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Office saved',
      description: `Reminder is ${school.reminder}. Pass mark is ${school.passMark}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="Reminder and the completion rule."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  >
    <template #actions>
      <Button type="button" :disabled="saving" @click="save">
        <Spinner v-if="saving" size="sm" label="Saving" />
        <template v-else>Save</template>
      </Button>
    </template>
  </PageHead>
  <form class="cy-form" @submit.prevent="save">
    <p class="cy-owner"><Icon name="settings" size="sm" /> Registrar desk</p>
    <Select v-model="school.reminder" label="Default reminder" :options="reminderOptions" />
    <Slider v-model="school.passMark" label="Pass mark" :min="50" :max="100" show-value />
    <NumberInput v-model="seats" label="Default seats" :min="1" :max="30" />
    <Combobox v-model="owner" label="Fallback owner" :options="owners" />
    <Switch v-model="school.quiet" label="Hold reminders after 18:00" />
    <PinInput v-model="school.pin" label="Desk pin" :length="4" type="number" />
    <CodeSnippet :code="'Onboarding\nSafety\nWriting for clients'" language="text" />
    <TreeView :nodes="tree" />
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
