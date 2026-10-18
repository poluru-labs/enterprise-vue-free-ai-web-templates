<script setup>
import { computed, ref } from 'vue';
import { Avatar, Card, TreeView } from '@poluru-labs/enterprise-design-system-vue';
import teams from '../data/teams.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useExperience } from '../stores/experience.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useExperience();
const selectedId = ref('cat-workplace');

const note = computed(() => (selectedId.value in teams.notes ? teams.notes[selectedId.value] : 'Pick a team to see who owns it.'));

function onSelect(id) {
  selectedId.value = id;
}
</script>

<template>
  <div class="hrt-page">
    <PageHeader
      title="Resources"
      description="Handbooks, maps, and forms employees open during the week."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Resources' }]"
    />

    <div class="row g-3">
      <div class="col-12 col-lg-4">
        <ChartSection title="Teams" subtitle="Who owns each desk">
          <TreeView :nodes="teams.tree" @select="onSelect" />
          <p class="hrt-subtle mt-3 mb-0">{{ note }}</p>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-8">
        <div class="row g-3">
          <div v-for="item in store.resources" :key="item.id" class="col-12 col-md-6">
            <Card :title="item.title" :description="item.summary">
              <div class="hrt-card-meta">
                <StatusBadge :status="item.status" />
                <span class="hrt-subtle">{{ item.kind }}</span>
              </div>
              <div class="hrt-person mt-3">
                <Avatar :name="item.owner" size="sm" />
                <div>
                  <strong>{{ item.owner }}</strong>
                  <p class="hrt-subtle mb-0">Updated {{ formatDate(item.updated) }}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
