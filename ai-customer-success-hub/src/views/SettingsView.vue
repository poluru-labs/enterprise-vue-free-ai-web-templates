<script setup>
import { reactive, ref } from 'vue';
import {
  Button,
  Checkbox,
  CodeSnippet,
  FileUpload,
  Input,
  PinInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Spinner,
  Switch,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { useSuccess } from '../stores/success.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';

const store = useSuccess();
const saving = ref(false);
const form = reactive({ ...store.settings });

const digestOptions = [
  { value: 'off', label: 'Off' },
  { value: 'weekday', label: 'Weekdays' },
  { value: 'weekly', label: 'Weekly' },
];

function save() {
  saving.value = true;
  window.setTimeout(() => {
    store.updateSettings({ ...form });
    saving.value = false;
    showToast({
      title: 'Workspace saved',
      description: `${form.workspace} will alert under health ${form.healthThreshold}.`,
      variant: 'success',
    });
  }, 500);
}
</script>

<template>
  <div class="mrg-page">
    <PageHeader
      title="Settings"
      description="Book name, digest, and the health line Meera Poluru reviews."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
    >
      <template #actions>
        <Button size="sm" icon="save" :loading="saving" @click="save">
          <Spinner v-if="saving" size="sm" label="Saving" />
          <span v-else>Save changes</span>
        </Button>
      </template>
    </PageHeader>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Workspace" :subtitle="SIGNED_IN_USER.email">
          <div class="mrg-form-stack">
            <Input v-model="form.workspace" label="Workspace name" />
            <Select v-model="form.digest" label="Digest" :options="digestOptions" />
            <TimePicker v-model="form.digestTime" label="Send time" />
            <RadioGroup v-model="form.cadence" label="Review cadence" orientation="horizontal">
              <Radio value="daily" label="Daily" />
              <Radio value="weekly" label="Weekly" />
            </RadioGroup>
            <Slider v-model="form.healthThreshold" label="Health alert line" :min="20" :max="80" :step="5" show-value />
            <Switch v-model="form.emailDigest" label="Email the Thursday digest to Meera Poluru" />
            <Checkbox v-model="form.compactCards" label="Compact account cards" />
            <PinInput v-model="form.pin" label="Desk PIN" :length="4" type="number" />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Identity" subtitle="Shown in shared exports">
          <p class="mrg-stat-value mrg-stat-value-sm">{{ SIGNED_IN_USER.name }}</p>
          <p class="mrg-subtle">{{ SIGNED_IN_USER.role }}</p>
          <CodeSnippet :code="form.slug" language="text" />
          <FileUpload class="mt-3" label="Workspace mark" hint="SVG or PNG" accept=".svg,.png" />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
