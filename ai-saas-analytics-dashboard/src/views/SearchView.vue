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
  <div class="pulse-page">
    <PageHeader
      eyebrow="Search"
      title="Find anything in Pulse"
      description="Metrics, requests, experiments, playbooks, and inbox."
    />

    <div class="pulse-search-lg">
      <Search v-model="query" placeholder="Search metrics, cohorts, requests…" />
    </div>

    <EmptyState
      v-if="query && !resultCount"
      title="No matches"
      description="Try MRR, Northwind, or trial-to-paid."
      icon="search"
    />

    <div v-else class="pulse-grid-2 pulse-mt-lg">
      <Card title="Metrics">
        <List
          :items="results.kpis.map((item) => ({ id: item.id, label: item.label, description: `${item.value} · ${item.hint}` }))"
          divided
        />
      </Card>
      <Card title="Requests">
        <List
          :items="results.requests.map((item) => ({ id: item.id, label: item.title, description: `${item.owner} · ${item.status}` }))"
          divided
        />
        <button type="button" class="pulse-text-btn" @click="goto('/requests')">Open requests</button>
      </Card>
      <Card title="Experiments">
        <List
          :items="results.experiments.map((item) => ({ id: item.id, label: item.title, description: `${item.owner} · ${item.lift}` }))"
          divided
        />
      </Card>
      <Card title="Playbooks & inbox">
        <List
          :items="[
            ...results.playbooks.map((item) => ({ id: item.id, label: item.title, description: item.content })),
            ...results.notifications.map((item) => ({ id: `n-${item.id}`, label: item.title, description: item.body })),
          ]"
          divided
        />
      </Card>
    </div>
  </div>
</template>
