<script setup lang="ts">
import { computed } from 'vue'
import { Button, ButtonGroup, Input, Modal, Select, Textarea, TimePicker, showToast } from '@poluru-labs/enterprise-design-system-vue'
import { CHANNELS } from '@/constants/navigation'
import { WEEK, composer, saveComposer } from '@/data/desk'

const channelOptions = CHANNELS.map((channel) => ({ value: channel, label: channel }))
const dayOptions = WEEK.map((day) => ({ value: day.id, label: `${day.name} ${day.date}` }))
const heading = computed(() => (composer.id ? 'Edit post' : 'New post'))

function file(state: 'Draft' | 'Scheduled') {
  const title = saveComposer(state)
  if (!title) return
  showToast({
    title: state === 'Draft' ? 'Draft filed' : 'Scheduled',
    description: state === 'Draft' ? `${title} is in drafts.` : `${title} is on the week.`,
    variant: 'success',
  })
}
</script>

<template>
  <Modal v-model:open="composer.open" :heading="heading">
    <div class="po-form">
      <Input v-model="composer.title" label="Title" />
      <Textarea v-model="composer.caption" label="Caption" />
      <Select v-model="composer.channel" label="Channel" :options="channelOptions" />
      <Select v-model="composer.day" label="Day" :options="dayOptions" />
      <TimePicker v-model="composer.time" label="Time" />
    </div>
    <template #footer>
      <ButtonGroup>
        <Button type="button" variant="secondary" @click="file('Draft')">Save draft</Button>
        <Button type="button" @click="file('Scheduled')">Schedule</Button>
      </ButtonGroup>
    </template>
  </Modal>
</template>
