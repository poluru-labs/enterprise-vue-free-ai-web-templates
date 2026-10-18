<script setup>
import { computed, ref } from 'vue';
import { Card, Tabs, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useExperience } from '../stores/experience.js';
import { formatDate } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useExperience();
const tab = ref('posted');

const rows = computed(() => store.announcements.filter((item) => item.status === tab.value));
</script>

<template>
  <div class="hrt-page">
    <PageHeader
      title="Announcements"
      description="Posted notes, drafts, and the ones scheduled for later."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Announcements' }]"
    />

    <Tabs
      v-model="tab"
      :items="[
        { id: 'posted', label: 'Posted' },
        { id: 'scheduled', label: 'Scheduled' },
        { id: 'draft', label: 'Drafts' },
      ]"
    />

    <div class="row g-3 mt-1">
      <div v-for="item in rows" :key="item.id" class="col-12 col-md-6">
        <Card :title="item.title" :description="item.summary">
          <div class="hrt-card-meta">
            <StatusBadge :status="item.status" />
            <Tag :label="item.audience" />
          </div>
          <p class="hrt-subtle mt-3 mb-0">{{ item.author }} · {{ formatDate(item.date) }}</p>
        </Card>
      </div>
    </div>
  </div>
</template>
