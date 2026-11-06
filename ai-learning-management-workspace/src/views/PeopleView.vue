<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Autocomplete,
  CircularProgress,
  DataTable,
  Drawer,
  EmptyState,
  Pagination,
  ProgressBar,
  Search,
  Stat,
} from '@poluru-labs/enterprise-design-system-vue'
import LibraryTabs from '@/components/LibraryTabs.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { school } from '@/data/school'

const page = ref(1)
const query = ref('')
const picked = ref('')
const drawerOpen = ref(false)
const pageSize = 5

const filtered = computed(() => {
  const term = query.value.trim().toLowerCase()
  return school.learners.filter((learner) => {
    if (!term) return true
    return learner.name.toLowerCase().includes(term) || learner.course.toLowerCase().includes(term)
  })
})

const rows = computed(() =>
  filtered.value.map((learner) => ({
    id: learner.id,
    name: learner.name,
    role: learner.role,
    course: learner.course,
    completion: `${learner.completion}%`,
  })),
)

const pageCount = computed(() => Math.max(1, Math.ceil(rows.value.length / pageSize)))
const visible = computed(() => rows.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const average = computed(() => {
  if (school.learners.length === 0) return 0
  const total = school.learners.reduce((sum, learner) => sum + learner.completion, 0)
  return Math.round(total / school.learners.length)
})
const record = computed(() => school.learners.find((learner) => learner.name === picked.value))

function openRecord(value: string) {
  picked.value = value
  drawerOpen.value = Boolean(value)
}
</script>

<template>
  <PageHead title="People" lede="Who is in which course." :crumbs="[BREADCRUMB_ROOT, { label: 'People' }]" />
  <LibraryTabs current="people" />
  <div class="cy-people-top">
    <Stat label="Learners" :value="String(school.learners.length)" hint="On the roster" />
    <CircularProgress :value="average" show-value label="Mean completion" />
    <ProgressBar label="Mean completion" :value="average" show-value />
  </div>
  <div class="cy-form">
    <Search v-model="query" placeholder="Find a person" />
    <Autocomplete
      v-model="picked"
      label="Open a record"
      :options="school.learners.map((learner) => ({ value: learner.name, label: learner.name }))"
      @update:model-value="openRecord"
    />
  </div>
  <EmptyState
    v-if="rows.length === 0"
    title="No one matches"
    description="Try another name or course."
    icon="search"
  />
  <template v-else>
    <div class="cy-table">
      <DataTable
        :columns="[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'role', label: 'Role' },
          { key: 'course', label: 'Course' },
          { key: 'completion', label: 'Done' },
        ]"
        :rows="visible"
        compact
        striped
      />
    </div>
    <Pagination v-model:page="page" :page-count="pageCount" />
  </template>
  <Drawer v-model:open="drawerOpen" :heading="record?.name ?? 'Record'" size="md">
    <p v-if="record">{{ record.role }} · {{ record.course }} · {{ record.completion }}% done.</p>
  </Drawer>
</template>
