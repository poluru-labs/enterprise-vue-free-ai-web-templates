<script setup>
import { computed, ref } from 'vue';
import { Avatar, Button, List, Switch, Tabs, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useContent } from '../stores/content.js';
import { formatDate } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useContent();
const tab = ref('in_review');
const onlyMine = ref(true);

const rows = computed(() => {
  let list = store.pieces;
  if (tab.value !== 'all') list = list.filter((item) => item.status === tab.value);
  if (onlyMine.value) list = list.filter((item) => item.reviewer === 'Tara Poluru' || item.reviewer === 'Ananya Poluru');
  return list;
});

const listItems = computed(() =>
  rows.value.map((item) => ({
    id: item.id,
    label: item.title,
    description: `${item.owner} · ${item.channel} · ${formatDate(item.publishOn)}`,
  })),
);

function approve(id) {
  store.updatePiece(id, { status: 'approved' });
  showToast({ title: 'Approved', description: 'Slot is ready for the calendar.', variant: 'success' });
}
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Reviews"
      description="Approve copy before it hits a channel."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Reviews' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Queue" :value="store.reviews.length" icon="bi-inboxes" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Approved" :value="store.pieces.filter((item) => item.status === 'approved').length" icon="bi-check2" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Scheduled" :value="store.scheduled.length" icon="bi-clock" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Showing" :value="rows.length" icon="bi-funnel" />
      </div>
    </div>

    <div class="flo-filter-bar">
      <Tabs
        v-model="tab"
        :items="[
          { id: 'all', label: 'All' },
          { id: 'in_review', label: 'In review' },
          { id: 'approved', label: 'Approved' },
          { id: 'scheduled', label: 'Scheduled' },
        ]"
      />
      <Switch v-model="onlyMine" label="Only Tara and Ananya Poluru" />
    </div>

    <section class="flo-panel">
      <div class="flo-panel-body">
        <List :items="listItems">
          <template #trailing="{ item }">
            <div class="flo-card-meta">
              <StatusBadge :status="store.getPiece(item.id)?.status" />
              <Avatar :name="store.getPiece(item.id)?.reviewer" size="sm" />
              <Button
                v-if="store.getPiece(item.id)?.status === 'in_review'"
                size="sm"
                @click="approve(item.id)"
              >
                Approve
              </Button>
            </div>
          </template>
        </List>
      </div>
    </section>
  </div>
</template>
