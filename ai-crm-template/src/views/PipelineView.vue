<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Avatar,
  Badge,
  DropdownMenu,
  EmptyState,
  MenuItem,
  Tag,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import overview from '../data/overview.json';
import { crm, openDealModal, STAGES } from '../stores/crm.js';
import { formatCompactCurrency, formatShortDate } from '../utils/format.js';
import { dealHealthTone, stageTone } from '../utils/status.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import { Button } from '@poluru-labs/enterprise-design-system-vue';

const router = useRouter();
const openMenuId = ref('');

const columns = computed(() =>
  STAGES.map((stage) => {
    const items = crm.deals.filter((deal) => deal.stage === stage);
    const total = items.reduce((sum, deal) => sum + deal.amount, 0);
    return {
      stage,
      items,
      total,
      meta: overview.funnel.find((item) => item.stage === stage),
    };
  }),
);

const summary = computed(() => {
  const total = crm.deals.reduce((sum, deal) => sum + deal.amount, 0);
  const weighted = crm.deals.reduce((sum, deal) => sum + (deal.amount * deal.probability) / 100, 0);
  return {
    total,
    weighted,
    count: crm.deals.length,
    atRiskCount: crm.deals.filter((deal) => deal.health < 50).length,
  };
});

function toggleMenu(dealId, open) {
  openMenuId.value = open ? dealId : '';
}

function markWon(deal) {
  deal.stage = 'Closed won';
  deal.probability = 100;
  showToast({ title: 'Marked as won', description: `${deal.name} moved to Closed won.`, variant: 'success' });
}

function flagRisk(deal) {
  deal.health = 32;
  showToast({ title: 'Flagged at risk', description: `${deal.name} added to the at-risk list.`, variant: 'warning' });
}
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Pipeline"
      description="Five stages, live amounts, and deal health. Open a card to advance the conversation."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Pipeline' }]"
    >
      <template #actions>
        <Button icon="plus" @click="openDealModal()">New deal</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard label="Working set" :value="formatCompactCurrency(summary.total)" hint="Visible deals" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard label="Weighted" :value="formatCompactCurrency(summary.weighted)" hint="Probability-adjusted" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard label="Open deals" :value="String(summary.count)" hint="Across 5 stages" />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatCard label="At risk" :value="String(summary.atRiskCount)" hint="Health below 50" trend="down" />
      </div>
    </div>

    <div class="bloom-kanban">
      <section v-for="column in columns" :key="column.stage" class="bloom-kanban-col">
        <h2>
          <span>{{ column.stage }}</span>
          <Badge :label="String(column.items.length)" variant="brand" pill />
        </h2>
        <div class="bloom-kanban-total">{{ formatCompactCurrency(column.total) }}</div>
        <div class="bloom-hbar-track bloom-kanban-bar">
          <div class="bloom-hbar-fill" :style="{ width: `${column.meta?.width || 20}%` }" />
        </div>

        <div v-for="deal in column.items" :key="deal.id" class="bloom-deal-wrap">
          <RouterLink class="bloom-deal-card" :to="`${BASE_PATH}/deals/${deal.id}`">
            <div class="bloom-deal-head">
              <strong>{{ deal.name }}</strong>
              <span :class="['bloom-health-dot', `tone-${dealHealthTone(deal.health)}`]" :title="`Health ${deal.health}`">
                {{ deal.health }}
              </span>
            </div>
            <span>{{ deal.account }} · {{ deal.value }}</span>
            <div class="bloom-deal-meta">
              <Avatar :name="deal.owner" size="sm" />
              <Tag :label="deal.owner.replace(' Poluru', '')" :variant="stageTone(deal.stage)" />
              <span>{{ deal.probability }}% · {{ formatShortDate(deal.close) }}</span>
            </div>
          </RouterLink>
          <DropdownMenu class="bloom-deal-menu" placement="left" :open="openMenuId === deal.id" @update:open="(v) => toggleMenu(deal.id, v)">
            <template #trigger>
              <button type="button" class="bloom-deal-menu-trigger" aria-label="Deal actions">⋯</button>
            </template>
            <MenuItem :label="'Open ' + deal.name" @select="router.push(`${BASE_PATH}/deals/${deal.id}`)" />
            <MenuItem label="Mark as won" @select="markWon(deal)" />
            <MenuItem label="Flag at risk" @select="flagRisk(deal)" />
          </DropdownMenu>
        </div>

        <EmptyState v-if="!column.items.length" title="No deals" description="Nothing sitting in this stage." icon="folder" />
      </section>
    </div>
  </div>
</template>
