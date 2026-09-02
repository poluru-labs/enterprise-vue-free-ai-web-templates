<script setup>
import { Avatar } from '@poluru-labs/enterprise-design-system-vue';
import { useRouter } from 'vue-router';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHr } from '../stores/hr.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useHr();
</script>

<template>
  <div class="grove-page">
    <PageHeader
      title="Org"
      description="Simple Grove groups — one card per department, equal height."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Org' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Groups" :value="store.orgGroups.length" icon="bi-diagram-3" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Headcount" :value="store.headcount" icon="bi-people" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Locations" value="4" icon="bi-geo" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="On leave" :value="store.onLeavePeople.length" icon="bi-calendar-heart" tone="warning" />
      </div>
    </div>

    <div class="row g-3">
      <div v-for="group in store.orgGroups" :key="group.id" class="col-12 col-md-6 col-xl-4">
        <article class="grove-org-card">
          <header>
            <div>
              <h3>{{ group.name }}</h3>
              <p class="grove-subtle mb-0">{{ group.lead }} · {{ group.count }} people</p>
            </div>
          </header>
          <ul class="grove-org-list">
            <li
              v-for="person in group.members"
              :key="person.id"
              role="button"
              tabindex="0"
              @click="router.push(`${BASE_PATH}/people/${person.id}`)"
              @keydown.enter="router.push(`${BASE_PATH}/people/${person.id}`)"
            >
              <div class="grove-model-cell">
                <Avatar :name="person.name" size="sm" />
                <div>
                  <strong>{{ person.name }}</strong>
                  <span class="grove-subtle">{{ person.title }}</span>
                </div>
              </div>
              <StatusBadge :status="person.status" />
            </li>
          </ul>
        </article>
      </div>
    </div>
  </div>
</template>
