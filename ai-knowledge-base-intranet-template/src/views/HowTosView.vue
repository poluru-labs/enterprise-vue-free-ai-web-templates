<script setup>
import { Button } from '@poluru-labs/enterprise-design-system-vue';
import { useIntranet } from '../stores/intranet.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import HowToCard from '../components/widgets/HowToCard.vue';

const { state, openPublish } = useIntranet();
</script>

<template>
  <div class="atlas-page">
    <PageHeader
      title="How-tos"
      description="Six equal-height guides — one from each space — so the grid never leaves a hole."
    >
      <template #actions>
        <Button class-name="atlas-btn-accent" icon="plus" @click="openPublish">Publish article</Button>
      </template>
    </PageHeader>

    <div class="row g-3 atlas-equal-row">
      <div v-for="howto in state.howTos" :key="howto.id" class="col-12 col-md-6 col-xl-4">
        <HowToCard :howto="howto" />
      </div>
    </div>
  </div>
</template>
