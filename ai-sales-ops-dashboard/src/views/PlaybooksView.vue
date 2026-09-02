<script setup>
import { Alert, Button } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import PlaybookCard from '../components/widgets/PlaybookCard.vue';
import { useQuotaStore } from '../stores/quota.js';

const { state, paddedPlaybooks } = useQuotaStore();
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Playbooks"
      title="How RevOps runs the week"
      description="Equal-height playbook cards. Extra cards fill a short row so the grid never looks unfinished."
    >
      <template #actions>
        <Button icon="plus" @click="state.activityOpen = true">Log activity</Button>
      </template>
    </PageHeader>

    <Alert
      class="quota-mb-lg"
      variant="info"
      title="Commit this afternoon"
      message="Keep Harbor Labs and Fieldwork Co in commit. Weighted coverage is 1.4× next quarter and 3.1× against remaining plan."
    />

    <EqualHeightGrid :columns="3" label="Sales ops playbooks">
      <PlaybookCard v-for="item in paddedPlaybooks" :key="item.id" :item="item" />
    </EqualHeightGrid>
  </div>
</template>
