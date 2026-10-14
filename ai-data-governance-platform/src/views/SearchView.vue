<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Card, EmptyState, List, Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useGovernance } from '../stores/governance.js';
import { searchRecords } from '../utils/search.js';
import PageHeader from '../components/widgets/PageHeader.vue';

const route = useRoute();
const router = useRouter();
const store = useGovernance();
const query = ref(typeof route.query.q === 'string' ? route.query.q : '');

watch(
  () => route.query.q,
  (value) => {
    query.value = typeof value === 'string' ? value : '';
  },
);

const assets = computed(() => searchRecords(store.assets, query.value, ['name', 'owner', 'domain', 'system', 'classification']));
const policies = computed(() => searchRecords(store.policies, query.value, ['title', 'owner', 'domain', 'summary']));
const requests = computed(() => searchRecords(store.requests, query.value, ['asset', 'requester', 'owner', 'purpose']));
const total = computed(() => assets.value.length + policies.value.length + requests.value.length);
</script>

<template>
  <div class="cbt-page">
    <PageHeader
      title="Search"
      description="Find an asset, a policy, or an access request."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <div class="cbt-search-lg">
      <Search v-model="query" size="lg" placeholder="Try payments, Kavya Poluru, or retention" clearable />
    </div>

    <EmptyState
      v-if="query && !total"
      title="No matches"
      description="Try an asset name or an owner ending in Poluru."
      icon="search"
    />

    <div v-else class="row g-3">
      <div class="col-12 col-lg-4">
        <Card title="Assets" :description="`${assets.length} found`">
          <List
            :items="assets.slice(0, 6).map((item) => ({ id: item.id, label: item.name, description: item.owner, icon: 'folder' }))"
            divided
          />
          <button v-if="assets[0]" type="button" class="cbt-text-btn" @click="router.push(`${BASE_PATH}/catalog/${assets[0].id}`)">
            Open {{ assets[0].name }}
          </button>
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card title="Policies" :description="`${policies.length} found`">
          <List
            :items="policies.slice(0, 6).map((item) => ({ id: item.id, label: item.title, description: item.owner, icon: 'file' }))"
            divided
          />
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card title="Access" :description="`${requests.length} found`">
          <List
            :items="requests.slice(0, 6).map((item) => ({ id: item.id, label: item.asset, description: item.requester, icon: 'lock' }))"
            divided
          />
          <button v-if="requests.length" type="button" class="cbt-text-btn" @click="router.push(`${BASE_PATH}/access`)">
            Open access
          </button>
        </Card>
      </div>
    </div>
  </div>
</template>
