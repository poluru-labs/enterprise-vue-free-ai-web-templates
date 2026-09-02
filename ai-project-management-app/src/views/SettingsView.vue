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
import { assigneeOptions } from '../stores/projects.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';

const compact = ref(false);
const digest = ref(true);
const riskAlerts = ref(true);
const density = ref('comfortable');
const pin = ref('');
const wip = ref(5);
const timezone = ref('america-chicago');
const defaultOwner = ref(SIGNED_IN_USER.name);
const displayName = ref(SIGNED_IN_USER.name);

const timezoneOptions = [
  { value: 'america-chicago', label: 'America/Chicago' },
  { value: 'america-new_york', label: 'America/New_York' },
  { value: 'europe-london', label: 'Europe/London' },
  { value: 'asia-kolkata', label: 'Asia/Kolkata' },
];

const webhookSnippet = `POST https://api.poluru.cloud/v1/keel/issues
Authorization: Bearer keel_live_arjun
{
  "key": "KEEL-138",
  "title": "Auth fallback",
  "points": 5,
  "assignee": "Arjun Poluru"
}`;

function copied() {
  showToast({
    title: 'Webhook ready',
    description: 'Use Arjun Poluru’s live key in staging only.',
    variant: 'info',
  });
}
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Settings"
      description="Arjun Poluru’s Keel workspace: alerts, WIP limits, and the public ingest endpoint."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
    />

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <div class="keel-stack">
          <ChartSection title="Profile">
            <div class="keel-stack">
              <Input v-model="displayName" label="Display name" />
              <Autocomplete v-model="timezone" label="Timezone" :options="timezoneOptions" />
              <Combobox v-model="defaultOwner" label="Default assignee" :options="assigneeOptions" />
              <FileUpload label="Profile photo" accept="image/*" hint="Square PNG, 256px+" />
            </div>
          </ChartSection>
          <ChartSection title="Alerts">
            <div class="keel-stack">
              <Switch v-model="digest" :label="`Daily digest to ${SIGNED_IN_USER.email}`" />
              <Switch v-model="riskAlerts" label="Ping when a critical risk opens" />
              <Checkbox v-model="compact" label="Compact tables on the backlog" />
              <RadioGroup v-model="density" label="Density" orientation="horizontal">
                <Radio value="comfortable" label="Comfortable" />
                <Radio value="compact" label="Compact" />
              </RadioGroup>
            </div>
          </ChartSection>
        </div>
      </div>
      <div class="col-12 col-xl-6">
        <div class="keel-stack">
          <ChartSection title="Board limits">
            <PinInput v-model="pin" label="Confirm workspace PIN" :length="4" type="password" />
            <Slider class="mt-3" v-model="wip" label="WIP limit (In progress)" :min="1" :max="8" show-value />
          </ChartSection>
          <ChartSection title="Ingest webhook" subtitle="Copy into the partner connector">
            <CodeSnippet :code="webhookSnippet" language="http" @click="copied" />
          </ChartSection>
        </div>
      </div>
    </div>
  </div>
</template>
