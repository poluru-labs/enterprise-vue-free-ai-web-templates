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
import { useContent } from '../stores/content.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';

const store = useContent();
const digest = ref(true);
const compact = ref(false);
const env = ref('production');
const name = ref(store.state.settings.name);
const retainDrafts = ref(store.state.settings.retainDrafts);
const reviewSlaHours = ref(store.state.settings.reviewSlaHours);
const twoFactor = ref(store.state.settings.twoFactorAuth);
const emailNotifications = ref(store.state.settings.emailNotifications);
const channels = reactive(Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])));

function save() {
  store.updateSettings({
    name: name.value,
    retainDrafts: Number(retainDrafts.value),
    reviewSlaHours: Number(reviewSlaHours.value),
    twoFactorAuth: twoFactor.value,
    emailNotifications: emailNotifications.value,
  });
  showToast({ title: 'Saved', description: 'Folio workspace defaults updated.', variant: 'success' });
}
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Settings"
      description="Windows, review SLAs, and desk access for Folio."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
    >
      <template #actions>
        <Button size="sm" icon="save" @click="save">Save changes</Button>
      </template>
    </PageHeader>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Workspace" subtitle="Folio production">
          <div class="flo-form-stack">
            <Input v-model="name" label="Workspace name" />
            <Input :model-value="SIGNED_IN_USER.email" label="Content lead email" />
            <Input v-model="retainDrafts" label="Draft retention (days)" type="number" />
            <Input v-model="reviewSlaHours" label="Review SLA (hours)" type="number" />
            <RadioGroup v-model="env" label="Default environment" orientation="horizontal">
              <Radio value="production" label="Production" />
              <Radio value="staging" label="Staging" />
            </RadioGroup>
            <Switch v-model="digest" label="Daily digest to Ananya Poluru" />
            <Switch v-model="emailNotifications" label="Email notifications" />
            <Switch v-model="twoFactor" label="Require two-factor authentication" />
            <Checkbox v-model="compact" label="Compact tables" />
            <Checkbox v-for="channel in settings.channels" :key="channel.id" v-model="channels[channel.id]" :label="channel.label" />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Desk" subtitle="People on Folio">
          <div class="flo-stack">
            <div v-for="member in settings.members" :key="member.name" class="flo-member">
              <div class="flo-model-cell">
                <Avatar :name="member.name" size="sm" />
                <div>
                  <strong>{{ member.name }}</strong>
                  <p class="flo-subtle mb-0">{{ member.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
