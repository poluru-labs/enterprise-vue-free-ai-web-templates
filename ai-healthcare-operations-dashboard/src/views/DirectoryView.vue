<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, Search } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/board'

const query = ref('')

const people = computed(() =>
  desk.staff.filter((person) =>
    `${person.name} ${person.role} ${person.unit}`.toLowerCase().includes(query.value.trim().toLowerCase()),
  ),
)
</script>

<template>
  <PageHead
    title="Directory"
    lede="The house roster."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Directory' }]"
  />

  <Search v-model="query" class="wl-toolbar" placeholder="Search a name or unit" clearable />

  <div class="wl-roster">
    <article v-for="person in people" :key="person.id" class="wl-person">
      <Avatar :name="person.name" size="md" />
      <div>
        <strong>{{ person.name }}</strong>
        <p class="wl-quiet">{{ person.role }} · {{ person.unit }}</p>
      </div>
    </article>
  </div>
</template>
