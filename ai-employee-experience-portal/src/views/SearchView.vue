<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Card, EmptyState, List, Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useExperience } from '../stores/experience.js';
import { searchRecords } from '../utils/search.js';
import PageHeader from '../components/widgets/PageHeader.vue';

const route = useRoute();
const router = useRouter();
const store = useExperience();
const query = ref(typeof route.query.q === 'string' ? route.query.q : '');

watch(
  () => route.query.q,
  (value) => {
    query.value = typeof value === 'string' ? value : '';
  },
);

const services = computed(() => searchRecords(store.services, query.value, ['name', 'owner', 'category', 'site', 'description']));
const notes = computed(() => searchRecords(store.feedback, query.value, ['topic', 'author', 'owner', 'service', 'note']));
const posts = computed(() => searchRecords(store.announcements, query.value, ['title', 'author', 'audience', 'summary']));
const total = computed(() => services.value.length + notes.value.length + posts.value.length);
</script>

<template>
  <div class="hrt-page">
    <PageHeader
      title="Search"
      description="Find a service, a note, or an announcement."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <div class="hrt-search-lg">
      <Search v-model="query" size="lg" placeholder="Try desks, Kavya Poluru, or benefits" clearable />
    </div>

    <EmptyState
      v-if="query && !total"
      title="No matches"
      description="Try a service name or an owner ending in Poluru."
      icon="search"
    />

    <div v-else class="row g-3">
      <div class="col-12 col-lg-4">
        <Card title="Services" :description="`${services.length} found`">
          <List
            :items="services.slice(0, 6).map((item) => ({ id: item.id, label: item.name, description: item.owner, icon: 'folder' }))"
            divided
          />
          <button v-if="services[0]" type="button" class="hrt-text-btn" @click="router.push(`${BASE_PATH}/services/${services[0].id}`)">
            Open {{ services[0].name }}
          </button>
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card title="Feedback" :description="`${notes.length} found`">
          <List
            :items="notes.slice(0, 6).map((item) => ({ id: item.id, label: item.topic, description: item.author, icon: 'star' }))"
            divided
          />
          <button v-if="notes.length" type="button" class="hrt-text-btn" @click="router.push(`${BASE_PATH}/feedback`)">
            Open feedback
          </button>
        </Card>
      </div>
      <div class="col-12 col-lg-4">
        <Card title="Announcements" :description="`${posts.length} found`">
          <List
            :items="posts.slice(0, 6).map((item) => ({ id: item.id, label: item.title, description: item.author, icon: 'bell' }))"
            divided
          />
        </Card>
      </div>
    </div>
  </div>
</template>
