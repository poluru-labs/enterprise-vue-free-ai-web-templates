<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  CodeSnippet,
  Icon,
  List,
  PinInput,
  Slider,
  Spinner,
  Switch,
  TimePicker,
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '@/constants/navigation'
import { desk } from '@/data/desk'

const saving = ref(false)
const span = ref(8)
const queues = 'Password\nHardware\nAccess\nSoftware'
const tree = [
  {
    id: 'desk',
    label: 'Queues',
    children: [
      { id: 'password', label: 'Password' },
      { id: 'hardware', label: 'Hardware' },
      { id: 'access', label: 'Access' },
      { id: 'software', label: 'Software' },
    ],
  },
]
const owners = [
  { id: 'password', label: 'Password', description: 'Suresh Poluru' },
  { id: 'hardware', label: 'Hardware', description: 'Uma Poluru' },
  { id: 'access', label: 'Access', description: 'Wasim Poluru' },
  { id: 'software', label: 'Software', description: 'Pavan Poluru' },
]

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Desk saved',
      description: `${SIGNED_IN_USER.name} · ${desk.hoursStart} to ${desk.hoursEnd}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="Queues and the hours the desk answers."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  >
    <template #actions>
      <Button size="sm" :loading="saving" @click="save">
        <Spinner v-if="saving" size="sm" label="Saving" />
        <span v-else>Save</span>
      </Button>
    </template>
  </PageHead>

  <form class="dk-form" @submit.prevent="save">
    <h2>
      <Icon name="settings" size="sm" />
      Hours
    </h2>
    <TimePicker v-model="desk.hoursStart" label="Opens" />
    <TimePicker v-model="desk.hoursEnd" label="Closes" />
    <Slider v-model="span" label="Same-day target, hours" :min="2" :max="12" :step="1" show-value />
    <Switch v-model="desk.pageUrgent" label="Page Pavan Poluru on an urgent ticket" />
    <Switch v-model="desk.afterHours" label="Hold new tickets until the desk opens" />
    <PinInput v-model="desk.pin" label="Desk PIN" :length="4" type="number" />
    <CodeSnippet :code="queues" language="text" />
  </form>

  <TreeView class="dk-tree" :nodes="tree" />
  <List class="dk-list" :items="owners" />
</template>
