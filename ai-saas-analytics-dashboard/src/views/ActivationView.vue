<script setup>
import { Card, ProgressBar, Status } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import PlaybookCard from '../components/widgets/PlaybookCard.vue';
import { usePulseStore } from '../stores/pulse.js';

const { state } = usePulseStore();
const playbook = state.playbooks[0];
</script>

<template>
  <div class="pulse-page">
    <PageHeader
      eyebrow="Activation"
      title="First-session aha"
      description="How signups reach the moment they understand Pulse — currently 64%."
    />

    <EqualHeightGrid :columns="4" label="Activation funnel">
      <Card v-for="step in state.activationFunnel" :key="step.id" class-name="pulse-eq-card">
        <div class="pulse-card-fill">
          <span class="pulse-eyebrow">{{ step.label }}</span>
          <strong class="pulse-big">{{ step.value.toLocaleString() }}</strong>
          <ProgressBar :label="`${step.rate}% of signups`" :value="step.rate" show-value />
        </div>
      </Card>
    </EqualHeightGrid>

    <div class="pulse-grid-2 pulse-mt-lg">
      <PlaybookCard :item="playbook" />
      <Card title="Today" description="Activation work on Ishaan Poluru’s calendar">
        <div class="pulse-stack">
          <div v-for="item in state.agenda" :key="item.id" class="pulse-row pulse-row-between">
            <div>
              <strong>{{ item.title }}</strong>
              <div class="pulse-muted">{{ item.with }} · {{ item.time }}</div>
            </div>
            <Status :label="item.type" :tone="item.type === 'Task' ? 'warning' : 'info'" />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
