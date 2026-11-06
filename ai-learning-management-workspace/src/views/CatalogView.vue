<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Badge, Button, Card, Meter, Rating, Search, Tag, Toolbar } from '@poluru-labs/enterprise-design-system-vue'
import LibraryTabs from '@/components/LibraryTabs.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { school, type CourseStatus } from '@/data/school'

const router = useRouter()
const query = ref('')

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return school.courses.filter((course) => {
    if (!term) return true
    return (
      course.title.toLowerCase().includes(term) ||
      course.owner.toLowerCase().includes(term)
    )
  })
})

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
    </template>
  </Toolbar>
  <div class="cy-grid">
    <Card v-for="course in visible" :key="course.id" :title="course.title" :description="course.summary" class="cy-course">
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
    </Card>
  </div>
  <p v-if="visible.length === 0" class="cy-quiet">No courses match.</p>
</template>
