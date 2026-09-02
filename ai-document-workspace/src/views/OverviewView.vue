<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Alert,
  Avatar,
  Button,
  DropdownMenu,
  MenuItem,
  Status,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import overview from '../data/overview.json';
import activity from '../data/activity.json';
import { useDocuments } from '../stores/documents.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';

const router = useRouter();
const { state, reviewAction, openUpload } = useDocuments();
const showBanner = ref(true);
</script>

<template>
  <div class="vault-page">
    <PageHeader
      title="Vault overview"
      description="Ingest, review, and retrieve documents with citations and owners."
    >
      <template #actions>
        <Button variant="secondary" icon="refresh" icon-only accessible-label="Refresh" />
        <Button class-name="vault-btn-accent" icon="upload" @click="openUpload">New document</Button>
      </template>
    </PageHeader>

    <Alert
      v-if="showBanner"
      class="mb-4"
      variant="info"
      title="New: citation-aware search"
      message="Answers now link back to the exact source paragraph. Try it from the Search tab."
      dismissible
      @dismiss="showBanner = false"
    />

    <div class="row g-3 mb-3">
      <div v-for="kpi in overview.kpis" :key="kpi.id" class="col-12 col-sm-6 col-xl-4 col-xxl-2">
        <StatCard v-bind="kpi" />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-8">
        <ChartSection title="Weekly ingest" hint="Documents landed vs cited answers">
          <AreaChart :labels="overview.ingest.labels" :series="overview.ingest.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Library mix" hint="Share by type">
          <DonutChart :items="overview.typeMix" center-label="Types" center-value="100%" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <section class="vault-panel">
          <div class="vault-panel-head">
            <h2>Recent activity</h2>
          </div>
          <div class="vault-panel-body">
            <Timeline :items="activity" />
          </div>
        </section>
      </div>
      <div class="col-12 col-xl-6">
        <section class="vault-panel">
          <div class="vault-panel-head">
            <h2>Review queue</h2>
            <Button variant="tertiary" @click="router.push(`${BASE_PATH}/reviews`)">View all</Button>
          </div>
          <ul class="vault-review-list">
            <li v-for="item in state.reviews.slice(0, 3)" :key="item.id" class="vault-review-item">
              <Avatar :name="item.name" size="sm" />
              <div class="vault-review-body">
                <strong>{{ item.name }}</strong>
                <span>{{ item.task }}</span>
              </div>
              <Status :label="item.due" :tone="item.tone" />
              <DropdownMenu placement="left">
                <template #trigger>
                  <Button variant="tertiary" icon="more-horizontal" icon-only accessible-label="Row actions" />
                </template>
                <MenuItem label="Approve" @select="reviewAction(item, 'Approved', 'success')" />
                <MenuItem label="Reassign" @select="reviewAction(item, 'Reassigned', 'info')" />
                <MenuItem label="Remove" danger @select="reviewAction(item, 'Removed from queue', 'warning')" />
              </DropdownMenu>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
