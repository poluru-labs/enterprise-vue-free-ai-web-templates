<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  DescriptionList,
  Rating,
  Status,
  Tag,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { findCourse, type CourseStatus } from '@/data/school'

const route = useRoute()
const router = useRouter()

const course = computed(() => findCourse(String(route.params.id ?? '')))

function tone(status: CourseStatus) {
  if (status === 'Closed') return 'neutral' as const
  if (status === 'Full') return 'warning' as const
  return 'success' as const
}

function enroll() {
  const current = course.value
  if (!current) return
  showToast({
    title: 'Enrolled',
    description: `${current.title} is on your list.`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    v-if="course"
    :title="course.title"
    :lede="course.summary"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Catalog', to: '/courtyard/catalog' }, { label: course.title }]"
  >
    <template #actions>
      <Button type="button" :disabled="course.status === 'Closed'" @click="enroll">Enroll</Button>
    </template>
  </PageHead>
  <section v-if="course" class="cy-detail">
    <div class="cy-detail-top">
      <Avatar :name="course.owner" size="md" />
      <div>
        <p class="cy-owner">{{ course.owner }}</p>
        <div class="cy-course-meta">
          <Tag :label="`${course.hours} hours`" />
          <Status :label="course.status" :tone="tone(course.status)" />
          <Badge :label="`${course.completion}% done`" variant="info" soft />
        </div>
      </div>
      <Rating :model-value="course.rating" label="Rating" read-only />
    </div>
    <DescriptionList
      :items="[
        { term: 'Owner', description: course.owner },
        { term: 'Length', description: `${course.hours} hours` },
        { term: 'Seats', description: course.status },
      ]"
    />
    <h2>Outline</h2>
    <Accordion :items="course.outline" />
    <h2>Sessions</h2>
    <Timeline :items="course.sessions" />
    <Button type="button" variant="secondary" @click="router.push('/courtyard/catalog')">Back to catalog</Button>
  </section>
  <p v-else class="cy-quiet">That course is not on the shelf.</p>
</template>
