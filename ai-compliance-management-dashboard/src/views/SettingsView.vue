<script setup>
import { reactive, ref } from 'vue';
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';

const store = useCompliance();
const digest = ref(true);
const compact = ref(false);
const env = ref('production');
const name = ref(store.state.settings.name);
const retentionDays = ref(store.state.settings.retentionDays);
const evidenceWindow = ref(store.state.settings.evidenceWindow);
const twoFactor = ref(store.state.settings.twoFactorAuth);
const emailNotifications = ref(store.state.settings.emailNotifications);
const channels = reactive(Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])));

function save() {
  store.updateSettings({
    name: name.value,
    retentionDays: Number(retentionDays.value),
    evidenceWindow: Number(evidenceWindow.value),
    twoFactorAuth: twoFactor.value,
    emailNotifications: emailNotifications.value,
  });
  showToast({ title: 'Saved', description: 'Aegis workspace defaults updated.', variant: 'success' });
}
</script>

<template>
  <div class="aeg-page">
    <PageHeader
      title="Settings"
      description="Retention, evidence windows, and team access for Aegis."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
    >
      <template #actions>
        <Button size="sm" icon="save" @click="save">Save changes</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Workspace" subtitle="Aegis production">
          <div class="aeg-form-stack">
            <Input v-model="name" label="Workspace name" />
            <Input :model-value="SIGNED_IN_USER.email" label="Compliance lead email" />
            <Input v-model="retentionDays" label="Evidence retention (days)" type="number" />
            <Input v-model="evidenceWindow" label="Evidence window (days)" type="number" />
            <RadioGroup v-model="env" label="Default environment" orientation="horizontal">
              <Radio value="production" label="Production" />
              <Radio value="staging" label="Staging" />
            </RadioGroup>
            <Switch v-model="digest" label="Daily digest to Kavya Poluru" />
            <Switch v-model="emailNotifications" label="Email notifications" />
            <Switch v-model="twoFactor" label="Require two-factor authentication" />
            <Checkbox v-model="compact" label="Compact tables" />
          </div>
          <dl class="aeg-settings-list mt-3">
            <div>
              <dt>Slug</dt>
              <dd class="aeg-mono">{{ settings.workspace.slug }}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{{ settings.workspace.region }}</dd>
            </div>
            <div>
              <dt>Brand</dt>
              <dd class="aeg-brand-swatch">
                <i :style="{ background: settings.workspace.brandColor }" />
                {{ settings.workspace.brandColor }}
              </dd>
            </div>
          </dl>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Program access" subtitle="People with Aegis admin">
          <div v-for="member in settings.team" :key="member.name" class="aeg-member">
            <div class="aeg-model-cell">
              <Avatar :name="member.name" size="sm" />
              <strong>{{ member.name }}</strong>
            </div>
            <span>{{ member.role }}</span>
          </div>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12">
        <ChartSection title="Alert routing" subtitle="Toggle destinations. Changes stay in this browser session.">
          <div class="aeg-settings-toggles">
            <Switch
              v-for="channel in settings.channels"
              :key="channel.id"
              v-model="channels[channel.id]"
              :label="channel.label"
            />
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
