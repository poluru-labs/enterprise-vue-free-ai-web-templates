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
import { useHr } from '../stores/hr.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';

const store = useHr();
const digest = ref(true);
const compact = ref(false);
const env = ref('production');
const name = ref(store.state.settings.name);
const officeClose = ref(store.state.settings.officeClose);
const ptoPolicyDays = ref(store.state.settings.ptoPolicyDays);
const twoFactor = ref(store.state.settings.twoFactorAuth);
const emailNotifications = ref(store.state.settings.emailNotifications);
const channels = reactive(Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])));

function save() {
  store.updateSettings({
    name: name.value,
    officeClose: officeClose.value,
    ptoPolicyDays: Number(ptoPolicyDays.value),
    twoFactorAuth: twoFactor.value,
    emailNotifications: emailNotifications.value,
  });
  showToast({ title: 'Saved', description: 'Grove people-ops defaults updated.', variant: 'success' });
}
</script>

<template>
  <div class="grove-page">
    <PageHeader
      title="Settings"
      description="Leave policy, branding, and team access for Grove."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
    >
      <template #actions>
        <Button size="sm" icon="save" @click="save">Save changes</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Workspace" subtitle="Grove people operations">
          <div class="grove-form-stack">
            <Input v-model="name" label="Workspace name" />
            <Input :model-value="SIGNED_IN_USER.email" label="People lead email" />
            <Input v-model="officeClose" label="Next office close" />
            <Input v-model="ptoPolicyDays" label="Annual PTO days" type="number" />
            <RadioGroup v-model="env" label="Default environment" orientation="horizontal">
              <Radio value="production" label="Production" />
              <Radio value="staging" label="Staging" />
            </RadioGroup>
            <Switch v-model="digest" label="Daily digest to Sravani Poluru" />
            <Switch v-model="emailNotifications" label="Email notifications" />
            <Switch v-model="twoFactor" label="Require two-factor authentication" />
            <Checkbox v-model="compact" label="Compact tables" />
          </div>
          <dl class="grove-settings-list mt-3">
            <div>
              <dt>Slug</dt>
              <dd class="grove-mono">{{ settings.workspace.slug }}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{{ settings.workspace.region }}</dd>
            </div>
            <div>
              <dt>Brand</dt>
              <dd class="grove-brand-swatch">
                <i :style="{ background: settings.workspace.brandColor }" />
                {{ settings.workspace.brandColor }}
              </dd>
            </div>
          </dl>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="People ops access" subtitle="Teammates with Grove admin">
          <div v-for="member in settings.team" :key="member.name" class="grove-member">
            <div class="grove-model-cell">
              <Avatar :name="member.name" size="sm" />
              <strong>{{ member.name }}</strong>
            </div>
            <span>{{ member.role }}</span>
          </div>
          <Button variant="secondary" size="sm" icon="plus" @click="store.setAddEmployeeOpen(true)">
            Add employee
          </Button>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12">
        <ChartSection title="Alert routing" subtitle="Toggle destinations. Changes stay in this browser session.">
          <div class="grove-settings-toggles">
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
