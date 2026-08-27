<script setup>
import { computed, ref } from 'vue';
import { Button, Card, DataTable, EmptyState, Pagination, Search, Select, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { dealColumns, deals, ownerOptions, stageOptions } from '../data';
import { go } from '../ui';

const emit = defineEmits(['create-deal']);
const query = ref('');
const stage = ref('all');
const owner = ref('all');
const page = ref(1);
const pageSize = 5;

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return deals.filter((deal) => {
    const hay = `${deal.name} ${deal.account} ${deal.owner}`.toLowerCase();
    const stageOk = stage.value === 'all' || deal.stage === stage.value;
    const ownerOk = owner.value === 'all' || deal.owner.toLowerCase().includes(owner.value);
    return hay.includes(q) && stageOk && ownerOk;
  });
});

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
const rows = computed(() =>
  filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize).map((deal) => ({
    name: deal.name,
    account: deal.account,
    value: deal.value,
    stage: deal.stage,
    owner: deal.owner,
    close: deal.close,
    id: deal.id,
  })),
);
</script>

<template>
  <header class="page-head">
    <div>
      <span class="eyebrow">Records</span>
      <h1>Deals</h1>
      <p>Filter by owner or stage. Open a row from the board, or scan the table for close dates.</p>
    </div>
    <Button icon="plus" @click="emit('create-deal')">New deal</Button>
  </header>

  <Card>
    <div class="row" style="margin-bottom: 0.85rem">
      <div style="flex: 1; min-width: 16rem">
        <Search v-model="query" placeholder="Search deals" />
      </div>
      <Select v-model="stage" placeholder="" :options="[{ value: 'all', label: 'All stages' }, ...stageOptions]" />
      <Select v-model="owner" placeholder="" :options="[{ value: 'all', label: 'All owners' }, ...ownerOptions]" />
    </div>
    <EmptyState v-if="!filtered.length" title="No matching deals" description="Clear filters or create a new opportunity." icon="search">
      <Button size="sm" @click="emit('create-deal')">New deal</Button>
    </EmptyState>
    <template v-else>
      <DataTable :columns="dealColumns" :rows="rows" sortable striped />
      <div class="row" style="justify-content: space-between; margin-top: 0.85rem">
        <div class="row">
          <Tag v-for="deal in rows" :key="deal.id" :label="deal.name" variant="brand" @click="go(`#/deal/${deal.id}`)" />
        </div>
        <Pagination :page="page" :page-count="pageCount" @update:page="page = $event" />
      </div>
    </template>
  </Card>
</template>
