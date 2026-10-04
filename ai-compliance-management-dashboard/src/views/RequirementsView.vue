<script setup>
import { computed, ref } from 'vue';
import { Badge, ProgressBar, Tag, TreeView } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useCompliance();
const selected = ref(store.requirements[0]?.id || '');
const current = computed(() => store.getRequirement(selected.value) || store.requirements[0]);
const mapped = computed(() => store.requirements.filter((item) => item.status === 'mapped').length);
</script>

<template>
  <div class="aeg-page">
    <PageHeader
      title="Requirements"
      description="SOC 2, ISO 27001, GDPR, HIPAA, and PCI clauses mapped to controls."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Requirements' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Clauses" :value="store.requirements.length" icon="bi-diagram-3" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Mapped" :value="mapped" icon="bi-check2-circle" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Gaps"
          :value="store.requirements.filter((item) => item.status === 'gap').length"
          icon="bi-exclamation-octagon"
          tone="danger"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Frameworks" value="5" icon="bi-layers" tone="info" />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-4">
        <ChartSection title="Framework tree" subtitle="Select a clause">
          <TreeView :nodes="store.requirementTree" @select="selected = $event" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-8" v-if="current">
        <ChartSection :title="`${current.code} · ${current.title}`" :subtitle="current.owner">
          <div class="aeg-stack">
            <div class="aeg-card-meta">
              <StatusBadge :status="current.status" />
              <Tag :label="current.framework" />
              <Badge :label="`Due ${formatDate(current.due)}`" soft />
            </div>
            <ProgressBar label="Coverage" :value="current.coverage" show-value />
            <ul class="aeg-note-list">
              <li v-for="id in current.controlIds" :key="id">
                <i class="bi bi-dot" />
                <div>
                  <strong>{{ store.getControl(id)?.code || id }}</strong>
                  <p class="mb-0">{{ store.getControl(id)?.title }}</p>
                </div>
              </li>
            </ul>
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
