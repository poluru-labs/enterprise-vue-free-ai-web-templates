<script setup>
import { reactive } from 'vue';
import { Button, Input, Select, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { currentUser } from '../constants/navigation.js';
import seed from '../data/settings.json';
import PageHeader from '../components/widgets/PageHeader.vue';
import ChartSection from '../components/widgets/ChartSection.vue';

const form = reactive({ ...seed });

const digestOptions = [
  { value: 'off', label: 'Off' },
  { value: 'weekday', label: 'Weekdays' },
  { value: 'weekly', label: 'Weekly digest' },
];

const spaceOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'people', label: 'People' },
  { value: 'legal', label: 'Legal' },
  { value: 'gtm', label: 'GTM' },
  { value: 'finance', label: 'Finance' },
  { value: 'security', label: 'Security' },
];

function save() {
  showToast({
    title: 'Settings saved',
    description: `${form.workspace} will open on the ${form.defaultSpace} space.`,
    variant: 'success',
  });
}
</script>

<template>
  <div class="atlas-page">
    <PageHeader
      title="Settings"
      description="Workspace identity, default space, and how Internal Comms hears about stale pages."
    >
      <template #actions>
        <Button class-name="atlas-btn-accent" @click="save">Save changes</Button>
      </template>
    </PageHeader>

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <ChartSection title="Workspace" :hint="currentUser.email">
          <div class="atlas-publish-form">
            <Input v-model="form.workspace" label="Workspace name" />
            <Select v-model="form.digest" label="Activity digest" :options="digestOptions" />
            <Select v-model="form.defaultSpace" label="Default space" :options="spaceOptions" />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-6">
        <ChartSection title="Signed in" :hint="currentUser.role">
          <p class="atlas-stat-value atlas-stat-value-sm">{{ currentUser.name }}</p>
          <p class="atlas-muted">Bookmarks and stale reminders stay on your Internal Comms digest.</p>
          <label class="atlas-check">
            <input v-model="form.bookmarkDigest" type="checkbox" />
            Include bookmarks in the weekday digest
          </label>
          <label class="atlas-check">
            <input v-model="form.staleReminders" type="checkbox" />
            Ping owners when a page goes stale
          </label>
          <label class="atlas-check">
            <input v-model="form.allowDraftsInSearch" type="checkbox" />
            Show drafts in company search
          </label>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
