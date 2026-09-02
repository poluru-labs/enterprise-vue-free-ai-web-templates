<script setup>
import StatusBadge from './StatusBadge.vue';

defineProps({
  req: { type: Object, required: true },
});

function pipelineTotal(req) {
  return Object.values(req.pipeline || {}).reduce((sum, value) => sum + Number(value || 0), 0);
}
</script>

<template>
  <article class="grove-req-card">
    <header>
      <h3>{{ req.title }}</h3>
      <StatusBadge :status="req.status" />
    </header>
    <p>{{ req.department }} · {{ req.location }}</p>
    <div class="grove-card-meta">
      <span>{{ req.openings }} open</span>
      <span>{{ pipelineTotal(req) }} in pipeline</span>
    </div>
    <ul class="grove-pipeline">
      <li v-for="(count, stage) in req.pipeline" :key="stage">
        <strong>{{ count }}</strong>
        <span>{{ stage }}</span>
      </li>
    </ul>
    <p class="grove-subtle mt-auto">{{ req.recruiter }} · posted {{ req.posted }}</p>
  </article>
</template>
