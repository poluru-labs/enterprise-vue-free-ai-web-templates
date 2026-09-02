<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Badge, Button, EmptyState, Search, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import catalog from '../data/search.json';
import { highlightSnippet, matchesQuery, normalizeQuery } from '../utils/search.js';
import { formatPercent } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';

const route = useRoute();
const router = useRouter();
const query = ref(String(route.query.q || ''));

watch(
  () => route.query.q,
  (value) => {
    query.value = String(value || '');
  },
);

const hits = computed(() => {
  const needle = normalizeQuery(query.value);
  if (!needle) return catalog.hits;
  return catalog.hits.filter((hit) =>
    matchesQuery(`${hit.title} ${hit.snippet} ${hit.owner} ${hit.space}`, needle),
  );
});

function snippetParts(hit) {
  const result = highlightSnippet(hit.snippet, query.value);
  if (typeof result === 'string') return { before: result, match: '', after: '' };
  return result;
}

function applySuggested(term) {
  query.value = term;
  router.replace({ path: `${BASE_PATH}/search`, query: { q: term } });
}

function openHit(hit) {
  router.push(`${BASE_PATH}/articles/${hit.articleId}`);
}
</script>

<template>
  <div class="atlas-page">
    <PageHeader
      title="Search Atlas"
      description="Find a page across Engineering, People, Legal, GTM, Finance, and Security."
    />

    <section class="atlas-panel mb-3">
      <Search v-model="query" placeholder="Ask about leave, severity-1, expenses, encryption…" />
      <div class="atlas-type-row mt-3">
        <button
          v-for="term in catalog.suggested"
          :key="term"
          type="button"
          class="atlas-chip"
          @click="applySuggested(term)"
        >
          {{ term }}
        </button>
      </div>
    </section>

    <div v-if="hits.length" class="row g-3">
      <div v-for="hit in hits" :key="hit.id" class="col-12">
        <article class="atlas-panel atlas-hit" @click="openHit(hit)">
          <div class="atlas-panel-head">
            <h2>{{ hit.title }}</h2>
            <Badge :label="formatPercent(hit.score * 100, 0)" variant="brand" />
          </div>
          <p class="atlas-hit-snippet">
            <template v-if="snippetParts(hit).match">
              {{ snippetParts(hit).before }}<mark>{{ snippetParts(hit).match }}</mark>{{ snippetParts(hit).after }}
            </template>
            <template v-else>{{ hit.snippet }}</template>
          </p>
          <div class="atlas-type-row">
            <Tag :label="hit.space" variant="brand" />
            <span class="atlas-muted">{{ hit.owner }}</span>
          </div>
        </article>
      </div>
    </div>
    <EmptyState
      v-else
      title="No matching pages"
      description="Try a suggested query or clear the search."
      icon="search"
    >
      <Button variant="secondary" @click="query = ''">Clear query</Button>
    </EmptyState>
  </div>
</template>
