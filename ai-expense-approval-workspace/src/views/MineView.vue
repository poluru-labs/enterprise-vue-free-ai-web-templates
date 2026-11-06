<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  Autocomplete,
  Button,
  Checkbox,
  Combobox,
  DatePicker,
  FileUpload,
  Input,
  Modal,
  NumberInput,
  Radio,
  RadioGroup,
  Select,
  Status,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '@/constants/navigation'
import { desk, money, type Category, type ClaimStatus } from '@/data/claims'

const confirmOpen = ref(false)
const form = reactive({
  title: '',
  category: 'Meals' as Category,
  vendor: 'Harbor Table',
  amount: 40,
  submitted: '2026-11-06',
  notes: '',
  receiptOnFile: true,
  billable: 'no',
})

const mine = computed(() => desk.claims.filter((claim) => claim.owner === SIGNED_IN_USER.name))

const categoryOptions = [
  { value: 'Travel', label: 'Travel' },
  { value: 'Software', label: 'Software' },
  { value: 'Meals', label: 'Meals' },
]

const vendorOptions = computed(() => desk.vendors.map((vendor) => ({ value: vendor.name, label: vendor.name })))
const peopleOptions = [
  { value: 'Arjun Poluru', label: 'Arjun Poluru' },
  { value: 'Bina Poluru', label: 'Bina Poluru' },
  { value: 'Charan Poluru', label: 'Charan Poluru' },
  { value: 'Diya Poluru', label: 'Diya Poluru' },
  { value: 'Eshan Poluru', label: 'Eshan Poluru' },
  { value: 'Farah Poluru', label: 'Farah Poluru' },
  { value: 'Gopal Poluru', label: 'Gopal Poluru' },
  { value: 'Hina Poluru', label: 'Hina Poluru' },
]
const attendee = ref('Charan Poluru')

function tone(status: ClaimStatus): 'warning' | 'success' | 'neutral' {
  if (status === 'Waiting') return 'warning'
  if (status === 'Approved') return 'success'
  return 'neutral'
}

function save() {
  const title = form.title.trim() || 'New claim'
  desk.claims.unshift({
    id: `cl-${Date.now()}`,
    number: `CL-${1040 + desk.claims.length}`,
    title,
    owner: SIGNED_IN_USER.name,
    reviewer: 'Gopal Poluru',
    category: form.category,
    vendor: form.vendor,
    amount: Number(form.amount) || 0,
    status: 'Waiting',
    submitted: form.submitted,
    notes: form.notes || (form.receiptOnFile ? 'Receipt on file.' : 'Receipt to follow.'),
    receipt: form.receiptOnFile ? 'On file' : 'Missing',
    lines: [{ id: 'l1', label: title, amount: Number(form.amount) || 0 }],
  })
  form.title = ''
  form.notes = ''
  confirmOpen.value = false
  showToast({
    title: 'Claim submitted',
    description: `${title} · ${money(Number(form.amount) || 0)} · Gopal Poluru will review it.`,
    variant: 'success',
  })
}

function onFiles(detail: { files?: File[] }) {
  const count = detail?.files?.length ?? 0
  form.receiptOnFile = count > 0
  showToast({
    title: count ? 'Receipt attached' : 'No file selected',
    description: count ? 'The receipt will go with the claim.' : 'You can still submit without a file.',
    variant: count ? 'success' : 'info',
  })
}
</script>

<template>
  <PageHead
    title="Mine"
    lede="Claims Farah Poluru submitted."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Mine' }]"
  />

  <div class="cl-list">
    <article v-for="claim in mine" :key="claim.id" class="cl-claim cl-claim-static">
      <span>
        <strong>{{ claim.title }}</strong>
        <span class="cl-meta">{{ claim.vendor }} · {{ claim.reviewer }}</span>
      </span>
      <span class="cl-claim-end">
        <Status :label="claim.status" :tone="tone(claim.status)" />
        <span class="cl-amount">{{ money(claim.amount) }}</span>
      </span>
    </article>
  </div>

  <form class="cl-form" @submit.prevent="confirmOpen = true">
    <h2>New claim</h2>
    <Input v-model="form.title" label="What was it" placeholder="Team dinner" required />
    <Select v-model="form.category" label="Category" :options="categoryOptions" />
    <Combobox v-model="form.vendor" label="Vendor" :options="vendorOptions" placeholder="Where it was spent" />
    <Autocomplete v-model="attendee" label="With" :options="peopleOptions" placeholder="Who was there" />
    <NumberInput v-model="form.amount" label="Amount, USD" :min="1" :step="1" />
    <DatePicker v-model="form.submitted" label="Date" />
    <Textarea v-model="form.notes" label="Note" placeholder="Short reason" />
    <FileUpload label="Receipt" hint="PDF or image" accept=".pdf,.png,.jpg" @files-change="onFiles" />
    <Checkbox v-model="form.receiptOnFile" label="Receipt is on file" />
    <RadioGroup v-model="form.billable" label="Bill to a customer" orientation="horizontal">
      <Radio value="no" label="No" />
      <Radio value="yes" label="Yes" />
    </RadioGroup>
    <Button type="submit">Submit claim</Button>
  </form>

  <Modal :open="confirmOpen" heading="Submit this claim?" @update:open="confirmOpen = $event">
    <p class="cl-quiet">
      {{ form.title || 'New claim' }} · {{ money(Number(form.amount) || 0) }} · {{ form.vendor }}.
      Gopal Poluru reviews Farah Poluru's claims. Attendee: {{ attendee }}.
    </p>
    <template #footer>
      <Button variant="secondary" @click="confirmOpen = false">Cancel</Button>
      <Button @click="save">Submit</Button>
    </template>
  </Modal>
</template>
