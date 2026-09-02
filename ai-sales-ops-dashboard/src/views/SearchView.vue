<script setup>
import { Card, EmptyState, List, Search } from '@poluru-labs/enterprise-design-system-vue';
import { useRouter } from 'vue-router';
import PageHeader from '../components/widgets/PageHeader.vue';
import { useSearch } from '../composables/useSearch.js';

const router = useRouter();
const { query, results, resultCount } = useSearch();

function goto(path) {
  router.push(path);
}
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Search"
      title="Find anything in Quota"
      description="Deals, coverage, playbooks, team, and inbox."
    />

    <div class="quota-search-lg">
      <Search v-model="query" placeholder="Search deals, hygiene, playbooks…" />
    </div>

    <EmptyState
      v-if="query && !resultCount"
      title="No matches"
      description="Try Harbor Labs, commit, or Nimbus Retail."
      icon="search"
    />

    <div v-else class="quota-grid-2 quota-mt-lg">
      <Card title="Metrics">
        <List
          :items="results.kpis.map((item) => ({ id: item.id, label: item.label, description: `${item.value} · ${item.hint}` }))"
          divided
        />
      </Card>
      <Card title="Deals">
        <List
          :items="results.deals.map((item) => ({ id: item.id, label: item.account, description: `${item.amount} · ${item.owner} · ${item.stage}` }))"
          divided
        />
        <button type="button" class="quota-text-btn" @click="goto('/pipeline')">Open pipeline</button>
      </Card>
      <Card title="Playbooks">
        <List
          :items="results.playbooks.map((item) => ({ id: item.id, label: item.title, description: item.content }))"
          divided
        />
      </Card>
      <Card title="Team & inbox">
        <List
          :items="[
            ...results.teams.map((item) => ({ id: item.id, label: item.name, description: `${item.pipeline} · ${item.quota}% quota` })),
            ...results.notifications.map((item) => ({ id: `n-${item.id}`, label: item.title, description: item.body })),
          ]"
          divided
        />
      </Card>
    </div>
  </div>
</template>
