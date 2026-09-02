<script setup>
import { ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { formatDuration, formatPercent } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useHelpdesk();
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="SLA"
      description="First-response and resolution policies for the Lumen desk."
      :crumbs="[BREADCRUMB_ROOT, { label: 'SLA' }]"
    />

    <div class="row g-3">
      <div v-for="policy in store.sla" :key="policy.id" class="col-12 col-md-6 col-xl-4">
        <article class="lumen-macro-card">
          <header>
            <div>
              <h3>{{ policy.name }}</h3>
              <span class="lumen-subtle">Target {{ formatDuration(policy.targetMin) }}</span>
            </div>
            <StatusBadge :status="policy.status" />
          </header>
          <div class="lumen-policy-metric">
            <strong>{{ formatPercent(policy.attainment) }}</strong>
            <span>attainment · {{ policy.tickets }} tickets</span>
          </div>
          <ProgressBar :value="policy.attainment" :max="100" />
          <p class="lumen-policy-note">Current {{ formatDuration(policy.currentMin) }}</p>
        </article>
      </div>
    </div>
  </div>
</template>
