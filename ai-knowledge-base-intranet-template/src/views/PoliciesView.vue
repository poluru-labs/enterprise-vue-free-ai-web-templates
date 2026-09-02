<script setup>
import { useRouter } from 'vue-router';
import { Button, EmptyState } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import { useIntranet } from '../stores/intranet.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const { state, toggleBookmark, getArticle } = useIntranet();

function openPolicy(policy) {
  router.push(`${BASE_PATH}/articles/${policy.articleId}`);
}

function bookmarkPolicy(policy) {
  const article = getArticle(policy.articleId);
  if (article) toggleBookmark(article);
}
</script>

<template>
  <div class="atlas-page">
    <PageHeader
      title="Policies"
      description="The rules Internal Comms keeps current — expense, encryption, retention, leave, incidents, and GTM cards."
    />

    <div class="row g-3">
      <div v-for="policy in state.policies" :key="policy.id" class="col-12 col-md-6 col-xl-4">
        <article class="atlas-panel atlas-policy-card" @click="openPolicy(policy)">
          <div class="atlas-panel-head">
            <h2>{{ policy.title }}</h2>
            <StatusBadge :label="policy.status" />
          </div>
          <p class="atlas-space-kicker">{{ policy.space }}</p>
          <p class="atlas-muted">{{ policy.summary }}</p>
          <div class="atlas-space-card-foot">
            <span>{{ policy.owner }} · {{ policy.updated }}</span>
            <Button variant="tertiary" @click.stop="bookmarkPolicy(policy)">Bookmark</Button>
          </div>
        </article>
      </div>
    </div>

    <EmptyState
      v-if="!state.policies.length"
      class="mt-4"
      title="No policies"
      description="Published policies will land here."
      icon="check"
    />
  </div>
</template>
