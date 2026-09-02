<script setup>
import { Avatar, ProgressBar } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { formatPercent } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useHelpdesk();
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Agents"
      description="Coverage and load for Meera’s desk on 28 Aug 2026."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Agents' }]"
    />

    <div class="row g-3">
      <div v-for="agent in store.agents" :key="agent.id" class="col-12 col-md-6 col-xl-4">
        <article class="lumen-macro-card">
          <header>
            <div class="lumen-model-cell">
              <Avatar :name="agent.name" size="sm" />
              <div>
                <h3>{{ agent.name }}</h3>
                <span class="lumen-subtle">{{ agent.role }} · {{ agent.queue }}</span>
              </div>
            </div>
            <StatusBadge :status="agent.status" />
          </header>
          <div class="lumen-policy-metric">
            <strong>{{ agent.open }} / {{ agent.capacity }}</strong>
            <span>open · CSAT {{ formatPercent(agent.csat) }}</span>
          </div>
          <ProgressBar :value="agent.open" :max="agent.capacity" />
        </article>
      </div>
    </div>
  </div>
</template>
