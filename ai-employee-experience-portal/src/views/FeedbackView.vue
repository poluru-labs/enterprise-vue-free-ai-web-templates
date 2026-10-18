<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, DataTable, DateRangePicker, SegmentedControl, Stepper, Timeline, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, REQUEST_STEPS } from '../constants/navigation.js';
import { useExperience } from '../stores/experience.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useExperience();
const status = ref('all');
const rangeStart = ref('2026-10-01');
const rangeEnd = ref('2026-10-31');
const selectedId = ref('fb-1');

const rows = computed(() =>
  store.feedback.filter((item) => {
    const matchesStatus = status.value === 'all' || item.status === status.value;
    const opened = item.opened;
    const matchesRange = (!rangeStart.value || opened >= rangeStart.value) && (!rangeEnd.value || opened <= rangeEnd.value);
    return matchesStatus && matchesRange;
  }),
);

const selected = computed(() => rows.value.find((item) => item.id === selectedId.value) || rows.value[0]);
const stepIndex = computed(() => {
  const index = REQUEST_STEPS.findIndex((step) => step.id === selected.value?.step);
  return index < 0 ? 0 : index;
});

const tableRows = computed(() =>
  rows.value.map((item) => ({
    id: item.id,
    topic: item.topic,
    author: item.author,
    owner: item.owner,
    status: item.status,
    opened: formatDate(item.opened),
  })),
);

const timeline = computed(() =>
  selected.value
    ? [
        {
          id: `${selected.value.id}-opened`,
          title: selected.value.topic,
          description: selected.value.note,
          time: formatDate(selected.value.opened),
        },
      ]
    : [],
);

function decide(next) {
  if (!selected.value) return;
  store.decideNote(selected.value.id, next);
  showToast({
    title: next === 'closed' ? 'Note closed' : 'Note in review',
    description: `${selected.value.topic} · ${selected.value.author}`,
    variant: 'success',
  });
}
</script>

<template>
  <div class="hrt-page">
    <PageHeader
      title="Feedback"
      description="Notes waiting on an owner, and the ones already closed."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Feedback' }]"
    />

    <div class="hrt-filter-bar">
      <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" label="Opened" />
      <SegmentedControl
        v-model="status"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'new', label: 'New' },
          { value: 'review', label: 'Review' },
          { value: 'closed', label: 'Closed' },
        ]"
      />
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Notes" subtitle="Pick a note, then review or close it">
          <div class="hrt-table-block">
            <DataTable
              :columns="[
                { key: 'topic', label: 'Topic', sortable: true },
                { key: 'author', label: 'Author' },
                { key: 'owner', label: 'Owner' },
                { key: 'status', label: 'Status' },
                { key: 'opened', label: 'Opened' },
              ]"
              :rows="tableRows"
              striped
            />
          </div>
          <div class="hrt-inline-badges">
            <button
              v-for="item in rows"
              :key="item.id"
              type="button"
              class="hrt-inline-link"
              :class="{ 'is-active': selected?.id === item.id }"
              @click="selectedId = item.id"
            >
              {{ item.author }}
              <StatusBadge :status="item.status" />
            </button>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection v-if="selected" :title="selected.topic" :subtitle="selected.note">
          <Stepper :steps="REQUEST_STEPS" :active-index="stepIndex" />
          <p class="hrt-subtle">{{ selected.author }} asked {{ selected.owner }} · {{ selected.service }} · {{ formatDate(selected.opened) }}</p>
          <div class="hrt-page-actions">
            <Button size="sm" icon="check" @click="decide('review')">Mark reviewed</Button>
            <Button size="sm" variant="secondary" icon="x" @click="decide('closed')">Close note</Button>
            <Button
              size="sm"
              variant="tertiary"
              icon-trailing="chevron-right"
              @click="router.push(`${BASE_PATH}/services/${selected.serviceId}`)"
            >
              Open service
            </Button>
          </div>
          <Timeline class="mt-3" :items="timeline" />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
