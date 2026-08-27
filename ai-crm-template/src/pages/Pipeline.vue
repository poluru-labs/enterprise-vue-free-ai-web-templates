<script setup>
import { computed } from 'vue';
import { Badge, Button, Card, ProgressBar, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { deals, funnel, stageTone, stages } from '../data';

const emit = defineEmits(['create-deal']);

const columns = computed(() =>
  stages.map((stage) => ({
    stage,
    items: deals.filter((deal) => deal.stage === stage),
    meta: funnel.find((item) => item.stage === stage),
  })),
);
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

  <div class="kanban">
    <section v-for="column in columns" :key="column.stage" class="kanban-col">
      <h2>
        <span>{{ column.stage }}</span>
        <Badge :label="String(column.items.length)" variant="brand" pill />
      </h2>
      <ProgressBar :value="column.meta?.width || 20" :label="column.meta?.value" />
      <a v-for="deal in column.items" :key="deal.id" class="deal-card" :href="`#/deal/${deal.id}`">
        <strong>{{ deal.name }}</strong>
        <span>{{ deal.account }} · {{ deal.value }}</span>
        <div class="row" style="margin-top: 0.45rem">
          <Tag :label="deal.owner.replace(' Poluru', '')" :variant="stageTone(deal.stage)" />
          <span>{{ deal.probability }}%</span>
        </div>
      </a>
    </section>
  </div>
</template>
