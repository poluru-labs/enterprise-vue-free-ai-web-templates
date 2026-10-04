<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Card, EmptyState, List, Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { searchRecords } from '../utils/search.js';
import PageHeader from '../components/widgets/PageHeader.vue';

const route = useRoute();
const router = useRouter();
const store = useCompliance();
const query = ref(String(route.query.q || ''));

watch(
  () => route.query.q,
  (value) => {
    query.value = String(value || '');
  },
);

const groups = computed(() => [
  {
    title: 'Controls',
    items: searchRecords(store.controls, query.value, ['title', 'code', 'owner']).map((item) => ({
      id: item.id,
      label: `${item.code} · ${item.title}`,
      description: item.owner,
      to: `${BASE_PATH}/controls/${item.id}`,
    })),
  },
  {
    title: 'Audits',
    items: searchRecords(store.audits, query.value, ['name', 'lead', 'firm']).map((item) => ({
      id: item.id,
      label: item.name,
      description: item.lead,
      to: `${BASE_PATH}/audits/${item.id}`,
    })),
  },
  {
    title: 'Risks',
    items: searchRecords(store.risks, query.value, ['title', 'owner']).map((item) => ({
      id: item.id,
      label: item.title,
      description: item.owner,
      to: `${BASE_PATH}/risks`,
    })),
  },
].filter((group) => group.items.length));

function go(item) {
  router.push(item.to);
}
</script>

<template>
  <div class="aeg-page">
    <PageHeader
      title="Search"
      description="Find a control, audit, or risk across the Aegis desk."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <Search v-model="query" placeholder="Search Kavya, retention, SOC 2…" class="mb-3" />

    <EmptyState
      v-if="query && !groups.length"
      title="No matches"
      description="Try a control code, owner, or framework name."
    />

    <div v-else class="row g-3">
      <div v-for="group in groups" :key="group.title" class="col-12 col-xl-4">
        <Card :title="group.title">
          <List :items="group.items" divided @select="go" />
        </Card>
      </div>
    </div>
  </div>
</template>
