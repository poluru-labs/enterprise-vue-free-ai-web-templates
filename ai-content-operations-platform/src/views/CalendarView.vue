<script setup>
import { computed, ref } from 'vue';
import { DateRangePicker, FileUpload, SegmentedControl, Timeline } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useContent } from '../stores/content.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useContent();
const view = ref('all');
const rangeStart = ref('2026-10-01');
const rangeEnd = ref('2026-10-31');

const rows = computed(() => {
  let list = store.upcoming;
  if (view.value === 'week') list = list.filter((item) => item.publishOn <= '2026-10-12');
  return list;
});

const timeline = computed(() =>
  rows.value.map((item) => ({
    title: item.title,
    description: `${item.owner} · ${item.channel}`,
    time: formatDate(item.publishOn),
  })),
);
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Calendar"
      description="Plan the October window across web, email, and social."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Calendar' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Upcoming" :value="store.upcoming.length" icon="bi-calendar3" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Scheduled" :value="store.scheduled.length" icon="bi-clock" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Fill" :value="`${store.calendarFill}%`" icon="bi-bar-chart" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Showing" :value="rows.length" icon="bi-funnel" tone="info" />
      </div>
    </div>

    <div class="flo-filter-bar">
      <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" label="Window" />
      <SegmentedControl
        v-model="view"
        :segments="[
          { value: 'all', label: 'Month' },
          { value: 'week', label: 'This week' },
        ]"
      />
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Publish dates" subtitle="Ordered by next slot">
          <Timeline :items="timeline" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Slot list" subtitle="Owner and channel">
          <ul class="flo-note-list">
            <li v-for="item in rows" :key="item.id">
              <i class="bi bi-dot" />
              <div class="w-100">
                <div class="flo-card-meta">
                  <strong>{{ item.title }}</strong>
                  <StatusBadge :status="item.status" />
                </div>
                <p class="flo-subtle mb-0">{{ item.owner }} · {{ item.channel }} · {{ formatDate(item.publishOn) }}</p>
              </div>
            </li>
          </ul>
        </ChartSection>
        <div class="mt-3">
          <ChartSection title="Asset drop" subtitle="Attach a pack for Rohan Poluru">
            <FileUpload label="Upload assets" hint="PNG, MP4, or zip" />
          </ChartSection>
        </div>
      </div>
    </div>
  </div>
</template>
