<script setup>
import { Avatar, Button, Card, Switch } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import { usePulseStore } from '../stores/pulse.js';
import { useTheme } from '../composables/useTheme.js';

const { state } = usePulseStore();
const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <div class="pulse-page">
    <PageHeader
      eyebrow="Settings"
      title="Preferences"
      description="Profile, theme, and inbox defaults for the Pulse workspace."
    />

    <div class="pulse-grid-2">
      <Card title="Profile">
        <div class="pulse-row pulse-mb-lg">
          <Avatar :name="state.currentUser.name" size="lg" />
          <div>
            <strong>{{ state.currentUser.name }}</strong>
            <div class="pulse-muted">{{ state.currentUser.role }}</div>
          </div>
        </div>
        <p class="pulse-muted">Signed in as the growth lead for Pulse product analytics.</p>
      </Card>
      <Card title="Appearance">
        <div class="pulse-row pulse-row-between">
          <div>
            <strong>Dark theme</strong>
            <div class="pulse-muted">Indigo glass header stays; canvas inverts.</div>
          </div>
          <Switch :model-value="isDark" @update:model-value="toggleTheme" />
        </div>
        <div class="pulse-mt">
          <Button variant="secondary" @click="toggleTheme">{{ isDark ? 'Use light theme' : 'Use dark theme' }}</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
