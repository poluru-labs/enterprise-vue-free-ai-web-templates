<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { searchRecords } from '../utils/search.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useHelpdesk();

const query = computed(() => String(route.query.q || ''));

function setQuery(value) {
  router.replace(value ? { path: `${BASE_PATH}/search`, query: { q: value } } : { path: `${BASE_PATH}/search` });
}

const ticketHits = computed(() =>
  searchRecords(store.state.tickets, query.value, ['id', 'subject', 'customer', 'assignee', 'queue']),
);
const customerHits = computed(() =>
  searchRecords(store.state.customers, query.value, ['name', 'owner', 'email', 'plan']),
);
const macroHits = computed(() =>
  searchRecords(store.state.macros, query.value, ['name', 'body', 'queue']),
);
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Search"
      description="Tickets, customers, and macros across the Lumen desk."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <div class="lumen-filter-bar mb-3">
      <div class="lumen-filter-search">
        <Search
          :model-value="query"
          placeholder="Search tickets, customers, macros"
          @update:model-value="setQuery"
        />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-4">
        <ChartSection title="Tickets" :subtitle="`${ticketHits.length} matches`">
          <DataTable
            :columns="[{ key: 'id', label: 'Ticket' }, { key: 'status', label: 'Status' }]"
            :rows="ticketHits"
            empty-title="No tickets"
            @row-click="(row) => router.push(`${BASE_PATH}/tickets/${row.id}`)"
          >
            <template #status="{ value }"><StatusBadge :status="value" /></template>
          </DataTable>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Customers" :subtitle="`${customerHits.length} matches`">
          <DataTable
            :columns="[{ key: 'name', label: 'Account' }, { key: 'owner', label: 'Contact' }]"
            :rows="customerHits"
            empty-title="No customers"
            @row-click="(row) => router.push(`${BASE_PATH}/search?q=${encodeURIComponent(row.name)}`)"
          />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Macros" :subtitle="`${macroHits.length} matches`">
          <DataTable
            :columns="[{ key: 'name', label: 'Macro' }, { key: 'queue', label: 'Queue' }]"
            :rows="macroHits"
            empty-title="No macros"
            @row-click="() => router.push(`${BASE_PATH}/macros`)"
          />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
