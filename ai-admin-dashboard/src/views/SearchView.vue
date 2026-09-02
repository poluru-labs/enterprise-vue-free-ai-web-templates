<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useWorkspace } from '../stores/workspace.js';
import { searchRecords } from '../utils/search.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useWorkspace();

const query = computed(() => String(route.query.q || ''));

function setQuery(value) {
  router.replace(value ? { path: `${BASE_PATH}/search`, query: { q: value } } : { path: `${BASE_PATH}/search` });
}

const tenantHits = computed(() => searchRecords(store.state.tenants, query.value, ['name', 'owner', 'slug', 'plan']));
const memberHits = computed(() => searchRecords(store.state.members, query.value, ['name', 'email', 'org', 'role']));
const flagHits = computed(() => searchRecords(store.state.featureFlags, query.value, ['name', 'description', 'owner']));
</script>

<template>
  <div class="hbr-page">
    <PageHeader
      title="Search"
      description="Tenants, members, and flags across the Harbor control plane."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <div class="hbr-filter-bar mb-3">
      <div class="hbr-filter-search">
        <Search
          :model-value="query"
          placeholder="Search tenants, members, flags"
          @update:model-value="setQuery"
        />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-4">
        <ChartSection title="Tenants" :subtitle="`${tenantHits.length} matches`">
          <DataTable
            :columns="[{ key: 'name', label: 'Tenant' }, { key: 'status', label: 'Status' }]"
            :rows="tenantHits"
            empty-title="No tenants"
            @row-click="(row) => router.push(`${BASE_PATH}/tenants/${row.id}`)"
          >
            <template #status="{ value }"><StatusBadge :status="value" /></template>
          </DataTable>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Members" :subtitle="`${memberHits.length} matches`">
          <DataTable
            :columns="[{ key: 'name', label: 'Person' }, { key: 'org', label: 'Tenant' }]"
            :rows="memberHits"
            empty-title="No members"
            @row-click="(row) => router.push(`${BASE_PATH}/tenants/${row.orgId}`)"
          />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Flags" :subtitle="`${flagHits.length} matches`">
          <DataTable
            :columns="[{ key: 'name', label: 'Flag' }, { key: 'status', label: 'Status' }]"
            :rows="flagHits"
            empty-title="No flags"
            @row-click="() => router.push(`${BASE_PATH}/flags`)"
          >
            <template #status="{ value }"><StatusBadge :status="value" /></template>
          </DataTable>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
