<script setup lang="ts">
import { computed, ref } from 'vue'
import { DataTable, Pagination } from '@poluru-labs/enterprise-design-system-vue'
import LibraryTabs from '@/components/LibraryTabs.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { school } from '@/data/school'

const page = ref(1)
const pageSize = 5

const rows = computed(() =>
  school.learners.map((learner) => ({
    id: learner.id,
    name: learner.name,
    role: learner.role,
    course: learner.course,
    completion: `${learner.completion}%`,
  })),
)

const pageCount = computed(() => Math.max(1, Math.ceil(rows.value.length / pageSize)))
const visible = computed(() => rows.value.slice((page.value - 1) * pageSize, page.value * pageSize))
</script>

<template>
  <PageHead title="People" lede="Who is in which course." :crumbs="[BREADCRUMB_ROOT, { label: 'People' }]" />
  <LibraryTabs current="people" />
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
