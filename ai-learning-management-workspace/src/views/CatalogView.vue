<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Kbd,
  Meter,
  Popover,
  Rating,
  Search,
  SegmentedControl,
  Skeleton,
  Tag,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import LibraryTabs from '@/components/LibraryTabs.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { school, type CourseStatus } from '@/data/school'

const router = useRouter()
const query = ref('')
const scope = ref('open')
const loading = ref(false)
const helpOpen = ref(false)

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return school.courses.filter((course) => {
    if (scope.value === 'open' && course.status === 'Closed') return false
    if (!term) return true
    return course.title.toLowerCase().includes(term) || course.owner.toLowerCase().includes(term)
  })
})

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}

function tone(status: CourseStatus) {
  if (status === 'Closed') return 'neutral' as const
  if (status === 'Full') return 'warning' as const
  return 'success' as const
}

function openCourse(id: string) {
  router.push(`/courtyard/catalog/${id}`)
}
</script>

<template>
  <PageHead title="Catalog" lede="Courses on the office shelf." :crumbs="[BREADCRUMB_ROOT, { label: 'Catalog' }]" />
  <LibraryTabs current="catalog" />
  <Toolbar class="cy-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Find a course" />
      <SegmentedControl
        v-model="scope"
        :segments="[
          { value: 'open', label: 'Open' },
          { value: 'all', label: 'All' },
        ]"
      />
    </template>
    <template #end>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Completion" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About the meter</Button>
        </template>
        <p>The meter is how far the class has finished, not a personal score.</p>
      </Popover>
      <Tooltip content="Reload the shelf">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <div v-if="loading" class="cy-grid">
    <Skeleton v-for="n in 3" :key="n" variant="rectangular" width="100%" height="280px" />
  </div>
  <EmptyState
    v-else-if="visible.length === 0"
    title="No courses match"
    description="Try another name, or show every course."
    icon="search"
  />
  <div v-else class="cy-grid">
    <Card v-for="course in visible" :key="course.id" :title="course.title" :description="course.summary" class="cy-course">
      <div class="cy-course-body">
        <div class="cy-course-meta">
          <Tag :label="`${course.hours} hours`" />
          <Badge :label="course.status" :variant="tone(course.status)" soft />
        </div>
        <p class="cy-owner">{{ course.owner }}</p>
        <Meter :value="course.completion" :max="100" label="Completion" show-value />
        <Rating :model-value="course.rating" label="Rating" read-only />
        <div class="cy-course-action">
          <Button type="button" variant="secondary" @click="openCourse(course.id)">Open course</Button>
        </div>
      </div>
    </Card>
  </div>
</template>
