<script setup>
import StatusBadge from './StatusBadge.vue';

defineProps({
  course: { type: Object, required: true },
});
</script>

<template>
  <article class="grove-course-card">
    <header>
      <span class="grove-chip">{{ course.category }}</span>
      <StatusBadge :status="course.status" />
    </header>
    <h3>{{ course.title }}</h3>
    <p>{{ course.summary }}</p>
    <div class="grove-card-meta">
      <span>{{ course.hours }}h</span>
      <span>{{ course.enrolled }} enrolled</span>
    </div>
    <p class="grove-subtle mt-auto">{{ course.instructor }} · due {{ course.due }}</p>
  </article>
</template>
