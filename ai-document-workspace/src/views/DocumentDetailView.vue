<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Badge, Button, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import { useDocuments } from '../stores/documents.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import ChartSection from '../components/widgets/ChartSection.vue';

const route = useRoute();
const router = useRouter();
const { getDocument } = useDocuments();

const document = computed(() => getDocument(route.params.id));
</script>

<template>
  <div class="vault-page">
    <template v-if="document">
      <PageHeader :title="document.name" :description="`${document.id} · ${document.path.join(' / ')}`">
        <template #actions>
          <Button variant="secondary" @click="router.push(`${BASE_PATH}/library`)">Back to library</Button>
          <Button class-name="vault-btn-accent" @click="router.push(`${BASE_PATH}/search?q=${encodeURIComponent(document.name)}`)">
            Find citations
          </Button>
        </template>
      </PageHeader>

      <div class="row g-3 mb-3">
        <div class="col-12 col-md-6 col-xl-3">
          <section class="vault-stat-card">
            <p class="vault-stat-label">Owner</p>
            <p class="vault-stat-value vault-stat-value-sm">{{ document.owner }}</p>
            <span class="vault-stat-hint">Knowledge ops</span>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="vault-stat-card">
            <p class="vault-stat-label">Status</p>
            <div class="mt-2"><StatusBadge :label="document.status" /></div>
            <span class="vault-stat-hint">Updated {{ document.updated }}</span>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="vault-stat-card">
            <p class="vault-stat-label">Citations</p>
            <p class="vault-stat-value">{{ document.citations }}</p>
            <span class="vault-stat-hint">{{ document.pages }} pages · {{ document.version }}</span>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="vault-stat-card">
            <p class="vault-stat-label">Size</p>
            <p class="vault-stat-value vault-stat-value-sm">{{ document.size }}</p>
            <span class="vault-stat-hint">{{ document.type }}</span>
          </section>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <ChartSection title="Citation-ready excerpt" :hint="`Page excerpt from ${document.version}`">
            <blockquote class="vault-excerpt">{{ document.excerpt }}</blockquote>
            <div class="vault-type-row mt-3">
              <Tag v-for="crumb in document.path" :key="crumb" :label="crumb" variant="neutral" />
            </div>
          </ChartSection>
        </div>
        <div class="col-12 col-xl-4">
          <ChartSection title="Record" hint="Library metadata">
            <dl class="vault-meta">
              <div><dt>ID</dt><dd>{{ document.id }}</dd></div>
              <div><dt>Type</dt><dd>{{ document.type }}</dd></div>
              <div><dt>Folder</dt><dd>{{ document.folder }}</dd></div>
              <div><dt>Collection</dt><dd>{{ document.collection }}</dd></div>
              <div><dt>Scope</dt><dd><Badge :label="document.scope" variant="brand" /></dd></div>
            </dl>
          </ChartSection>
        </div>
      </div>
    </template>
    <template v-else>
      <PageHeader title="Document not found" description="That file is not in the current vault snapshot.">
        <template #actions>
          <Button variant="secondary" @click="router.push(`${BASE_PATH}/library`)">Return to library</Button>
        </template>
      </PageHeader>
    </template>
  </div>
</template>
