<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import {
  BASE_PATH,
  BREADCRUMB_ROOT,
  CHANNEL_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from '../constants/navigation.js';
import { useContent } from '../stores/content.js';
import { formatDate } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const ALL = [{ value: 'all', label: 'All' }];
const router = useRouter();
const store = useContent();
const query = ref('');
const channel = ref('all');
const type = ref('all');
const status = ref('all');

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type' },
  { key: 'channel', label: 'Channel' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'publishOn', label: 'Publish' },
];

const rows = computed(() => {
  let list = store.state.pieces.filter((item) => item.status !== 'published');
  if (channel.value !== 'all') list = list.filter((item) => item.channel === channel.value);
  if (type.value !== 'all') list = list.filter((item) => item.type === type.value);
  if (status.value !== 'all') list = list.filter((item) => item.status === status.value);
  return searchRecords(list, query.value, ['code', 'title', 'owner', 'channel']);
});

function reset() {
  query.value = '';
  channel.value = 'all';
  type.value = 'all';
  status.value = 'all';
}
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Drafts"
      description="Create and move briefs before they hit review."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Drafts' }]"
    >
      <template #actions>
        <Button size="sm" icon="plus" @click="store.setBriefOpen(true)">New brief</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="In flight" :value="store.pieces.length - store.published.length" icon="bi-pencil-square" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Ideas" :value="store.pieces.filter((item) => item.status === 'idea').length" icon="bi-lightbulb" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Drafts" :value="store.pieces.filter((item) => item.status === 'draft').length" icon="bi-file-earmark" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Showing" :value="rows.length" icon="bi-funnel" tone="info" />
      </div>
    </div>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search code, owner, or title" />
      </template>
      <Select v-model="channel" label="Channel" :options="[...ALL, ...CHANNEL_OPTIONS]" />
      <Select v-model="type" label="Type" :options="[...ALL, ...TYPE_OPTIONS]" />
      <Select v-model="status" label="Status" :options="[...ALL, ...STATUS_OPTIONS]" />
    </FilterBar>

    <section class="flo-panel">
      <div class="flo-panel-body">
        <DataTable :columns="columns" :rows="rows" @row-click="(row) => router.push(`${BASE_PATH}/drafts/${row.id}`)">
          <template #status="{ value }">
            <StatusBadge :status="value" />
          </template>
          <template #publishOn="{ value }">
            {{ formatDate(value) }}
          </template>
        </DataTable>
      </div>
    </section>
  </div>
</template>
