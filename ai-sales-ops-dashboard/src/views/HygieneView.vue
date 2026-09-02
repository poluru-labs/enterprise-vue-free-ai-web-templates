<script setup>
import { Button, Card, Status } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import EqualHeightGrid from '../components/widgets/EqualHeightGrid.vue';
import AtRiskList from '../components/widgets/AtRiskList.vue';
import { useQuotaStore } from '../stores/quota.js';
import { hygieneTone } from '../utils/status.js';

const { state, missingNextStep, staleDeals } = useQuotaStore();
</script>

<template>
  <div class="quota-page">
    <PageHeader
      eyebrow="Hygiene"
      title="Missing next steps and stale deals"
      description="88% of the book has a dated next step. Anything older than 7 days drops out of commit."
    >
      <template #actions>
        <Button icon="plus" @click="state.activityOpen = true">Log activity</Button>
      </template>
    </PageHeader>

    <EqualHeightGrid :columns="2" label="Hygiene queues">
      <Card title="Missing next step" description="Deals that cannot sit in commit">
        <div class="quota-stack">
          <div v-for="deal in missingNextStep" :key="deal.id" class="quota-row quota-row-between">
            <div>
              <strong>{{ deal.account }}</strong>
              <div class="quota-muted">{{ deal.amount }} · {{ deal.owner }}</div>
            </div>
            <Status label="No next step" :tone="hygieneTone(deal)" />
          </div>
        </div>
      </Card>
      <Card title="Stale deals" description="No activity in 7 days or more">
        <div class="quota-stack">
          <div v-for="deal in staleDeals" :key="deal.id" class="quota-row quota-row-between">
            <div>
              <strong>{{ deal.account }}</strong>
              <div class="quota-muted">{{ deal.lastTouch }} · {{ deal.nextStep || 'No next step' }}</div>
            </div>
            <Status :label="`${deal.staleDays}d stale`" tone="warning" />
          </div>
        </div>
      </Card>
    </EqualHeightGrid>

    <div class="quota-mt-lg">
      <AtRiskList :items="state.atRisk" />
    </div>
  </div>
</template>
