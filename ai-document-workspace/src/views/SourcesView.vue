<script setup>
import { Badge, ProgressBar, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { STORAGE_USED } from '../constants/navigation.js';
import sources from '../data/sources.json';
import { formatNumber } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import BarChart from '../components/charts/BarChart.vue';

const connected = sources.filter((source) => source.status === 'Connected').length;
</script>

<template>
  <div class="vault-page">
    <PageHeader
      title="Sources"
      description="Connected drives, wikis, and chat archives that feed the vault."
    />

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-8">
        <ChartSection title="Storage & sources" hint="Shared 2.4 TB vault">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="vault-muted">Capacity</span>
            <Badge :label="`${connected} connected`" variant="brand" />
          </div>
          <ProgressBar :value="STORAGE_USED" :max="100" label="Storage used" show-value />
          <div class="vault-type-row mt-3">
            <Tag v-for="source in sources" :key="source.id" :label="source.name" variant="neutral" />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Documents by source">
          <BarChart
            :labels="sources.map((s) => s.name.split(' ')[0])"
            :values="sources.map((s) => s.docs)"
          />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div v-for="source in sources" :key="source.id" class="col-12 col-md-6 col-xl-4">
        <article class="vault-panel">
          <div class="vault-panel-head">
            <h2>{{ source.name }}</h2>
            <StatusBadge :label="source.status" />
          </div>
          <p class="vault-stat-value vault-stat-value-sm">{{ formatNumber(source.docs) }}</p>
          <span class="vault-stat-hint">documents · {{ source.owner }}</span>
          <p class="vault-muted mt-2 mb-0">Last sync {{ source.lastSync }}</p>
        </article>
      </div>
    </div>
  </div>
</template>
