<script setup>
import { computed, reactive } from 'vue';
import {
  Autocomplete,
  Button,
  Modal,
  Select,
  Textarea,
} from '@poluru-labs/enterprise-design-system-vue';
import { ACTIVITY_TYPES } from '../../constants/theme.js';
import { useQuotaStore } from '../../stores/quota.js';
import { useDeals } from '../../composables/useDeals.js';

const { state } = useQuotaStore();
const { submitActivity } = useDeals();

const form = reactive({
  account: 'Harbor Labs',
  type: 'call',
  notes: '',
});

const dealOptions = computed(() =>
  state.deals.map((deal) => ({ value: deal.account, label: `${deal.account} · ${deal.amount}` })),
);

function onSubmit() {
  if (submitActivity(form)) {
    form.notes = '';
  }
}
</script>

<template>
  <Modal v-model:open="state.activityOpen" heading="Log activity">
    <div class="quota-form-grid">
      <Autocomplete
        class="quota-full"
        v-model="form.account"
        label="Deal"
        :options="dealOptions"
      />
      <Select v-model="form.type" label="Activity" :options="ACTIVITY_TYPES" />
      <Textarea
        class="quota-full"
        v-model="form.notes"
        label="Notes"
        placeholder="What happened, and what is the dated next step?"
      />
    </div>
    <template #footer>
      <Button variant="secondary" @click="state.activityOpen = false">Cancel</Button>
      <Button @click="onSubmit">Save activity</Button>
    </template>
  </Modal>
</template>
