<script setup>
import { Button } from '@poluru-labs/enterprise-design-system-vue';
import { useIntranet } from '../stores/intranet.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import SpaceCard from '../components/widgets/SpaceCard.vue';

const { state, openPublish } = useIntranet();
</script>

<template>
  <div class="atlas-page">
    <PageHeader
      title="Team spaces"
      description="Six equal-height spaces so the grid stays even — Engineering, People, Legal, GTM, Finance, and Security."
    >
      <template #actions>
        <Button class-name="atlas-btn-accent" icon="plus" @click="openPublish">Publish article</Button>
      </template>
    </PageHeader>

    <div class="row g-3 atlas-equal-row">
      <div v-for="space in state.spaces" :key="space.id" class="col-12 col-md-6 col-xl-4">
        <SpaceCard :space="space" />
      </div>
    </div>
  </div>
</template>
