<script setup lang="ts">
import { Alert, List, Stepper } from '@poluru-labs/enterprise-design-system-vue'
import LibraryTabs from '@/components/LibraryTabs.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { school } from '@/data/school'
</script>

<template>
  <PageHead
    title="Paths"
    lede="The order a new hire walks through."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Paths' }]"
  />
  <LibraryTabs current="paths" />
  <Alert class="cy-block" title="Gowri Poluru is on Onboarding.">
    Safety is next. Writing for clients comes after that.
  </Alert>
  <section class="cy-panel">
    <h2>New hire</h2>
    <Stepper :steps="school.newHire" :active-index="0" />
    <List
      :items="
        school.newHire.map((step) => ({
          id: step.id,
          label: step.label,
          description: step.description,
        }))
      "
    />
  </section>
</template>
