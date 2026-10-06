<script setup>
import { Avatar, Card, EmptyState, ProgressBar, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useContent } from '../stores/content.js';
import { formatDate } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useContent();
</script>

<template>
  <div class="flo-page">
    <PageHeader
      title="Library"
      description="Published pieces across the Folio desk."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Library' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Published" :value="store.published.length" icon="bi-collection" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Words" :value="store.published.reduce((sum, item) => sum + item.words, 0)" icon="bi-type" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Avg score"
          :value="store.published.length ? Math.round(store.published.reduce((sum, item) => sum + item.score, 0) / store.published.length) : 0"
          icon="bi-stars"
          tone="info"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Channels" :value="new Set(store.published.map((item) => item.channel)).size" icon="bi-broadcast" />
      </div>
    </div>

    <EmptyState v-if="!store.published.length" title="Nothing live" description="Publish a brief to fill the library." />

    <div v-else class="row g-3">
      <div v-for="piece in store.published" :key="piece.id" class="col-12 col-md-6 col-xl-4">
        <Card :title="piece.title" :description="piece.notes">
          <div class="flo-stack">
            <div class="flo-card-meta">
              <StatusBadge :status="piece.status" />
              <Tag :label="piece.channel" />
            </div>
            <ProgressBar label="Readiness" :value="piece.score" show-value />
            <div class="flo-model-cell">
              <Avatar :name="piece.owner" size="sm" />
              <div>
                <strong>{{ piece.owner }}</strong>
                <p class="flo-subtle mb-0">{{ formatDate(piece.publishOn) }}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
