<script setup>
import { computed, ref } from 'vue';
import { Badge, Button, Card, DataTable, EmptyState, Meter, Search, Tabs, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { leadColumns, leads } from '../data';

const emit = defineEmits(['convert-lead']);
const tab = ref('all');
const query = ref('');

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return leads.filter((lead) => {
    const tabOk = tab.value === 'all' || lead.status.toLowerCase() === tab.value;
    const hay = `${lead.name} ${lead.company} ${lead.owner}`.toLowerCase();
    return tabOk && hay.includes(q);
  });
});
</script>

<template>
  <header class="page-head">
    <div>
      <span class="eyebrow">Inbound</span>
      <h1>Leads</h1>
      <p>Hana Poluru and Aisha Poluru are ready to convert. Scores come from partner, webinar, and outbound motion.</p>
    </div>
    <Button icon="user" @click="emit('convert-lead')">Convert lead</Button>
  </header>

  <Card>
    <div class="row" style="margin-bottom: 0.85rem">
      <Tabs
        v-model="tab"
        :items="[
          { id: 'all', label: 'All' },
          { id: 'new', label: 'New' },
          { id: 'working', label: 'Working' },
          { id: 'ready', label: 'Ready' },
        ]"
      />
      <div style="flex: 1; min-width: 14rem">
        <Search v-model="query" placeholder="Search people" />
      </div>
    </div>
    <EmptyState v-if="!filtered.length" title="No leads in this view" description="Try another tab or clear search." icon="user" />
    <template v-else>
      <DataTable :columns="leadColumns" :rows="filtered" sortable striped />
      <div class="grid-3" style="margin-top: 0.9rem">
        <Card v-for="lead in filtered" :key="lead.id" :title="lead.name" :description="lead.company">
          <Meter :label="`${lead.score} score`" :value="lead.score" show-value />
          <div class="row" style="margin-top: 0.65rem">
            <Tag :label="lead.source" variant="brand" />
            <Badge :label="lead.owner" pill />
          </div>
        </Card>
      </div>
    </template>
  </Card>
</template>
