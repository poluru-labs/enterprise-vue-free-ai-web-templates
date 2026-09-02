<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Card } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import { useFinanceStore } from '../stores/finance.js';
import { formatCurrency } from '../utils/format.js';
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

const vendors = computed(() => searchRecords(store.vendors, query.value, ['name', 'category', 'owner', 'location']));
</script>

<template>
  <div class="mint-page">
    <PageHeader
      eyebrow="Supplier ledger"
      title="Vendors"
      description="Preferred, active, and watch-list merchants Hana Poluru uses for August spend."
    />

    <Card class="mint-filters">
      <label>
        Search directory
        <input v-model="query" type="search" placeholder="CloudPoluru, travel, Austin…" />
      </label>
    </Card>

    <section class="mint-equal-grid mint-vendor-grid" aria-label="Vendor directory">
      <Card v-for="vendor in vendors" :key="vendor.id" class="mint-equal-card mint-vendor-card">
        <div class="mint-budget-card-head">
          <h3>{{ vendor.name }}</h3>
          <StatusBadge :status="vendor.status" />
        </div>
        <p class="mint-muted">{{ vendor.category }} · {{ vendor.location }}</p>
        <dl class="mint-kv">
          <div>
            <dt>YTD spend</dt>
            <dd>{{ formatCurrency(vendor.spendYtd) }}</dd>
          </div>
          <div>
            <dt>Open bills</dt>
            <dd>{{ vendor.openInvoices }}</dd>
          </div>
          <div>
            <dt>Terms</dt>
            <dd>{{ vendor.terms }}</dd>
          </div>
        </dl>
        <p class="mint-muted">Owner {{ vendor.owner }} · {{ vendor.contact }}</p>
      </Card>
    </section>
    <p v-if="!vendors.length" class="mint-empty">No vendors match that search.</p>
  </div>
</template>
