<script setup>
import { reactive, watch } from 'vue';
import {
  Button,
  DatePicker,
  Input,
  Modal,
  NumberInput,
  Select,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { EXPENSE_CATEGORIES } from '../../constants/navigation.js';
import { useFinanceStore } from '../../stores/finance.js';

const store = useFinanceStore();

const draft = reactive({
  description: '',
  vendor: '',
  amount: 0,
  category: 'Software',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
});

watch(
  () => store.composerOpen,
  (open) => {
    if (open) {
      draft.description = '';
      draft.vendor = '';
      draft.amount = 0;
      draft.category = 'Software';
      draft.date = new Date().toISOString().slice(0, 10);
      draft.notes = '';
    }
  },
);

const categoryOptions = EXPENSE_CATEGORIES.map((value) => ({ value, label: value }));

function submit() {
  if (!draft.description.trim() || !draft.vendor.trim() || !draft.amount) {
    showToast({
      title: 'Missing details',
      description: 'Add a merchant, description, and amount.',
      variant: 'warning',
    });
    return;
  }
  const expense = store.addExpense({
    description: draft.description.trim(),
    vendor: draft.vendor.trim(),
    amount: Number(draft.amount),
    category: draft.category,
    date: draft.date,
    notes: draft.notes.trim(),
    employee: 'Hana Poluru',
    status: 'Pending',
  });
  showToast({
    title: 'Expense submitted',
    description: `${expense.description} is in Hana Poluru’s approval queue.`,
    variant: 'success',
  });
}
</script>

<template>
  <Modal :open="store.composerOpen" heading="Submit expense" @update:open="store.composerOpen = $event">
    <div class="mint-form-grid">
      <Input v-model="draft.description" class="mint-span-2" label="Description" placeholder="Cloud seats, airfare…" required />
      <Input v-model="draft.vendor" label="Vendor" placeholder="CloudPoluru Services" required />
      <NumberInput v-model="draft.amount" label="Amount" :min="0" :step="10" hint="USD" />
      <Select v-model="draft.category" label="Category" :options="categoryOptions" />
      <DatePicker v-model="draft.date" label="Date" />
      <Textarea v-model="draft.notes" class="mint-span-2" label="Notes" placeholder="Cost center, attendees, or receipt context" />
    </div>
    <template #footer>
      <Button variant="secondary" @click="store.closeComposer()">Cancel</Button>
      <Button icon="plus" @click="submit">Submit expense</Button>
    </template>
  </Modal>
</template>
