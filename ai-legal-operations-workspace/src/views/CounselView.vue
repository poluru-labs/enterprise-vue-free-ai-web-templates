<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, DescriptionList } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { ledger } from '@/data/ledger'

const selectedId = ref('cs-1')
const selected = computed(() => ledger.counsel.find((person) => person.id === selectedId.value) ?? ledger.counsel[0])
</script>

<template>
  <PageHead title="Counsel" lede="Who holds which file." :crumbs="[BREADCRUMB_ROOT, { label: 'Counsel' }]" />
  <div class="bw-directory">
    <button
      v-for="person in ledger.counsel"
      :key="person.id"
      type="button"
      class="bw-directory-row"
      :class="{ 'is-selected': person.id === selected?.id }"
      @click="selectedId = person.id"
    >
      <Avatar :name="person.name" size="sm" />
      <span>
        <strong>{{ person.name }}</strong>
        <span>{{ person.firm }}</span>
      </span>
    </button>
  </div>
  <DescriptionList
    v-if="selected"
    class="bw-block"
    :items="[
      { term: 'Name', description: selected.name },
      { term: 'Firm', description: selected.firm },
      { term: 'Role', description: selected.role },
      { term: 'Matter', description: selected.matters },
    ]"
  />
</template>
