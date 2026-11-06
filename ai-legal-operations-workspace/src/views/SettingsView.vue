<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  CircularProgress,
  CodeSnippet,
  Combobox,
  Icon,
  Meter,
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
import { ledger } from '@/data/ledger'

const saving = ref(false)
const copies = ref(2)
const owner = ref('Geeta Poluru')
const notice = ref('3 days')

const noticeOptions = [
  { value: 'Same day', label: 'Same day' },
  { value: '3 days', label: '3 days' },
  { value: '1 week', label: '1 week' },
]

const owners = ['Geeta Poluru', 'Jyoti Poluru', 'Mukund Poluru'].map((name) => ({
  value: name,
  label: name,
}))

const tree = [
  {
    id: 'files',
    label: 'Files',
    children: ledger.matters.map((matter) => ({ id: matter.id, label: matter.number })),
  },
]

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Ledger saved',
      description: `Files stay for ${ledger.retainYears} years.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="How long a file stays, and when the desk writes."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  >
    <template #actions>
      <Button type="button" :disabled="saving" @click="save">
        <Spinner v-if="saving" size="sm" label="Saving" />
        <template v-else>Save</template>
      </Button>
    </template>
  </PageHead>
  <form class="bw-form" @submit.prevent="save">
    <p class="bw-quiet"><Icon name="settings" size="sm" /> Retention</p>
    <Slider v-model="ledger.retainYears" label="Keep files, years" :min="3" :max="12" show-value />
    <Meter :value="ledger.retainYears" :max="12" label="Years on the shelf" show-value />
    <CircularProgress :value="ledger.retainYears * 8" show-value label="Shelf" />
    <NumberInput v-model="copies" label="Copies to keep" :min="1" :max="5" />
    <Select v-model="notice" label="Write ahead" :options="noticeOptions" />
    <Combobox v-model="owner" label="Fallback owner" :options="owners" />
    <Switch v-model="ledger.mailReminders" label="Mail a reminder before a due date" />
    <Switch v-model="ledger.quietHours" label="Hold mail after 18:00" />
    <PinInput v-model="ledger.pin" label="Cabinet pin" :length="4" type="number" />
    <CodeSnippet :code="'Vendor\nEmployment\nLease'" language="text" />
    <TreeView :nodes="tree" />
    <Button type="submit" :disabled="saving">Save</Button>
  </form>
</template>
