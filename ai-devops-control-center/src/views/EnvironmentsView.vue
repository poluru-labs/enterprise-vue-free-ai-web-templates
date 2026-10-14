<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Avatar, Card, Meter, TreeView } from '@poluru-labs/enterprise-design-system-vue';
import services from '../data/services.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useDevops } from '../stores/devops.js';
import { formatPercent } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useDevops();
const selected = ref('svc-store');

const note = computed(() => {
  const notes = services.notes;
  if (selected.value in notes) return notes[selected.value];
  return 'Open a group for the owner note, or a pipeline to see its record.';
});

function onSelect(id) {
  selected.value = id;
  if (String(id).startsWith('pipe-')) router.push(`${BASE_PATH}/pipelines/${id}`);
}
</script>

<template>
  <div class="tde-page">
    <PageHeader
      title="Environments"
      description="Named books, versions, and the services that live in them."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Environments' }]"
    />

    <div class="row g-3">
      <div class="col-12 col-xl-5">
        <ChartSection title="Services" subtitle="Open a pipeline from the tree">
          <TreeView :nodes="services.tree" @select="onSelect" />
          <p class="tde-subtle mt-3 mb-0">{{ note }}</p>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-7">
        <div class="row g-3">
          <div v-for="env in store.environments" :key="env.id" class="col-12 col-md-6">
            <Card :title="env.name" :description="`${env.region} · ${env.version}`">
              <div class="tde-stack">
                <div class="tde-card-meta">
                  <StatusBadge :status="env.status" />
                </div>
                <Meter :value="env.uptime" :max="100" label="Uptime" show-value />
                <div class="tde-person">
                  <Avatar :name="env.owner" size="sm" />
                  <div>
                    <strong>{{ env.owner }}</strong>
                    <p class="tde-subtle mb-0">{{ env.services }} services · {{ formatPercent(env.uptime) }}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
