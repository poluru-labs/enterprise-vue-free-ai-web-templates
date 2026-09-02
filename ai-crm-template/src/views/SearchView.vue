<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { crm } from '../stores/crm.js';
import { searchRecords } from '../utils/search.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const query = ref(String(route.query.q || ''));

watch(
  () => route.query.q,
  (value) => {
    query.value = String(value || '');
  },
);

function syncQuery(value) {
  query.value = value;
  router.replace({ path: `${BASE_PATH}/search`, query: value ? { q: value } : {} });
}

const dealHits = computed(() => searchRecords(crm.deals, query.value, ['name', 'account', 'owner', 'stage']));
const leadHits = computed(() => searchRecords(crm.leads, query.value, ['name', 'company', 'owner']));
const accountHits = computed(() => searchRecords(crm.accounts, query.value, ['name', 'owner', 'industry']));
const contactHits = computed(() => searchRecords(crm.contacts, query.value, ['name', 'account', 'title']));
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Search"
      description="Deals, leads, accounts, and contacts in one pass."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <FilterBar :on-reset="() => syncQuery('')">
      <template #search>
        <Search :model-value="query" placeholder="Harbor, Nimbus, Priya…" @update:model-value="syncQuery" />
      </template>
    </FilterBar>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Deals" :subtitle="`${dealHits.length} matches`">
          <DataTable
            :columns="[
              { key: 'name', label: 'Deal' },
              { key: 'account', label: 'Account' },
              { key: 'value', label: 'Value' },
              { key: 'stage', label: 'Stage' },
            ]"
            :rows="dealHits"
            empty-title="No deals"
            empty-description="Try a company or owner."
            @row-click="(row) => router.push(`${BASE_PATH}/deals/${row.id}`)"
          >
            <template #stage="{ value }">
              <StatusBadge :status="value" />
            </template>
          </DataTable>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Leads" :subtitle="`${leadHits.length} matches`">
          <DataTable
            :columns="[
              { key: 'name', label: 'Lead' },
              { key: 'company', label: 'Company' },
              { key: 'status', label: 'Status' },
            ]"
            :rows="leadHits"
            empty-title="No leads"
            empty-description="Try a first name."
            @row-click="() => router.push(`${BASE_PATH}/leads`)"
          >
            <template #status="{ value }">
              <StatusBadge :status="value" />
            </template>
          </DataTable>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-6">
        <ChartSection title="Accounts" :subtitle="`${accountHits.length} matches`">
          <DataTable
            :columns="[
              { key: 'name', label: 'Account' },
              { key: 'industry', label: 'Industry' },
              { key: 'health', label: 'Health' },
            ]"
            :rows="accountHits"
            empty-title="No accounts"
            @row-click="(row) => router.push(`${BASE_PATH}/accounts/${row.id}`)"
          >
            <template #health="{ value }">
              <StatusBadge :status="value" />
            </template>
          </DataTable>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-6">
        <ChartSection title="Contacts" :subtitle="`${contactHits.length} matches`">
          <DataTable
            :columns="[
              { key: 'name', label: 'Contact' },
              { key: 'title', label: 'Title' },
              { key: 'account', label: 'Account' },
            ]"
            :rows="contactHits"
            empty-title="No contacts"
            @row-click="(row) => router.push(`${BASE_PATH}/accounts/${row.accountId}`)"
          />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
