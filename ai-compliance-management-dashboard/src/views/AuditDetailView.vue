<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, ProgressBar, Tag, Timeline } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useCompliance();
const audit = computed(() => store.getAudit(route.params.id));

const events = computed(() => [
  { title: 'Kickoff', description: `${audit.value?.lead} opened the scope.`, time: formatDate(audit.value?.start) },
  { title: 'Evidence', description: `${audit.value?.findings} findings logged.`, time: audit.value?.status },
  { title: 'Close', description: audit.value?.notes, time: formatDate(audit.value?.end) },
]);
</script>

<template>
  <div v-if="audit" class="aeg-page">
    <PageHeader
      :title="audit.name"
      :description="`${audit.firm} · ${audit.lead}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Audits', to: `${BASE_PATH}/audits` }, { label: audit.name }]"
    >
      <template #actions>
        <Button variant="secondary" size="sm" @click="router.push(`${BASE_PATH}/audits`)">Back</Button>
      </template>
    </PageHeader>

    <div class="aeg-page-actions mb-3">
      <StatusBadge :status="audit.status" />
      <Tag :label="audit.framework" />
      <Tag :label="audit.type" />
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Coverage" subtitle="Evidence collected against the request list">
          <ProgressBar label="Coverage" :value="audit.coverage" show-value />
          <dl class="aeg-settings-list mt-3">
            <div>
              <dt>Window</dt>
              <dd>{{ formatDate(audit.start) }} – {{ formatDate(audit.end) }}</dd>
            </div>
            <div>
              <dt>Findings</dt>
              <dd>{{ audit.findings }}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{{ audit.notes }}</dd>
            </div>
          </dl>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Timeline" subtitle="Kickoff to close">
          <Timeline :items="events" />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
