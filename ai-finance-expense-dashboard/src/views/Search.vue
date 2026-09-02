<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Card, EmptyState } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import { useFinanceStore } from '../stores/finance.js';
import { formatCurrency, formatDate } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';

const store = useFinanceStore();
const route = useRoute();
const query = ref('');

watch(
  () => route.query.q,
  (value) => {
    if (typeof value === 'string') query.value = value;
  },
  { immediate: true },
);

const expenses = computed(() =>
  searchRecords(store.expenses, query.value, ['description', 'vendor', 'employee', 'category']),
);
const invoices = computed(() =>
  searchRecords(store.invoices, query.value, ['invoiceNumber', 'vendor', 'owner']),
);
const vendors = computed(() => searchRecords(store.vendors, query.value, ['name', 'category', 'owner']));
const empty = computed(() => !expenses.value.length && !invoices.value.length && !vendors.value.length);
</script>

<template>
  <div class="mint-page">
    <PageHeader
      eyebrow="Ledger search"
      title="Search"
      description="Find expenses, invoices, and vendors across the August close book."
    />

    <Card class="mint-filters">
      <label>
        Query
        <input v-model="query" type="search" placeholder="Hana, CloudPoluru, INV-2026…" />
      </label>
    </Card>

    <EmptyState v-if="empty" title="No matches" description="Try a Poluru last name, a merchant, or an invoice number." icon="search" />

    <div v-else class="mint-split mint-split-3">
      <Card class="mint-panel" title="Expenses">
        <ul class="mint-stack-list">
          <li v-for="item in expenses.slice(0, 8)" :key="item.id">
            <div>
              <RouterLink class="mint-text-link" :to="`${BASE_PATH}/expenses/${item.id}`">{{ item.description }}</RouterLink>
              <span>{{ item.vendor }} · {{ formatDate(item.date) }}</span>
            </div>
            <em>{{ formatCurrency(item.amount) }}</em>
          </li>
        </ul>
      </Card>
      <Card class="mint-panel" title="Invoices">
        <ul class="mint-stack-list">
          <li v-for="item in invoices.slice(0, 8)" :key="item.id">
            <div>
              <strong>{{ item.invoiceNumber }}</strong>
              <span>{{ item.vendor }}</span>
            </div>
            <StatusBadge :status="item.status" />
          </li>
        </ul>
      </Card>
      <Card class="mint-panel" title="Vendors">
        <ul class="mint-stack-list">
          <li v-for="item in vendors.slice(0, 8)" :key="item.id">
            <div>
              <RouterLink class="mint-text-link" :to="`${BASE_PATH}/vendors?q=${encodeURIComponent(item.name)}`">
                {{ item.name }}
              </RouterLink>
              <span>{{ item.category }} · {{ item.owner }}</span>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>
