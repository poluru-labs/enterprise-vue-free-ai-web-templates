<script setup>
import { Card, Timeline } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import TeamCard from '../components/widgets/TeamCard.vue';
import { useQuotaStore } from '../stores/quota.js';

const { state, paddedTeams } = useQuotaStore();
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Teams"
      title="Quota by rep"
      description="Equal-height team cards. Extra seats fill a short row so coverage never looks unfinished."
    />

    <EqualHeightGrid :columns="3" label="Sales team">
      <TeamCard v-for="item in paddedTeams" :key="item.id" :item="item" />
    </EqualHeightGrid>

    <Card class="quota-mt-lg" title="Recent activity">
      <Timeline :items="state.timelineItems" />
    </Card>
  </div>
</template>
