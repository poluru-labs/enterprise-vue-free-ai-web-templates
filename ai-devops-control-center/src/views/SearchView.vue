<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Card, EmptyState, List, Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useDevops } from '../stores/devops.js';
import { searchRecords } from '../utils/search.js';
import PageHeader from '../components/widgets/PageHeader.vue';

const route = useRoute();
const router = useRouter();
const store = useDevops();
const query = ref(typeof route.query.q === 'string' ? route.query.q : '');

watch(
  () => route.query.q,
  (value) => {
    query.value = typeof value === 'string' ? value : '';
  },
);

const pipelines = computed(() => searchRecords(store.pipelines, query.value, ['name', 'owner', 'service', 'environment', 'branch']));
const deploys = computed(() => searchRecords(store.deployments, query.value, ['service', 'owner', 'environment', 'note', 'version']));
const infra = computed(() => searchRecords(store.infra, query.value, ['name', 'owner', 'kind', 'region', 'note']));
const total = computed(() => pipelines.value.length + deploys.value.length + infra.value.length);
</script>

<template>
  <div class="tde-page">
    <PageHeader
      title="Search"
      description="Find a pipeline, a deploy, or a piece of infrastructure."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <div class="tde-search-lg">
      <Search v-model="query" size="lg" placeholder="Try payments, Kavya Poluru, or queue" clearable />
    </div>

    <EmptyState
      v-if="query && !total"
      title="No matches"
      description="Try a service name or an owner ending in Poluru."
      icon="search"
    />

    <div v-else class="row g-3">
      <div class="col-12 col-lg-4">
        <Card title="Pipelines" :description="`${pipelines.length} found`">
          <List
            :items="pipelines.slice(0, 6).map((item) => ({ id: item.id, label: item.name, description: item.owner, icon: 'refresh' }))"
            divided
          />
          <button v-if="pipelines[0]" type="button" class="tde-text-btn" @click="router.push(`${BASE_PATH}/pipelines/${pipelines[0].id}`)">
            Open {{ pipelines[0].name }}
          </button>
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card title="Deployments" :description="`${deploys.length} found`">
          <List
            :items="deploys.slice(0, 6).map((item) => ({ id: item.id, label: item.service, description: item.status, icon: 'upload' }))"
            divided
          />
          <button v-if="deploys.length" type="button" class="tde-text-btn" @click="router.push(`${BASE_PATH}/deployments`)">
            Open deployments
          </button>
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card title="Infrastructure" :description="`${infra.length} found`">
          <List
            :items="infra.slice(0, 6).map((item) => ({ id: item.id, label: item.name, description: item.owner, icon: 'alert-triangle' }))"
            divided
          />
        </Card>
      </div>
    </div>
  </div>
</template>
