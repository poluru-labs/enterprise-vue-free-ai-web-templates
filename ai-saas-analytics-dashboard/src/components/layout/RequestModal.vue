<script setup>
import { reactive } from 'vue';
import {
  Autocomplete,
  Button,
  DatePicker,
  Input,
  Modal,
  NumberInput,
  Select,
  Textarea,
} from '@poluru-labs/enterprise-design-system-vue';
import { PRIORITY_OPTIONS, TYPE_OPTIONS } from '../../constants/theme.js';
import { usePulseStore } from '../../stores/pulse.js';
import { useRequests } from '../../composables/useRequests.js';

const { state } = usePulseStore();
const { submitRequest } = useRequests();

const form = reactive({
  title: '',
  type: 'feature',
  priority: 'medium',
  owner: 'meera',
  due: '2026-09-15',
  estimate: 3,
  notes: '',
});

function onSubmit() {
  if (submitRequest(form)) {
    form.title = '';
    form.notes = '';
  }
}
</script>

<template>
  <Modal v-model:open="state.requestOpen" heading="Add feature or enhancement">
    <div class="pulse-form-grid">
      <Input class="pulse-full" v-model="form.title" label="Title" placeholder="Self-serve upgrade nudge" required />
      <Select v-model="form.type" label="Type" :options="TYPE_OPTIONS" />
      <Select v-model="form.priority" label="Priority" :options="PRIORITY_OPTIONS" />
      <Autocomplete v-model="form.owner" label="Owner" :options="state.ownerOptions" />
      <DatePicker v-model="form.due" label="Due date" />
      <NumberInput v-model="form.estimate" label="Estimate (days)" :min="1" :step="1" hint="Rough sizing" />
      <Textarea class="pulse-full" v-model="form.notes" label="Notes" placeholder="What should ship, and why does it matter?" />
    </div>
    <template #footer>
      <Button variant="secondary" @click="state.requestOpen = false">Cancel</Button>
      <Button @click="onSubmit">Save request</Button>
    </template>
  </Modal>
</template>
