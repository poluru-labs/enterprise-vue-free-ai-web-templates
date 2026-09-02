<script setup>
import { reactive, ref } from 'vue';
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';

const store = useHelpdesk();
const digest = ref(true);
const compact = ref(false);
const name = ref(store.state.settings.name);
const replyEmail = ref(store.state.settings.replyEmail);
const webhookUrl = ref(store.state.settings.webhookUrl);
const firstResponseTarget = ref(store.state.settings.firstResponseTarget);
const aiDrafts = ref(store.state.settings.aiDrafts);
const autoAssign = ref(store.state.settings.autoAssign);
const emailNotifications = ref(store.state.settings.emailNotifications);
const twoFactor = ref(store.state.settings.twoFactorAuth);
const channels = reactive(Object.fromEntries(settings.channels.map((channel) => [channel.id, channel.enabled])));

function save() {
  store.updateSettings({
    name: name.value,
    replyEmail: replyEmail.value,
    webhookUrl: webhookUrl.value,
    firstResponseTarget: Number(firstResponseTarget.value),
    aiDrafts: aiDrafts.value,
    autoAssign: autoAssign.value,
    emailNotifications: emailNotifications.value,
    twoFactorAuth: twoFactor.value,
  });
  showToast({ title: 'Saved', description: 'Lumen desk defaults updated.', variant: 'success' });
}
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Desk settings"
      description="Intake, AI drafts, and alert routing for the Lumen workspace."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
    >
      <template #actions>
        <Button size="sm" icon="save" @click="save">Save changes</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Workspace" subtitle="Production Lumen desk">
          <div class="lumen-form-stack">
            <Input v-model="name" label="Desk name" />
            <Input :model-value="SIGNED_IN_USER.email" label="Lead email" />
            <Input v-model="replyEmail" label="Reply-from address" />
            <Input v-model="webhookUrl" label="Webhook URL" />
            <Input v-model="firstResponseTarget" label="First-response target (minutes)" type="number" />
            <Switch v-model="digest" label="Daily digest to Meera Poluru" />
            <Switch v-model="aiDrafts" label="AI draft suggestions" />
            <Switch v-model="autoAssign" label="Assign next on claim" />
            <Switch v-model="emailNotifications" label="Email notifications" />
            <Switch v-model="twoFactor" label="Require two-factor authentication" />
            <Checkbox v-model="compact" label="Compact tables" />
          </div>
          <dl class="lumen-settings-list mt-3">
            <div>
              <dt>Slug</dt>
              <dd class="lumen-mono">{{ settings.workspace.slug }}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{{ settings.workspace.region }}</dd>
            </div>
            <div>
              <dt>Brand</dt>
              <dd class="lumen-brand-swatch">
                <i :style="{ background: settings.workspace.brandColor }" />
                {{ settings.workspace.brandColor }}
              </dd>
            </div>
          </dl>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Desk access" subtitle="People with access to this workspace">
          <div v-for="member in settings.team" :key="member.name" class="lumen-member">
            <div class="lumen-model-cell">
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
        <ChartSection title="Intake channels" subtitle="Toggle destinations. Changes stay in this browser session.">
          <div class="lumen-settings-toggles">
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
