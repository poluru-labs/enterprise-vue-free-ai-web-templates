<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Avatar,
  Button,
  Card,
  Meter,
  ProgressBar,
  Select,
  Tag,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, STATUS_OPTIONS } from '../constants/navigation.js';
import { useContent } from '../stores/content.js';
import { formatDate } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useContent();
const piece = computed(() => store.getPiece(route.params.id));

function saveStatus(status) {
  store.updatePiece(piece.value.id, { status });
  showToast({ title: 'Updated', description: `${piece.value.code} is now ${status}.`, variant: 'success' });
}
</script>

<template>
  <div v-if="piece" class="flo-page">
    <PageHeader
      :title="piece.title"
      :description="`${piece.code} · ${piece.owner}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Drafts', to: `${BASE_PATH}/drafts` }, { label: piece.code }]"
    >
      <template #actions>
        <Button variant="secondary" size="sm" @click="router.push(`${BASE_PATH}/drafts`)">Back</Button>
      </template>
    </PageHeader>

    <div class="row g-3">
      <div class="col-12 col-xl-8">
        <Card :title="piece.title" :description="piece.notes">
          <div class="flo-stack">
            <div class="flo-card-meta">
              <StatusBadge :status="piece.status" />
              <Tag :label="piece.type" />
              <Tag :label="piece.channel" />
            </div>
            <ProgressBar label="Readiness" :value="piece.score" show-value />
            <Meter :value="piece.words" :max="2000" label="Word count" />
            <Select
              :model-value="piece.status"
              label="Move status"
              :options="STATUS_OPTIONS"
              @update:model-value="saveStatus"
            />
            <Textarea :model-value="piece.notes" label="Desk notes" readonly />
          </div>
        </Card>
      </div>
      <div class="col-12 col-xl-4">
        <Card title="Owners">
          <div class="flo-stack">
            <div class="flo-model-cell">
              <Avatar :name="piece.owner" size="sm" />
              <div>
                <strong>{{ piece.owner }}</strong>
                <p class="flo-subtle mb-0">Writer · due {{ formatDate(piece.publishOn) }}</p>
              </div>
            </div>
            <div class="flo-model-cell">
              <Avatar :name="piece.reviewer" size="sm" />
              <div>
                <strong>{{ piece.reviewer }}</strong>
                <p class="flo-subtle mb-0">Reviewer</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
