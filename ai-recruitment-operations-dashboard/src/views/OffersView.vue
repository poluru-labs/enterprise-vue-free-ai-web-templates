<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Badge, Status } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, roleTitle } from '@/data/desk'

const router = useRouter()
const offers = computed(() => desk.candidates.filter((candidate) => candidate.stage === 'Offer'))
</script>

<template>
  <PageHead
    title="Offers"
    lede="Terms that are out."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Offers' }]"
  />
  <div class="hw-list">
    <button
      v-for="candidate in offers"
      :key="candidate.id"
      type="button"
      class="hw-person"
      @click="router.push(`${BASE_PATH}/candidates/${candidate.id}`)"
    >
      <span>
        <strong>{{ candidate.name }}</strong>
        <span class="hw-quiet">{{ roleTitle(candidate.roleId) }}</span>
      </span>
      <Badge label="Sent" variant="brand" soft />
      <Status label="Offer" tone="success" />
    </button>
  </div>
</template>
