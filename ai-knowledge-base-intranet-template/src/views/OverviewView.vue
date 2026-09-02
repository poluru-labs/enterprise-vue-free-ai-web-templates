<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Alert, Button, Timeline } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import overview from '../data/overview.json';
import activity from '../data/activity.json';
import { useIntranet } from '../stores/intranet.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';

const router = useRouter();
const { state, openPublish } = useIntranet();
const showBanner = ref(true);
</script>

<template>
  <div class="atlas-page">
    <PageHeader
      title="Atlas overview"
      description="Six team spaces, one company intranet — articles, how-tos, and policies Internal Comms can actually keep current."
    >
      <template #actions>
        <Button variant="secondary" icon="refresh" icon-only accessible-label="Refresh" />
        <Button class-name="atlas-btn-accent" icon="plus" @click="openPublish">Publish article</Button>
      </template>
    </PageHeader>

    <Alert
      v-if="showBanner"
      class="mb-4"
      variant="info"
      title="Space switcher is live"
      message="Use the lime tabs under the olive bar to jump Engineering, People, Legal, or GTM without leaving the header."
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
        <ChartSection title="Weekly reads" hint="Intranet opens vs searches">
          <AreaChart :labels="overview.reads.labels" :series="overview.reads.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Space mix" hint="Share of published pages">
          <DonutChart :items="overview.spaceMix" center-label="Spaces" center-value="6" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <section class="atlas-panel">
          <div class="atlas-panel-head">
            <h2>Recent activity</h2>
          </div>
          <div class="atlas-panel-body">
            <Timeline :items="activity" />
          </div>
        </section>
      </div>
      <div class="col-12 col-xl-6">
        <section class="atlas-panel">
          <div class="atlas-panel-head">
            <h2>Needs an owner</h2>
            <Button variant="tertiary" @click="router.push(`${BASE_PATH}/articles`)">View articles</Button>
          </div>
          <ul class="atlas-review-list">
            <li
              v-for="item in state.articles.filter((row) => row.status !== 'Published').slice(0, 3)"
              :key="item.id"
              class="atlas-review-item"
            >
              <div class="atlas-review-body">
                <strong>{{ item.title }}</strong>
                <span>{{ item.space }} · {{ item.owner }}</span>
              </div>
              <Button variant="tertiary" @click="router.push(`${BASE_PATH}/articles/${item.id}`)">Open</Button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
