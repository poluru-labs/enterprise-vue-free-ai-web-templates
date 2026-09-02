<script setup>
import { Button, Card } from '@poluru-labs/enterprise-design-system-vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import RequestTable from '../components/widgets/RequestTable.vue';
import { usePulseStore } from '../stores/pulse.js';

const { state } = usePulseStore();
</script>

<template>
  <div class="pulse-page">
    <PageHeader
      eyebrow="Roadmap"
      title="Feature & enhancement requests"
      description="Roadmap for the analytics product. Search, filter by owner, and export CSV."
    >
      <template #actions>
        <Button icon="plus" @click="state.requestOpen = true">Add request</Button>
      </template>
    </PageHeader>

    <Card>
      <RequestTable />
    </Card>
  </div>
</template>
