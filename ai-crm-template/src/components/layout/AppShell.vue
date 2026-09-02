<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Autocomplete,
  Combobox,
  DatePicker,
  Divider,
  Drawer,
  FileUpload,
  Input,
  Modal,
  NumberInput,
  Select,
  Textarea,
  TimePicker,
  Button,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, SIGNED_IN_USER } from '../../constants/navigation.js';
import {
  accountOptions,
  convertLead,
  createDeal,
  crm,
  logActivity,
  ownerOptions,
  sourceOptions,
  stageOptions,
} from '../../stores/crm.js';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';

const route = useRoute();
const router = useRouter();
const sidebarOpen = ref(false);
const dealName = ref('');
const dealAccount = ref('acc_harbor');
const dealOwner = ref('priya');
const dealStage = ref('Qualify');
const dealAmount = ref(48000);
const dealSource = ref('inbound');
const activityType = ref('Call');
const activityDate = ref('2026-08-27');
const activityTime = ref('16:30');
const activityNotes = ref('');
const convertOwner = ref('priya');

watch(
  () => route.path,
  () => {
    sidebarOpen.value = false;
  },
);

watch(sidebarOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onMounted(() => {
  document.body.style.overflow = '';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

function saveDeal() {
  if (!dealName.value.trim()) {
    showToast({ title: 'Name required', description: 'Give the opportunity a title first.', variant: 'warning' });
    return;
  }
  const deal = createDeal({
    name: dealName.value,
    accountId: dealAccount.value,
    owner: dealOwner.value,
    stage: dealStage.value,
    amount: dealAmount.value,
    source: dealSource.value,
  });
  dealName.value = '';
  showToast({
    title: 'Deal created',
    description: `${deal.name} is owned by ${deal.owner}.`,
    variant: 'success',
  });
  router.push(`${BASE_PATH}/pipeline`);
}

function saveActivity() {
  logActivity({
    type: activityType.value,
    date: activityDate.value,
    time: activityTime.value,
    notes: activityNotes.value,
  });
  showToast({
    title: 'Activity logged',
    description: `Saved for ${activityDate.value} at ${activityTime.value}.`,
    variant: 'success',
  });
  activityNotes.value = '';
}

function saveConvert() {
  const result = convertLead(crm.selectedLead, convertOwner.value);
  showToast({
    title: 'Lead converted',
    description: `${result?.lead?.name || 'Lead'} is now a discovery deal.`,
    variant: 'success',
  });
  router.push(`${BASE_PATH}/deals`);
}
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="bloom-shell">
    <AppSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
    <button
      v-if="sidebarOpen"
      type="button"
      class="bloom-backdrop"
      aria-label="Close navigation"
      @click="sidebarOpen = false"
    />
    <div class="bloom-workspace">
      <AppHeader :on-menu-toggle="() => (sidebarOpen = !sidebarOpen)" />
      <main id="main" class="bloom-content">
        <RouterView />
      </main>
    </div>
  </div>

  <Modal v-model:open="crm.dealOpen" heading="Create opportunity">
    <div class="bloom-form-grid">
      <Input class="full" v-model="dealName" label="Deal name" placeholder="Harbor expansion" required />
      <Combobox v-model="dealAccount" label="Account" :options="accountOptions" />
      <Autocomplete v-model="dealOwner" label="Owner" :options="ownerOptions" />
      <Select v-model="dealStage" label="Stage" :options="stageOptions" />
      <Select v-model="dealSource" label="Source" :options="sourceOptions" />
      <NumberInput v-model="dealAmount" label="Amount" :min="0" :step="1000" hint="USD" />
    </div>
    <template #footer>
      <Button variant="secondary" @click="crm.dealOpen = false">Cancel</Button>
      <Button @click="saveDeal">Save deal</Button>
    </template>
  </Modal>

  <Drawer v-model:open="crm.activityOpen" heading="Log activity" size="md">
    <div class="bloom-stack">
      <Select
        v-model="activityType"
        label="Type"
        :options="[
          { value: 'Call', label: 'Call' },
          { value: 'Meeting', label: 'Meeting' },
          { value: 'Task', label: 'Task' },
        ]"
      />
      <DatePicker v-model="activityDate" label="Date" />
      <TimePicker v-model="activityTime" label="Time" />
      <Textarea v-model="activityNotes" label="Notes" placeholder="What did Meera Poluru agree to?" />
      <FileUpload label="Attach a file" hint="Deck, redlines, or security questionnaire" />
    </div>
    <template #footer>
      <Button variant="secondary" @click="crm.activityOpen = false">Cancel</Button>
      <Button @click="saveActivity">Save activity</Button>
    </template>
  </Drawer>

  <Drawer v-model:open="crm.leadOpen" heading="Convert lead" size="md">
    <div class="bloom-stack">
      <Select
        v-model="crm.selectedLead"
        label="Lead"
        :options="crm.leads.map((item) => ({ value: item.id, label: `${item.name} · ${item.company}` }))"
      />
      <Autocomplete v-model="convertOwner" label="Deal owner" :options="ownerOptions" />
      <Divider />
      <p class="bloom-note">
        Bloom keeps {{ SIGNED_IN_USER.name }} on the account team and opens a discovery deal at 20% probability.
      </p>
    </div>
    <template #footer>
      <Button variant="secondary" @click="crm.leadOpen = false">Cancel</Button>
      <Button @click="saveConvert">Convert</Button>
    </template>
  </Drawer>
</template>
