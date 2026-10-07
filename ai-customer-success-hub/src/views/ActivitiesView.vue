<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Accordion, List, Search, Select, Timeline } from '@poluru-labs/enterprise-design-system-vue';
import { ACTIVITY_OPTIONS, BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useSuccess } from '../stores/success.js';
import { formatDateTime } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useSuccess();
const query = ref('');
const type = ref('all');

const rows = computed(() =>
  store.activities.filter((item) => {
    const matchesType = type.value === 'all' || item.type === type.value;
    const haystack = `${item.title} ${item.account} ${item.owner} ${item.note}`.toLowerCase();
    const matchesQuery = !query.value || haystack.includes(query.value.trim().toLowerCase());
    return matchesType && matchesQuery;
  }),
);

const timeline = computed(() =>
  rows.value.slice(0, 6).map((item) => ({
    title: item.title,
    description: `${item.account} · ${item.owner}`,
    time: formatDateTime(item.when),
  })),
);
</script>

<template>
  <div class="mrg-page">
    <PageHeader
      title="Activities"
      description="QBRs, health checks, training, and executive notes."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Activities' }]"
    />

    <div class="mrg-filter-bar">
      <Search v-model="query" placeholder="Search notes" clearable />
      <Select v-model="type" label="Type" :options="ACTIVITY_OPTIONS" />
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Notes" :subtitle="`${rows.length} in view`">
          <div class="mrg-activity-list">
            <article v-for="item in rows" :key="item.id" class="mrg-activity">
              <div>
                <button type="button" class="mrg-text-btn" @click="router.push(`${BASE_PATH}/accounts/${item.accountId}`)">
                  {{ item.title }}
                </button>
                <p class="mb-1">{{ item.note }}</p>
                <span class="mrg-subtle">{{ item.account }} · {{ item.owner }} · {{ formatDateTime(item.when) }}</span>
              </div>
              <StatusBadge :status="item.type" />
            </article>
          </div>
          <Accordion
            class="mt-3"
            :items="rows.slice(0, 3).map((item) => ({ id: item.id, title: item.title, content: item.note }))"
          />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Sequence" subtitle="Newest first">
          <Timeline :items="timeline" />
          <List
            class="mt-3"
            divided
            :items="rows.slice(0, 5).map((item) => ({
              id: item.id,
              label: item.account,
              description: item.owner,
              icon: 'clock',
            }))"
          />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
