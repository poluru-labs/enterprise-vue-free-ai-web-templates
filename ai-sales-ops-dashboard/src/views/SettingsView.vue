<script setup>
import { Avatar, Button, Card, Switch } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import { useQuotaStore } from '../stores/quota.js';
import { useTheme } from '../composables/useTheme.js';

const { state } = useQuotaStore();
const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Settings"
      title="Preferences"
      description="Profile, theme, and inbox defaults for the Quota workspace."
    />

    <div class="quota-grid-2">
      <Card title="Profile">
        <div class="quota-row quota-mb-lg">
          <Avatar :name="state.currentUser.name" size="lg" />
          <div>
            <strong>{{ state.currentUser.name }}</strong>
            <div class="quota-muted">{{ state.currentUser.role }}</div>
          </div>
        </div>
        <p class="quota-muted">Signed in as the revenue-ops lead for Quota sales operations.</p>
      </Card>
      <Card title="Appearance">
        <div class="quota-row quota-row-between">
          <div>
            <strong>Dark theme</strong>
            <div class="quota-muted">Royal navy header stays; canvas inverts.</div>
          </div>
          <Switch :model-value="isDark" @update:model-value="toggleTheme" />
        </div>
        <div class="quota-mt">
          <Button variant="secondary" @click="toggleTheme">{{ isDark ? 'Use light theme' : 'Use dark theme' }}</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
