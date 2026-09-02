<script setup>
import { reactive } from 'vue';
import { Button, FileUpload, Input, Select, showToast } from '@poluru-labs/enterprise-design-system-vue';
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

function save() {
  showToast({
    title: 'Settings saved',
    description: `${form.workspace} will keep a ${form.retentionMonths}-month retention window.`,
    variant: 'success',
  });
}
</script>

<template>
  <div class="vault-page">
    <PageHeader
      title="Settings"
      description="Workspace identity, review rules, and citation search for Knowledge Ops."
    >
      <template #actions>
        <Button class-name="vault-btn-accent" @click="save">Save changes</Button>
      </template>
    </PageHeader>

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <ChartSection title="Workspace" :hint="currentUser.email">
          <div class="vault-upload-form">
            <Input v-model="form.workspace" label="Workspace name" />
            <Select v-model="form.digest" label="Activity digest" :options="digestOptions" />
            <Input v-model="form.retentionMonths" type="number" label="Retention (months)" />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-6">
        <ChartSection title="Signed in" :hint="currentUser.role">
          <p class="vault-stat-value vault-stat-value-sm">{{ currentUser.name }}</p>
          <p class="vault-muted">Reviews you assign stay on the Legal and Security queues.</p>
          <label class="vault-check">
            <input v-model="form.requireReviewer" type="checkbox" />
            Require a reviewer on new uploads
          </label>
          <label class="vault-check">
            <input v-model="form.citationSearch" type="checkbox" />
            Enable citation-aware search
          </label>
          <label class="vault-check">
            <input v-model="form.pinEnabled" type="checkbox" />
            PIN-protect shared exports
          </label>
          <FileUpload class="mt-3" label="Workspace logo" hint="SVG or PNG, 256px" />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
