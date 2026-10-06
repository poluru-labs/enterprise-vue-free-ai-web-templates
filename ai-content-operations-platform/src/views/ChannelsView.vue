<script setup>
import { computed, ref } from 'vue';
import { Meter, ProgressBar, Stat, Tag, TreeView } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useContent } from '../stores/content.js';
import { formatNumber } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useContent();
const selected = ref(store.channels[0]?.id || '');
const current = computed(() => store.getChannel(selected.value) || store.channels[0]);
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Channels"
      description="Owned and social surfaces Ananya Poluru runs."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Channels' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Channels" :value="store.channels.length" icon="bi-broadcast" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Live" :value="store.liveChannels.length" icon="bi-wifi" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Paused" :value="store.channels.filter((item) => item.status === 'paused').length" icon="bi-pause" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Reach" :value="formatNumber(store.channels.reduce((sum, item) => sum + item.reach, 0))" icon="bi-people" tone="info" />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-4">
        <ChartSection title="Channel tree" subtitle="Select a surface">
          <TreeView :nodes="store.channelTree" @select="selected = $event" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-8" v-if="current">
        <ChartSection :title="current.name" :subtitle="current.owner">
          <div class="flo-stack">
            <div class="flo-card-meta">
              <StatusBadge :status="current.status" />
              <Tag :label="formatNumber(current.reach)" />
            </div>
            <ProgressBar label="Fill" :value="current.fill" show-value />
            <Meter :value="current.reach" :max="20000" label="Monthly reach" />
            <Stat label="Owner" :value="current.owner" />
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
