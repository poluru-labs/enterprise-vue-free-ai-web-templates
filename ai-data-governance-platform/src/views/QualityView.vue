<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { DataTable, Meter, SegmentedControl } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useGovernance } from '../stores/governance.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useGovernance();
const band = ref('all');

const rows = computed(() =>
  store.quality.filter((item) => band.value === 'all' || item.status === band.value),
);

const tableRows = computed(() =>
  rows.value.map((item) => ({
    asset: item.asset,
    check: item.check,
    owner: item.owner,
    score: item.score,
    status: item.status,
    ran: formatDate(item.ran),
  })),
);

const passingShare = computed(() =>
  Math.round((store.quality.filter((item) => item.status === 'passing').length / Math.max(1, store.quality.length)) * 100),
);
</script>

<template>
  <div class="cbt-page">
    <PageHeader
      title="Quality"
      description="Freshness, completeness, and the checks that failed this week."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Quality' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Checks" :value="store.quality.length" icon="bi-clipboard-check" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Passing"
          :value="store.quality.filter((item) => item.status === 'passing').length"
          icon="bi-check2-circle"
          tone="success"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Watch"
          :value="store.quality.filter((item) => item.status === 'watch').length"
          icon="bi-eye"
          tone="warning"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Failing"
          :value="store.quality.filter((item) => item.status === 'failing').length"
          icon="bi-exclamation-circle"
          tone="danger"
        />
      </div>
    </div>

    <div class="cbt-filter-bar">
      <SegmentedControl
        v-model="band"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'passing', label: 'Passing' },
          { value: 'watch', label: 'Watch' },
          { value: 'failing', label: 'Failing' },
        ]"
      />
    </div>

    <ChartSection title="Check table" subtitle="Scores from the latest run">
      <Meter :value="passingShare" :max="100" label="Passing share" show-value />
      <div class="cbt-table-block">
        <DataTable
          :columns="[
            { key: 'asset', label: 'Asset', sortable: true },
            { key: 'check', label: 'Check' },
            { key: 'owner', label: 'Owner' },
            { key: 'score', label: 'Score', sortable: true },
            { key: 'status', label: 'Status' },
            { key: 'ran', label: 'Ran' },
          ]"
          :rows="tableRows"
          striped
        />
      </div>
      <div class="cbt-inline-badges">
        <button
          v-for="item in rows.slice(0, 4)"
          :key="item.id"
          type="button"
          class="cbt-inline-link"
          @click="router.push(`${BASE_PATH}/catalog/${item.assetId}`)"
        >
          {{ item.asset }}
          <StatusBadge :status="item.status" />
        </button>
      </div>
    </ChartSection>
  </div>
</template>
