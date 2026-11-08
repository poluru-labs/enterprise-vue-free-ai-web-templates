<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Stepper, Tag } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, STAGES } from '@/constants/navigation'
import { candidatesFor, desk, type Stage } from '@/data/desk'

const router = useRouter()
const steps = STAGES.map((stage) => ({ id: stage.id, label: stage.label, description: stage.description }))
const openRoles = computed(() => desk.roles.filter((role) => role.status === 'Open'))

function stageIndex(focus: Stage) {
  const index = STAGES.findIndex((stage) => stage.label === focus)
  return index < 0 ? 0 : index
}
</script>

<template>
  <PageHead
    title="Roles"
    lede="Open jobs and where each one sits."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Roles' }]"
  />
  <div class="hw-pipeline">
    <article v-for="role in openRoles" :key="role.id" class="hw-role">
      <div>
        <h2>{{ role.title }}</h2>
        <p>
          <Tag :label="role.location" />
          <span class="hw-quiet">{{ candidatesFor(role.id).length }} candidates</span>
        </p>
        <Button type="button" size="sm" variant="secondary" @click="router.push(`${BASE_PATH}/roles/${role.id}`)">
          Open
        </Button>
      </div>
      <div class="hw-step">
        <Stepper :steps="steps" :active-index="stageIndex(role.focus)" />
      </div>
    </article>
  </div>
</template>
