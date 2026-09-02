<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Avatar, Button, EmptyState, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import { useIntranet } from '../stores/intranet.js';
import { formatNumber } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import ChartSection from '../components/widgets/ChartSection.vue';

const route = useRoute();
const router = useRouter();
const { getSpace, articlesForSpace, setSpaceFilter, toggleBookmark, isBookmarked } = useIntranet();

const space = computed(() => getSpace(route.params.id));
const articles = computed(() => (space.value ? articlesForSpace(space.value.id) : []));

function openArticle(article) {
  router.push(`${BASE_PATH}/articles/${article.id}`);
}
</script>

<template>
  <div class="atlas-page">
    <template v-if="space">
      <PageHeader :eyebrow="space.kicker" :title="space.name" :description="space.description">
        <template #actions>
          <Button variant="secondary" @click="router.push(`${BASE_PATH}/spaces`)">All spaces</Button>
          <Button class-name="atlas-btn-accent" @click="setSpaceFilter(space.id); router.push(`${BASE_PATH}/articles`)">
            Filter articles
          </Button>
        </template>
      </PageHeader>

      <div class="row g-3 mb-3">
        <div class="col-12 col-md-4">
          <section class="atlas-stat-card">
            <p class="atlas-stat-label">Articles</p>
            <p class="atlas-stat-value">{{ formatNumber(space.articles) }}</p>
            <span class="atlas-stat-hint">{{ articles.length }} in this snapshot</span>
          </section>
        </div>
        <div class="col-12 col-md-4">
          <section class="atlas-stat-card">
            <p class="atlas-stat-label">Unread</p>
            <p class="atlas-stat-value">{{ space.unread }}</p>
            <span class="atlas-stat-hint">{{ space.stale }} stale pages</span>
          </section>
        </div>
        <div class="col-12 col-md-4">
          <section class="atlas-stat-card">
            <p class="atlas-stat-label">Owners</p>
            <div class="atlas-owner-row mt-2">
              <Avatar v-for="owner in space.owners" :key="owner" :name="owner" size="sm" />
            </div>
            <span class="atlas-stat-hint">{{ space.owners.join(' · ') }}</span>
          </section>
        </div>
      </div>

      <ChartSection title="Pages in this space" :hint="`${articles.length} articles`">
        <ul v-if="articles.length" class="atlas-review-list">
          <li v-for="article in articles" :key="article.id" class="atlas-review-item">
            <div class="atlas-review-body">
              <button type="button" class="atlas-linkish" @click="openArticle(article)">{{ article.title }}</button>
              <span>{{ article.owner }} · {{ article.updated }}</span>
            </div>
            <Tag :label="article.type" variant="neutral" />
            <StatusBadge :label="article.status" />
            <Button
              variant="tertiary"
              :icon="isBookmarked(article.id) ? 'star' : 'plus'"
              icon-only
              accessible-label="Bookmark"
              @click="toggleBookmark(article)"
            />
          </li>
        </ul>
        <EmptyState v-else title="No pages yet" description="Publish the first article into this space." icon="plus" />
      </ChartSection>
    </template>
    <template v-else>
      <PageHeader title="Space not found" description="That team space is not on the Atlas map.">
        <template #actions>
          <Button variant="secondary" @click="router.push(`${BASE_PATH}/spaces`)">Back to spaces</Button>
        </template>
      </PageHeader>
    </template>
  </div>
</template>
