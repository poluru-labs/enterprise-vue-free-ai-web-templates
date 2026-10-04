<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Button,
  Meter,
  ProgressBar,
  Switch,
  Tabs,
  Tag,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useCompliance();
const tab = ref('overview');
const watchlist = ref(true);

const control = computed(() => store.getControl(route.params.id));
const linkedRisks = computed(() => store.risks.filter((item) => item.linkedControl === control.value?.id));
const linkedReqs = computed(() =>
  store.requirements.filter((item) => item.controlIds?.includes(control.value?.id)),
);

function markReviewed() {
  if (!control.value) return;
  store.updateControl(control.value.id, {
    lastTested: new Date().toISOString().slice(0, 10),
    status: control.value.status === 'draft' ? 'in_review' : control.value.status,
  });
  showToast({ title: 'Marked reviewed', description: `${control.value.code} updated.`, variant: 'success' });
}
</script>

<template>
  <div v-if="control" class="aeg-page">
    <PageHeader
      :title="control.title"
      :description="`${control.code} · ${control.domain} · ${control.owner}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Controls', to: `${BASE_PATH}/controls` }, { label: control.code }]"
    >
      <template #actions>
        <Button variant="secondary" size="sm" @click="router.push(`${BASE_PATH}/controls`)">Back</Button>
        <Button size="sm" @click="markReviewed">Mark reviewed</Button>
      </template>
    </PageHeader>

    <div class="aeg-page-actions mb-3">
      <StatusBadge :status="control.status" />
      <Tag :label="control.framework" />
      <Tag :label="control.domain" />
    </div>

    <Tabs
      v-model="tab"
      :items="[
        { id: 'overview', label: 'Overview' },
        { id: 'mapping', label: 'Mapping' },
        { id: 'notes', label: 'Notes' },
      ]"
    />

    <div v-if="tab === 'overview'" class="row g-3 mt-2">
      <div class="col-12 col-xl-7">
        <ChartSection title="Effectiveness" subtitle="Last tested and next review">
          <div class="aeg-stack">
            <ProgressBar label="Effectiveness" :value="control.effectiveness" show-value />
            <Meter :value="control.effectiveness" :max="100" label="Test score" />
            <dl class="aeg-settings-list">
              <div>
                <dt>Owner</dt>
                <dd>{{ control.owner }}</dd>
              </div>
              <div>
                <dt>Last tested</dt>
                <dd>{{ formatDate(control.lastTested) }}</dd>
              </div>
              <div>
                <dt>Next review</dt>
                <dd>{{ formatDate(control.nextReview) }}</dd>
              </div>
            </dl>
            <Switch v-model="watchlist" label="Keep on Kavya Poluru’s watch list" />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Linked risks" subtitle="Residual items that point here">
          <p v-if="!linkedRisks.length" class="aeg-subtle">No open risks map to this control.</p>
          <ul class="aeg-note-list">
            <li v-for="item in linkedRisks" :key="item.id">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.title }}</strong>
                <p class="mb-0">{{ item.owner }} · residual {{ item.residual }}</p>
              </div>
            </li>
          </ul>
        </ChartSection>
      </div>
    </div>

    <div v-else-if="tab === 'mapping'" class="row g-3 mt-2">
      <div class="col-12">
        <ChartSection title="Requirements" subtitle="Framework clauses this control supports">
          <ul class="aeg-note-list">
            <li v-for="item in linkedReqs" :key="item.id">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.code }} · {{ item.title }}</strong>
                <p class="mb-0">{{ item.framework }} · {{ item.owner }}</p>
              </div>
            </li>
          </ul>
        </ChartSection>
      </div>
    </div>

    <div v-else class="row g-3 mt-2">
      <div class="col-12">
        <ChartSection title="Notes" subtitle="Scope and residual comments">
          <p>{{ control.notes || 'No notes yet.' }}</p>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
