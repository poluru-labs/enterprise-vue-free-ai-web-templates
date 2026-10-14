<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Avatar, Card, TreeView } from '@poluru-labs/enterprise-design-system-vue';
import domains from '../data/domains.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useGovernance } from '../stores/governance.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';

const router = useRouter();
const store = useGovernance();
const selected = ref('dom-customer');

const note = computed(() => {
  const notes = domains.notes;
  if (selected.value in notes) return notes[selected.value];
  return 'Open a domain for the steward note, or an asset to see its record.';
});

const owners = computed(() => {
  const groups = new Map();
  store.assets.forEach((asset) => {
    const current = groups.get(asset.owner) || [];
    current.push(asset);
    groups.set(asset.owner, current);
  });
  return [...groups.entries()].map(([name, assets]) => ({ name, assets }));
});

function onSelect(id) {
  selected.value = id;
  if (String(id).startsWith('ast-')) router.push(`${BASE_PATH}/catalog/${id}`);
}
</script>

<template>
  <div class="cbt-page">
    <PageHeader
      title="Owners"
      description="Every asset has a named owner and a steward."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Owners' }]"
    />

    <div class="row g-3">
      <div class="col-12 col-xl-5">
        <ChartSection title="Domains" subtitle="Open an asset from the tree">
          <TreeView :nodes="domains.tree" @select="onSelect" />
          <p class="cbt-subtle mt-3 mb-0">{{ note }}</p>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-7">
        <div class="row g-3">
          <div v-for="owner in owners" :key="owner.name" class="col-12 col-md-6">
            <Card :title="owner.name" :description="`${owner.assets.length} ${owner.assets.length === 1 ? 'asset' : 'assets'}`">
              <div class="cbt-person">
                <Avatar :name="owner.name" size="sm" />
                <div>
                  <p class="mb-0">{{ owner.assets.map((item) => item.name).join(', ') }}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
