<script setup>
import { computed, ref } from 'vue';
import {
  Avatar,
  Badge,
  Button,
  Card,
  DropdownMenu,
  EmptyState,
  MenuItem,
  ProgressBar,
  Stat,
  Status,
  Tag,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { deals, funnel, stageTone, stages } from '../data';
import { go } from '../ui';

const emit = defineEmits(['create-deal']);

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 });
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

const columns = computed(() =>
  stages.map((stage) => {
    const items = deals.filter((deal) => deal.stage === stage);
    const total = items.reduce((sum, deal) => sum + deal.amount, 0);
    return {
      stage,
      items,
      total,
      meta: funnel.find((item) => item.stage === stage),
    };
  }),
);

const summary = computed(() => {
  const total = deals.reduce((sum, deal) => sum + deal.amount, 0);
  const weighted = deals.reduce((sum, deal) => sum + (deal.amount * deal.probability) / 100, 0);
  const atRiskCount = deals.filter((deal) => deal.health < 50).length;
  return {
    total,
    weighted,
    count: deals.length,
    avg: deals.length ? total / deals.length : 0,
    atRiskCount,
  };
});

function healthTone(health) {
  if (health >= 70) return 'success';
  if (health >= 45) return 'warning';
  return 'danger';
}

function closeLabel(close) {
  return dateFormat.format(new Date(close));
}

function markWon(deal) {
  showToast({ title: 'Marked as won', description: `${deal.name} moved to Closed won.`, variant: 'success' });
}

function flagRisk(deal) {
  showToast({ title: 'Flagged at risk', description: `${deal.name} added to the at-risk list.`, variant: 'warning' });
}

const openMenuId = ref('');
function toggleMenu(dealId, open) {
  openMenuId.value = open ? dealId : '';
}
</script>

<template>
  <header class="page-head">
    <div>
      <span class="eyebrow">Board</span>
      <h1>Pipeline</h1>
      <p>Five stages, live amounts, and deal health. Drag is simulated — open a card to advance the conversation.</p>
    </div>
    <Button icon="plus" @click="emit('create-deal')">New deal</Button>
  </header>

  <section class="metrics">
    <Card>
      <Stat label="Total pipeline" :value="currency.format(summary.total)" hint="All open stages" />
    </Card>
    <Card>
      <Stat label="Weighted pipeline" :value="currency.format(summary.weighted)" hint="Probability-adjusted" />
    </Card>
    <Card>
      <Stat label="Open deals" :value="String(summary.count)" hint="Across 5 stages" />
    </Card>
    <Card>
      <Stat label="At risk" :value="String(summary.atRiskCount)" hint="Health below 50" trend="down" />
    </Card>
  </section>

  <div class="kanban">
    <section v-for="column in columns" :key="column.stage" class="kanban-col">
      <h2>
        <span>{{ column.stage }}</span>
        <Badge :label="String(column.items.length)" variant="brand" pill />
      </h2>
      <div class="kanban-col-total">{{ currency.format(column.total) }}</div>
      <ProgressBar :value="column.meta?.width || 20" :label="column.meta?.value" />

      <div v-for="deal in column.items" :key="deal.id" class="deal-card-wrap">
        <a class="deal-card" :href="`#/deal/${deal.id}`">
          <div class="deal-card-head">
            <strong>{{ deal.name }}</strong>
            <Tooltip :content="`Health ${deal.health}/100`">
              <Status :tone="healthTone(deal.health)" :label="`${deal.health}`" />
            </Tooltip>
          </div>
          <span>{{ deal.account }} · {{ deal.value }}</span>
          <div class="row deal-card-meta">
            <Avatar :name="deal.owner" size="sm" />
            <Tag :label="deal.owner.replace(' Poluru', '')" :variant="stageTone(deal.stage)" />
            <span>{{ deal.probability }}% · closes {{ closeLabel(deal.close) }}</span>
          </div>
        </a>
        <DropdownMenu class="deal-menu" placement="left" :open="openMenuId === deal.id" @update:open="(v) => toggleMenu(deal.id, v)">
          <template #trigger>
            <button type="button" class="deal-menu-trigger" aria-label="Deal actions">⋯</button>
          </template>
          <MenuItem :label="'Open ' + deal.name" @select="go(`/deal/${deal.id}`)" />
          <MenuItem label="Mark as won" @select="markWon(deal)" />
          <MenuItem label="Flag at risk" @select="flagRisk(deal)" />
        </DropdownMenu>
      </div>

      <EmptyState v-if="!column.items.length" title="No deals" description="Nothing sitting in this stage." icon="folder" />
    </section>
  </div>
</template>
