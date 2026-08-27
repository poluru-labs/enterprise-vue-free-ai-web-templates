<script setup>
import { ref } from 'vue';
import {
  Autocomplete,
  Card,
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
import { currentUser, ownerOptions, timezoneOptions, webhookSnippet } from '../data';

const compact = ref(false);
const digest = ref(true);
const coach = ref(true);
const density = ref('comfortable');
const pin = ref('');
const buffer = ref(12);
const timezone = ref('america-chicago');
const defaultOwner = ref('priya');
const displayName = ref(currentUser.name);

function copied() {
  showToast({ title: 'Webhook ready', description: 'Use Priya Poluru’s live key in staging only.', variant: 'info' });
}
</script>

<template>
  <header class="page-head">
    <div>
      <span class="eyebrow">Workspace</span>
      <h1>Settings</h1>
      <p>Priya Poluru’s Bloom workspace: alerts, density, and the public ingest endpoint.</p>
    </div>
  </header>

  <div class="grid-2">
    <div class="stack">
      <Card title="Profile">
        <div class="stack">
          <Input v-model="displayName" label="Display name" />
          <Autocomplete v-model="timezone" label="Timezone" :options="timezoneOptions" />
          <Combobox v-model="defaultOwner" label="Default deal owner" :options="ownerOptions" />
          <FileUpload label="Profile photo" accept="image/*" hint="Square PNG, 256px+" />
        </div>
      </Card>
      <Card title="Alerts">
        <div class="stack">
          <Switch v-model="digest" label="Daily digest to priya.poluru@polurulabs.example" />
          <Switch v-model="coach" label="AI coaching on at-risk deals" />
          <Checkbox v-model="compact" label="Compact tables on reports" />
          <RadioGroup v-model="density" label="Density" orientation="horizontal">
            <Radio value="comfortable" label="Comfortable" />
            <Radio value="compact" label="Compact" />
          </RadioGroup>
        </div>
      </Card>
    </div>
    <div class="stack">
      <Card title="Security">
        <PinInput v-model="pin" label="Confirm workspace PIN" :length="4" type="password" />
        <Slider class="mt-3" v-model="buffer" label="Forecast buffer (%)" :min="0" :max="25" show-value />
      </Card>
      <Card title="Ingest webhook" description="Copy into the partner connector">
        <CodeSnippet :code="webhookSnippet" language="http" @click="copied" />
      </Card>
    </div>
  </div>
</template>
