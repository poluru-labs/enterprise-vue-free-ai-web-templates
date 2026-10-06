<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Card, Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useContent } from '../stores/content.js';
import { searchRecords } from '../utils/search.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useContent();
const query = computed({
  get: () => String(route.query.q || ''),
  set: (value) => router.replace({ query: value ? { q: value } : {} }),
});

const pieces = computed(() =>
  searchRecords(store.pieces, query.value, ['title', 'code', 'owner', 'channel', 'campaign']),
);
const channels = computed(() => searchRecords(store.channels, query.value, ['name', 'owner']));
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Search"
      description="Find a brief, review, or channel across the Folio desk."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <Search v-model="query" placeholder="Search Folio" class="mb-4" />

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <Card title="Pieces">
          <ul class="flo-note-list">
            <li v-for="item in pieces" :key="item.id">
              <i class="bi bi-dot" />
              <button type="button" class="flo-text-link" @click="router.push(`${BASE_PATH}/drafts/${item.id}`)">
                {{ item.code }} · {{ item.title }}
                <span class="flo-subtle d-block">{{ item.owner }}</span>
              </button>
              <StatusBadge :status="item.status" />
            </li>
          </ul>
        </Card>
      </div>
      <div class="col-12 col-xl-5">
        <Card title="Channels">
          <ul class="flo-note-list">
            <li v-for="item in channels" :key="item.id">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.name }}</strong>
                <p class="flo-subtle mb-0">{{ item.owner }}</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  </div>
</template>
