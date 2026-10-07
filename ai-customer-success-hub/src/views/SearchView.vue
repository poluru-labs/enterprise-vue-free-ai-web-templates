<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Card, EmptyState, List, Search } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useSuccess } from '../stores/success.js';
import { searchRecords } from '../utils/search.js';
import PageHeader from '../components/widgets/PageHeader.vue';

const route = useRoute();
const router = useRouter();
const store = useSuccess();
const query = ref(typeof route.query.q === 'string' ? route.query.q : '');

watch(
  () => route.query.q,
  (value) => {
    query.value = typeof value === 'string' ? value : '';
  },
);

const accounts = computed(() => searchRecords(store.accounts, query.value, ['name', 'owner', 'segment', 'region']));
const renewals = computed(() => searchRecords(store.renewals, query.value, ['account', 'owner', 'stage', 'note']));
const activities = computed(() => searchRecords(store.activities, query.value, ['title', 'account', 'owner', 'note']));
const total = computed(() => accounts.value.length + renewals.value.length + activities.value.length);
</script>

<template>
  <div class="mrg-page">
    <PageHeader
      title="Search"
      description="Find an account, renewal, or success note."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <div class="mrg-search-lg">
      <Search v-model="query" size="lg" placeholder="Try Brightline, Kavya Poluru, or QBR" clearable />
    </div>

    <EmptyState
      v-if="query && !total"
      title="No matches"
      description="Try an account name or an owner ending in Poluru."
      icon="search"
    />

    <div v-else class="row g-3">
      <div class="col-12 col-lg-4">
        <Card title="Accounts" :description="`${accounts.length} found`">
          <List
            :items="accounts.slice(0, 6).map((item) => ({ id: item.id, label: item.name, description: item.owner, icon: 'user' }))"
            divided
          />
          <button v-if="accounts[0]" type="button" class="mrg-text-btn" @click="router.push(`/success/accounts/${accounts[0].id}`)">
            Open {{ accounts[0].name }}
          </button>
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card title="Renewals" :description="`${renewals.length} found`">
          <List
            :items="renewals.slice(0, 6).map((item) => ({ id: item.id, label: item.account, description: item.stage, icon: 'calendar' }))"
            divided
          />
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card title="Activities" :description="`${activities.length} found`">
          <List
            :items="activities.slice(0, 6).map((item) => ({ id: item.id, label: item.title, description: item.owner, icon: 'clock' }))"
            divided
          />
        </Card>
      </div>
    </div>
  </div>
</template>
