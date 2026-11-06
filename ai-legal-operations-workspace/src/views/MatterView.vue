<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Accordion,
  Avatar,
  Button,
  DescriptionList,
  Divider,
  List,
  Tag,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { findMatter } from '@/data/ledger'

const route = useRoute()
const router = useRouter()
const matter = computed(() => findMatter(String(route.params.id ?? '')))

function noteFiled() {
  const current = matter.value
  if (!current) return
  showToast({
    title: 'Note filed',
    description: `${current.number} has a desk note.`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    v-if="matter"
    :title="matter.number"
    :lede="matter.summary"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Matters', to: '/briefwell/matters' }, { label: matter.number }]"
  >
    <template #actions>
      <Button type="button" @click="noteFiled">File a note</Button>
    </template>
  </PageHead>
  <article v-if="matter" class="bw-doc">
    <div class="bw-party">
      <Avatar :name="matter.owner" size="md" />
      <div>
        <p class="bw-quiet">{{ matter.owner }}</p>
        <Tag :label="matter.kind" />
      </div>
    </div>
    <h2>{{ matter.title }}</h2>
    <DescriptionList
      :items="[
        { term: 'Party', description: matter.party },
        { term: 'Owner', description: matter.owner },
        { term: 'Opened', description: matter.opened },
        { term: 'Due', description: matter.due },
        { term: 'Status', description: matter.status },
      ]"
    />
    <Divider />
    <h2>Clauses</h2>
    <Accordion :items="matter.clauses" />
    <h2>Dates</h2>
    <Timeline :items="matter.dates" />
    <h2>Files</h2>
    <List :items="matter.files" />
    <Button type="button" variant="secondary" @click="router.push('/briefwell/matters')">Back to matters</Button>
  </article>
  <p v-else class="bw-quiet">That matter is not in the ledger.</p>
</template>
