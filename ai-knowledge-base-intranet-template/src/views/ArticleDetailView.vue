<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Badge, Button, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import { useIntranet } from '../stores/intranet.js';
import { formatNumber } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import ChartSection from '../components/widgets/ChartSection.vue';

const route = useRoute();
const router = useRouter();
const { getArticle, toggleBookmark, isBookmarked } = useIntranet();

const article = computed(() => getArticle(route.params.id));
</script>

<template>
  <div class="atlas-page">
    <template v-if="article">
      <PageHeader :eyebrow="article.space" :title="article.title" :description="`${article.id} · ${article.owner}`">
        <template #actions>
          <Button variant="secondary" @click="router.push(`${BASE_PATH}/articles`)">Back to articles</Button>
          <Button class-name="atlas-btn-accent" @click="toggleBookmark(article)">
            {{ isBookmarked(article.id) ? 'Bookmarked' : 'Bookmark' }}
          </Button>
        </template>
      </PageHeader>

      <div class="row g-3 mb-3">
        <div class="col-12 col-md-6 col-xl-3">
          <section class="atlas-stat-card">
            <p class="atlas-stat-label">Space</p>
            <p class="atlas-stat-value atlas-stat-value-sm">{{ article.space }}</p>
            <span class="atlas-stat-hint">{{ article.type }}</span>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="atlas-stat-card">
            <p class="atlas-stat-label">Status</p>
            <div class="mt-2"><StatusBadge :label="article.status" /></div>
            <span class="atlas-stat-hint">Updated {{ article.updated }}</span>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="atlas-stat-card">
            <p class="atlas-stat-label">Reads</p>
            <p class="atlas-stat-value">{{ formatNumber(article.reads) }}</p>
            <span class="atlas-stat-hint">This snapshot</span>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="atlas-stat-card">
            <p class="atlas-stat-label">Owner</p>
            <p class="atlas-stat-value atlas-stat-value-sm">{{ article.owner }}</p>
            <span class="atlas-stat-hint">Internal comms can ping</span>
          </section>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <ChartSection title="Page body" hint="What the space should know">
            <blockquote class="atlas-excerpt">{{ article.body }}</blockquote>
            <div class="atlas-type-row mt-3">
              <Tag :label="article.space" variant="brand" />
              <Tag :label="article.type" variant="neutral" />
            </div>
          </ChartSection>
        </div>
        <div class="col-12 col-xl-4">
          <ChartSection title="Record" hint="Intranet metadata">
            <dl class="atlas-meta">
              <div><dt>ID</dt><dd>{{ article.id }}</dd></div>
              <div><dt>Space</dt><dd>{{ article.space }}</dd></div>
              <div><dt>Type</dt><dd>{{ article.type }}</dd></div>
              <div><dt>Owner</dt><dd>{{ article.owner }}</dd></div>
              <div><dt>Bookmark</dt><dd><Badge :label="isBookmarked(article.id) ? 'Saved' : 'Not saved'" variant="brand" /></dd></div>
            </dl>
            <Button class="mt-3" variant="secondary" @click="router.push(`${BASE_PATH}/spaces/${article.spaceId}`)">
              Open {{ article.space }} space
            </Button>
          </ChartSection>
        </div>
      </div>
    </template>
    <template v-else>
      <PageHeader title="Article not found" description="That page is not in the current Atlas snapshot.">
        <template #actions>
          <Button variant="secondary" @click="router.push(`${BASE_PATH}/articles`)">Return to articles</Button>
        </template>
      </PageHeader>
    </template>
  </div>
</template>
