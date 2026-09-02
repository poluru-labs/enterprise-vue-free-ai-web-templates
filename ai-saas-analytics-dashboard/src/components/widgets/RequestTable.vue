<script setup>
import { computed } from 'vue';
import {
  Button,
  DataTable,
  EmptyState,
  Pagination,
  Search,
  Select,
  Tabs,
} from '@poluru-labs/enterprise-design-system-vue';
import { REQUEST_COLUMNS, REQUEST_TABS } from '../../constants/theme.js';
import { usePulseStore } from '../../stores/pulse.js';
import { useRequests } from '../../composables/useRequests.js';

const { state } = usePulseStore();
const { filteredRequests, pagedRequests, exportRequestsCsv, ownerFilterOptions } = useRequests();

const requestTab = computed({
  get: () => state.requestTab,
  set: (value) => {
    state.requestTab = value;
    state.page = 1;
  },
});

const ownerFilter = computed({
  get: () => state.ownerFilter,
  set: (value) => {
    state.ownerFilter = value;
    state.page = 1;
  },
});

const page = computed({
  get: () => state.page,
  set: (value) => {
    state.page = value;
  },
});

const query = computed({
  get: () => state.query,
  set: (value) => {
    state.query = value;
    state.page = 1;
  },
});

const pageCount = computed(() => Math.max(1, Math.ceil(filteredRequests.value.length / state.perPage)));
</script>

<template>
  <div class="pulse-request-table">
    <div class="pulse-toolbar">
      <Tabs v-model="requestTab" :items="REQUEST_TABS" />
      <div class="pulse-toolbar-end">
        <div class="pulse-search-sm">
          <Search v-model="query" placeholder="Search requests" />
        </div>
        <Select v-model="ownerFilter" :options="ownerFilterOptions" />
        <Button icon="download" variant="secondary" :disabled="!filteredRequests.length" @click="exportRequestsCsv">
          Export CSV
        </Button>
        <Button icon="plus" variant="secondary" @click="state.requestOpen = true">Add request</Button>
      </div>
    </div>

    <EmptyState
      v-if="!filteredRequests.length"
      title="No requests found"
      description="Try another tab or clear search."
      icon="search"
    />
    <template v-else>
      <DataTable :columns="REQUEST_COLUMNS" :rows="pagedRequests" sortable striped />
      <div class="pulse-pagination">
        <Pagination v-model:page="page" :page-count="pageCount" />
      </div>
    </template>
  </div>
</template>
