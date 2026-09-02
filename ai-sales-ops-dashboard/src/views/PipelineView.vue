<script setup>
import { computed } from 'vue';
import {
  Button,
  Card,
  DataTable,
  EmptyState,
  Pagination,
  Search,
  SegmentedControl,
  Select,
  Status,
  Tabs,
} from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import PipelineChart from '../components/charts/PipelineChart.vue';
import { DEAL_COLUMNS, PIPELINE_STAGE_TABS } from '../constants/theme.js';
import { useQuotaStore } from '../stores/quota.js';
import { useDeals } from '../composables/useDeals.js';
import { useDateRange } from '../composables/useDateRange.js';
import { statusTone } from '../utils/status.js';

const { state, ownerFilterOptions } = useQuotaStore();
const { filteredDeals, pagedDeals, exportDealsCsv } = useDeals();
const { range, segments } = useDateRange();

const stageTab = computed({
  get: () => state.stageTab,
  set: (value) => {
    state.stageTab = value;
    state.page = 1;
  },
});

const ownerFilter = computed({
  get: () => state.ownerFilter,
  set: (value) => {
    state.ownerFilter = value;
    state.page = 1;
  },
});

const page = computed({
  get: () => state.page,
  set: (value) => {
    state.page = value;
  },
});

const query = computed({
  get: () => state.query,
  set: (value) => {
    state.query = value;
    state.page = 1;
  },
});

const pageCount = computed(() => Math.max(1, Math.ceil(filteredDeals.value.length / state.perPage)));

const tableRows = computed(() =>
  pagedDeals.value.map((deal) => ({
    ...deal,
    nextStep: deal.nextStep || 'Missing',
  })),
);
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Pipeline"
      title="$4.86M open"
      description="Stage mix and weighted pipeline. Harbor Labs and Fieldwork Co hold commit."
    >
      <template #actions>
        <Button icon="download" variant="secondary" :disabled="!filteredDeals.length" @click="exportDealsCsv">
          Export CSV
        </Button>
      </template>
    </PageHeader>

    <Card class="quota-mb-lg" title="Pipeline pulse" description="Monthly weighted pipeline">
      <div class="quota-row quota-row-between quota-mb">
        <SegmentedControl v-model="range" :segments="segments" />
      </div>
      <PipelineChart />
    </Card>

    <EqualHeightGrid :columns="5" label="Pipeline stages">
      <Card v-for="stage in state.pipelineStages" :key="stage.id" class-name="quota-eq-card">
        <div class="quota-card-fill">
          <span class="quota-eyebrow">{{ stage.deals }} deals</span>
          <strong>{{ stage.label }}</strong>
          <p class="quota-big">{{ stage.value }}</p>
        </div>
      </Card>
    </EqualHeightGrid>

    <Card class="quota-mt-lg" title="Open deals">
      <div class="quota-toolbar">
        <Tabs v-model="stageTab" :items="PIPELINE_STAGE_TABS" />
        <div class="quota-toolbar-end">
          <div class="quota-search-sm">
            <Search v-model="query" placeholder="Search deals" />
          </div>
          <Select v-model="ownerFilter" :options="ownerFilterOptions" />
        </div>
      </div>

      <EmptyState
        v-if="!filteredDeals.length"
        title="No deals found"
        description="Try another stage or clear search."
        icon="search"
      />
      <template v-else>
        <DataTable :columns="DEAL_COLUMNS" :rows="tableRows" sortable striped>
          <template #cell-stage="{ row }">
            <Status :label="row.stage" :tone="statusTone(row.stage)" />
          </template>
        </DataTable>
        <div class="quota-pagination">
          <Pagination v-model:page="page" :page-count="pageCount" />
        </div>
      </template>
    </Card>
  </div>
</template>
