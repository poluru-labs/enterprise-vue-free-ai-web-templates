<script setup>
import { Alert, Button } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import ExperimentCard from '../components/widgets/ExperimentCard.vue';
import PlaybookCard from '../components/widgets/PlaybookCard.vue';
import { usePulseStore } from '../stores/pulse.js';

const { state, paddedExperiments } = usePulseStore();
</script>

<template>
  <div class="pulse-page">
    <PageHeader
      eyebrow="Experiments"
      title="What the pod is shipping"
      description="Equal-height experiment cards. Extra cards fill a short row so the grid never looks unfinished."
    >
      <template #actions>
        <Button icon="plus" @click="state.requestOpen = true">New experiment</Button>
      </template>
    </PageHeader>

    <Alert
      class="pulse-mb-lg"
      variant="info"
      title="Trial-to-paid variant B"
      message="Trending +6.2% — let it run 4 more days with Meera Poluru before calling it."
    />

    <EqualHeightGrid :columns="3" label="Active experiments">
      <ExperimentCard v-for="item in paddedExperiments" :key="item.id" :item="item" />
    </EqualHeightGrid>

    <h2 class="pulse-section-title">Playbooks</h2>
    <EqualHeightGrid :columns="3" label="Growth playbooks">
      <PlaybookCard v-for="item in state.playbooks" :key="item.id" :item="item" />
    </EqualHeightGrid>
  </div>
</template>
