<script setup>
import { ref } from 'vue';
import { Button, Card, Alert } from '@poluru-labs/enterprise-design-system-vue';
import { useStore } from '../store';

const store = useStore();
const localSettings = ref({ ...store.settings });
const saved = ref(false);

function saveSettings() {
  store.updateSettings(localSettings.value);
  saved.value = true;
  alert('Settings saved successfully!');
  setTimeout(() => {
    saved.value = false;
  }, 3000);
}

function resetSettings() {
  localSettings.value = { ...store.settings };
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <span class="eyebrow">Configuration</span>
        <h1>Settings</h1>
        <p>Manage workspace settings and integrations.</p>
      </div>
    </header>

    <Alert v-if="saved" variant="success" title="Success" message="Settings have been saved." />

    <Card class="settings-section">
      <h2 class="section-title">API Configuration</h2>
      <div class="form-group">
        <label>API Endpoint</label>
        <input
          v-model="localSettings.apiEndpoint"
          type="text"
          placeholder="https://api.example.com"
        />
        <p class="help-text">The base URL for your API</p>
      </div>

      <div class="form-group">
        <label>Webhook URL</label>
        <input
          v-model="localSettings.webhookUrl"
          type="text"
          placeholder="https://webhooks.example.com"
        />
        <p class="help-text">Endpoint for receiving webhook events</p>
      </div>

      <div class="form-group">
        <label>API Rate Limit</label>
        <input
          v-model.number="localSettings.apiRateLimit"
          type="number"
          placeholder="10000"
        />
        <p class="help-text">Requests per hour</p>
      </div>
    </Card>

    <Card class="settings-section">
      <h2 class="section-title">Security Settings</h2>
      
      <div class="toggle-group">
        <label class="toggle-item">
          <input
            v-model="localSettings.emailNotifications"
            type="checkbox"
          />
          <span class="toggle-label">
            <strong>Email Notifications</strong>
            <p>Receive email alerts for important events</p>
          </span>
        </label>
      </div>

      <div class="toggle-group">
        <label class="toggle-item">
          <input
            v-model="localSettings.twoFactorAuth"
            type="checkbox"
          />
          <span class="toggle-label">
            <strong>Two-Factor Authentication</strong>
            <p>Require 2FA for all users</p>
          </span>
        </label>
      </div>
    </Card>

    <Card class="settings-section">
      <h2 class="section-title">Danger Zone</h2>
      <Alert variant="danger" title="Caution" message="These actions are irreversible. Proceed with care." />
      <div class="action-row">
        <div>
          <h3>Reset to Defaults</h3>
          <p>Reset all settings to their default values.</p>
        </div>
        <Button variant="danger">Reset Settings</Button>
      </div>
    </Card>

    <div class="button-group">
      <Button variant="secondary" @click="resetSettings">Cancel</Button>
      <Button @click="saveSettings" :disabled="saved">{{ saved ? 'Saved!' : 'Save Settings' }}</Button>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 2rem;
  max-width: 900px;
}

.page-header {
  margin-bottom: 2rem;
}

.eyebrow {
  display: block;
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 0.5rem;
}

.settings-section {
  margin-bottom: 2rem;
  padding: 2rem;
}

.section-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.help-text {
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
  color: var(--muted);
}

.toggle-group {
  margin-bottom: 1rem;
}

.toggle-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: var(--paper);
  border-radius: 0.5rem;
  cursor: pointer;
}

.toggle-item input[type="checkbox"] {
  margin-top: 0.25rem;
  cursor: pointer;
}

.toggle-label {
  flex: 1;
}

.toggle-label strong {
  display: block;
  margin-bottom: 0.25rem;
}

.toggle-label p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: var(--paper);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.action-row div h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.action-row div p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--rule);
  border-radius: 0.25rem;
  font-family: inherit;
  font-size: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}
</style>
