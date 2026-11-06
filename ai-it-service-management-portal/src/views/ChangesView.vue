<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Accordion,
  Alert,
  CircularProgress,
  Divider,
  Drawer,
  Meter,
  ProgressBar,
  Stepper,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'

const open = ref(false)
const activeId = ref('ch1')
const next = computed(() => desk.changes[0])
const active = computed(() => desk.changes.find((change) => change.id === activeId.value) ?? next.value)
const notes = computed(() => desk.changes.map((change) => ({ id: change.id, title: change.title, content: change.note })))
</script>

<template>
  <PageHead
    title="Changes"
    lede="Windows that are already on the calendar."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Changes' }]"
  />

  <Alert
    v-if="next"
    class="dk-alert"
    variant="info"
    :title="next.title"
    :message="`${next.window} · ${next.owner}`"
  />

  <div class="dk-prep">
    <div class="dk-dial">
      <CircularProgress :value="40" show-value label="Prep" />
    </div>
    <Meter :value="1" :max="3" label="Windows this week" show-value />
    <ProgressBar label="Prep" :value="40" show-value />
  </div>

  <Stepper
    class="dk-stepper"
    :active-index="0"
    :steps="desk.changes.map((change) => ({ id: change.id, label: change.title, description: change.window }))"
  />

  <Divider />
  <Accordion class="dk-alert" :items="notes" />

  <div class="dk-change-list">
    <article v-for="change in desk.changes" :key="change.id">
      <h2>{{ change.title }}</h2>
      <p class="dk-quiet">{{ change.window }} · {{ change.owner }}</p>
      <p>{{ change.note }}</p>
      <button type="button" class="dk-text-btn" @click="activeId = change.id; open = true">Open window</button>
    </article>
  </div>

  <Drawer v-model:open="open" :heading="active?.title || 'Change'" size="md">
    <p v-if="active" class="dk-quiet">{{ active.window }} · {{ active.owner }}</p>
    <p v-if="active">{{ active.note }}</p>
  </Drawer>
</template>
