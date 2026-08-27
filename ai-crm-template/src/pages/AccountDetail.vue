<script setup>
import { computed, ref } from 'vue';
import {
  Avatar,
  Breadcrumb,
  Card,
  DescriptionList,
  Link,
  List,
  Status,
  Tabs,
  Tag,
} from '@poluru-labs/enterprise-design-system-vue';
import { contacts, deals, findAccount, healthTone } from '../data';
import { route } from '../ui';

const tab = ref('people');
const account = computed(() => findAccount(route.value.id));
const crumbs = computed(() => [
  { label: 'Accounts', href: '#/accounts' },
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
const people = computed(() => contacts.filter((item) => item.accountId === account.value.id));
const related = computed(() => deals.filter((item) => item.accountId === account.value.id));
</script>

<template>
  <Breadcrumb :items="crumbs" />
  <header class="page-head">
    <div>
      <span class="eyebrow">Account</span>
      <h1>{{ account.name }}</h1>
      <p>{{ account.owner }} owns this book. Health is {{ account.health.toLowerCase() }}.</p>
    </div>
    <Status :label="account.health" :tone="healthTone(account.health)" />
  </header>

  <div class="grid-2">
    <Card title="Profile">
      <DescriptionList :items="facts" />
    </Card>
    <Card title="Workspace">
      <Tabs
        v-model="tab"
        :items="[
          { id: 'people', label: 'People' },
          { id: 'deals', label: 'Deals' },
        ]"
      >
        <template #default="{ active }">
          <div v-if="active === 'people'" class="stack">
            <div v-for="person in people" :key="person.id" class="row">
              <Avatar :name="person.name" size="sm" />
              <div>
                <strong>{{ person.name }}</strong>
                <div class="muted">{{ person.title }} · {{ person.influence }}</div>
                <Link :href="`mailto:${person.email}`">{{ person.email }}</Link>
              </div>
              <Tag :label="person.last" />
            </div>
            <p v-if="!people.length" class="note">No buying-team contacts yet.</p>
          </div>
          <List
            v-else
            :items="related.map((deal) => ({ id: deal.id, label: deal.name, description: `${deal.value} · ${deal.stage}`, icon: 'star' }))"
            divided
          />
        </template>
      </Tabs>
    </Card>
  </div>
</template>
