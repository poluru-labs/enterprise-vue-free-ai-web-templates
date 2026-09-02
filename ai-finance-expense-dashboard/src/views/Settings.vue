<script setup>
import { ref } from 'vue';
import { Button, Card, Switch, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { SIGNED_IN_USER } from '../constants/navigation.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import { useFinanceStore } from '../stores/finance.js';

const store = useFinanceStore();
const alerts = ref(true);
const digest = ref(true);
const dualControl = ref(true);

function save() {
  showToast({
    title: 'Close settings saved',
    description: `${SIGNED_IN_USER.name} kept August lock on 5 Sep.`,
    variant: 'success',
  });
}
</script>

<template>
  <div class="mint-page">
    <PageHeader
      eyebrow="Workspace"
      title="Settings"
      :description="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role} · ${SIGNED_IN_USER.email}`"
    />

    <div class="mint-split">
      <Card class="mint-panel" title="Close calendar" description="August books lock 5 September 2026.">
        <dl class="mint-kv mint-kv-stack">
          <div>
            <dt>Close month</dt>
            <dd>{{ store.close.label }}</dd>
          </div>
          <div>
            <dt>Progress</dt>
            <dd>{{ store.close.percent }}% · {{ store.close.tasksDone }}/{{ store.close.tasksTotal }} tasks</dd>
          </div>
          <div>
            <dt>Entities</dt>
            <dd>{{ store.close.entitiesClosed }} of {{ store.close.entitiesTotal }} closed</dd>
          </div>
        </dl>
      </Card>
      <Card class="mint-panel" title="Alerts">
        <div class="mint-setting-row">
          <span>Overdue AP ping</span>
          <Switch v-model="alerts" />
        </div>
        <div class="mint-setting-row">
          <span>Daily close digest</span>
          <Switch v-model="digest" />
        </div>
        <div class="mint-setting-row">
          <span>Dual control above $5,000</span>
          <Switch v-model="dualControl" />
        </div>
        <Button style="margin-top: 1rem" @click="save">Save preferences</Button>
      </Card>
    </div>
  </div>
</template>
