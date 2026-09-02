<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Avatar, Link } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { crm, findAccount } from '../stores/crm.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const tab = ref('people');
const account = computed(() => findAccount(route.params.id));
const crumbs = computed(() => [
  BREADCRUMB_ROOT,
  { label: 'Accounts', to: `${BASE_PATH}/accounts` },
  { label: account.value.name },
]);
const facts = computed(() => [
  { term: 'Industry', description: account.value.industry },
  { term: 'Region', description: account.value.region },
  { term: 'Owner', description: account.value.owner },
  { term: 'Employees', description: account.value.employees },
  { term: 'ARR', description: account.value.arr },
  { term: 'Next', description: account.value.next },
]);
const people = computed(() => crm.contacts.filter((item) => item.accountId === account.value.id));
const related = computed(() => crm.deals.filter((item) => item.accountId === account.value.id));
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      :title="account.name"
      :description="`${account.owner} owns this book. Health is ${account.health.toLowerCase()}.`"
      :crumbs="crumbs"
    >
      <template #actions>
        <StatusBadge :status="account.health" />
      </template>
    </PageHeader>

    <div class="row g-3">
      <div class="col-12 col-xl-5">
        <ChartSection title="Profile">
          <dl class="bloom-facts">
            <div v-for="item in facts" :key="item.term">
              <dt>{{ item.term }}</dt>
              <dd>{{ item.description }}</dd>
            </div>
          </dl>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-7">
        <ChartSection title="Workspace">
          <div class="bloom-tab-row">
            <button type="button" :class="{ 'is-active': tab === 'people' }" @click="tab = 'people'">People</button>
            <button type="button" :class="{ 'is-active': tab === 'deals' }" @click="tab = 'deals'">Deals</button>
          </div>
          <div v-if="tab === 'people'" class="bloom-stack">
            <div v-for="person in people" :key="person.id" class="bloom-row">
              <Avatar :name="person.name" size="sm" />
              <div>
                <strong>{{ person.name }}</strong>
                <div class="bloom-muted">{{ person.title }} · {{ person.influence }}</div>
                <Link :href="`mailto:${person.email}`">{{ person.email }}</Link>
              </div>
              <span class="bloom-muted">{{ person.last }}</span>
            </div>
            <p v-if="!people.length" class="bloom-note">No buying-team contacts yet.</p>
          </div>
          <div v-else class="bloom-stack">
            <RouterLink v-for="deal in related" :key="deal.id" class="bloom-result" :to="`${BASE_PATH}/deals/${deal.id}`">
              <strong>{{ deal.name }}</strong>
              <span>{{ deal.value }} · {{ deal.stage }}</span>
            </RouterLink>
            <p v-if="!related.length" class="bloom-note">No related deals yet.</p>
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
