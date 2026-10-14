<script setup>
import { computed, ref } from 'vue';
import { DataTable, Meter, SegmentedControl } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useDevops } from '../stores/devops.js';
import { formatDateTime, formatPercent } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useDevops();
const band = ref('all');

const rows = computed(() => store.uptime.filter((item) => band.value === 'all' || item.status === band.value));

const tableRows = computed(() =>
  rows.value.map((item) => ({
    service: item.service,
    owner: item.owner,
    region: item.region,
    uptime: formatPercent(item.uptime),
    status: item.status,
    checked: formatDateTime(item.lastCheck),
  })),
);

const healthyShare = computed(() =>
  Math.round((store.uptime.filter((item) => item.status === 'healthy').length / Math.max(1, store.uptime.length)) * 100),
);
</script>

<template>
  <div class="tde-page">
    <PageHeader
      title="Uptime"
      description="Service checks and the incidents still open."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Uptime' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Watched" :value="store.uptime.length" icon="bi-activity" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Healthy"
          :value="store.uptime.filter((item) => item.status === 'healthy').length"
          icon="bi-check2-circle"
          tone="success"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Watch"
          :value="store.uptime.filter((item) => item.status === 'watch').length"
          icon="bi-eye"
          tone="warning"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Down"
          :value="store.uptime.filter((item) => item.status === 'down').length"
          icon="bi-exclamation-circle"
          tone="danger"
        />
      </div>
    </div>

    <div class="tde-filter-bar">
      <SegmentedControl
        v-model="band"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'healthy', label: 'Healthy' },
          { value: 'watch', label: 'Watch' },
          { value: 'down', label: 'Down' },
        ]"
      />
    </div>

    <ChartSection title="Checks" subtitle="Latest probe for each service">
      <Meter :value="healthyShare" :max="100" label="Healthy share" show-value />
      <div class="tde-table-block">
        <DataTable
          :columns="[
            { key: 'service', label: 'Service', sortable: true },
            { key: 'owner', label: 'Owner' },
            { key: 'region', label: 'Region' },
            { key: 'uptime', label: 'Uptime' },
            { key: 'status', label: 'Status' },
            { key: 'checked', label: 'Checked' },
          ]"
          :rows="tableRows"
          striped
        />
      </div>
      <div class="tde-inline-badges">
        <span v-for="item in rows" :key="item.id" class="tde-inline-link">
          {{ item.service }}
          <StatusBadge :status="item.status" />
        </span>
      </div>
    </ChartSection>
  </div>
</template>
