<script setup>
import { ref } from 'vue';
import {
  Autocomplete,
  Checkbox,
  CodeSnippet,
  Combobox,
  FileUpload,
  Input,
  PinInput,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { ownerOptions } from '../stores/crm.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';

const compact = ref(false);
const digest = ref(true);
const coach = ref(true);
const density = ref('comfortable');
const pin = ref('');
const buffer = ref(12);
const timezone = ref('america-chicago');
const defaultOwner = ref('priya');
const displayName = ref(SIGNED_IN_USER.name);

const timezoneOptions = [
  { value: 'america-chicago', label: 'America/Chicago' },
  { value: 'america-new_york', label: 'America/New_York' },
  { value: 'europe-london', label: 'Europe/London' },
  { value: 'asia-kolkata', label: 'Asia/Kolkata' },
];

const webhookSnippet = `POST https://api.poluru.cloud/v1/bloom/deals
Authorization: Bearer bloom_live_priya
{
  "account": "Harbor & Co.",
  "owner": "Priya Poluru",
  "amount": 184000
}`;

function copied() {
  showToast({ title: 'Webhook ready', description: 'Use Priya Poluru’s live key in staging only.', variant: 'info' });
}
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Settings"
      description="Priya Poluru’s Bloom workspace: alerts, density, and the public ingest endpoint."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
    />

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <div class="bloom-stack">
          <ChartSection title="Profile">
            <div class="bloom-stack">
              <Input v-model="displayName" label="Display name" />
              <Autocomplete v-model="timezone" label="Timezone" :options="timezoneOptions" />
              <Combobox v-model="defaultOwner" label="Default deal owner" :options="ownerOptions" />
              <FileUpload label="Profile photo" accept="image/*" hint="Square PNG, 256px+" />
            </div>
          </ChartSection>
          <ChartSection title="Alerts">
            <div class="bloom-stack">
              <Switch v-model="digest" :label="`Daily digest to ${SIGNED_IN_USER.email}`" />
              <Switch v-model="coach" label="AI coaching on at-risk deals" />
              <Checkbox v-model="compact" label="Compact tables on reports" />
              <RadioGroup v-model="density" label="Density" orientation="horizontal">
                <Radio value="comfortable" label="Comfortable" />
                <Radio value="compact" label="Compact" />
              </RadioGroup>
            </div>
          </ChartSection>
        </div>
      </div>
      <div class="col-12 col-xl-6">
        <div class="bloom-stack">
          <ChartSection title="Security">
            <PinInput v-model="pin" label="Confirm workspace PIN" :length="4" type="password" />
            <Slider class="mt-3" v-model="buffer" label="Forecast buffer (%)" :min="0" :max="25" show-value />
          </ChartSection>
          <ChartSection title="Ingest webhook" subtitle="Copy into the partner connector">
            <CodeSnippet :code="webhookSnippet" language="http" @click="copied" />
          </ChartSection>
        </div>
      </div>
    </div>
  </div>
</template>
