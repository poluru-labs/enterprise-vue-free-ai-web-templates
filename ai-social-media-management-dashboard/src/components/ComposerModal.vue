<script setup lang="ts">
import { computed } from 'vue'
import { Button, ButtonGroup, FileUpload, Input, Modal, Select, Stepper, Textarea, TimePicker, showToast } from '@poluru-labs/enterprise-design-system-vue'
import { CHANNELS } from '@/constants/navigation'
import { WEEK, composer, findPost, saveComposer } from '@/data/desk'

const channelOptions = CHANNELS.map((channel) => ({ value: channel, label: channel }))
const dayOptions = WEEK.map((day) => ({ value: day.id, label: `${day.name} ${day.date}` }))
const heading = computed(() => (composer.id ? 'Edit post' : 'New post'))
const steps = [
  { id: 'draft', label: 'Draft', description: 'Off the board.' },
  { id: 'scheduled', label: 'Scheduled', description: 'On the week.' },
  { id: 'posted', label: 'Posted', description: 'Sent.' },
]
const stepIndex = computed(() => {
  const state = composer.id ? findPost(composer.id)?.state : 'Draft'
  if (state === 'Posted') return 2
  if (state === 'Scheduled') return 1
  return 0
})

function file(state: 'Draft' | 'Scheduled') {
  const title = saveComposer(state)
  if (!title) return
  showToast({
    title: state === 'Draft' ? 'Draft filed' : 'Scheduled',
    description: state === 'Draft' ? `${title} is in drafts.` : `${title} is on the week.`,
    variant: 'success',
  })
}

function onFile() {
  showToast({ title: 'File attached', description: 'The file stays with the post.', variant: 'success' })
}
</script>

<template>
  <Modal v-model:open="composer.open" :heading="heading">
    <div class="po-form">
      <div class="po-step">
        <Stepper :steps="steps" :active-index="stepIndex" />
      </div>
      <Input v-model="composer.title" label="Title" />
      <Textarea v-model="composer.caption" label="Caption" />
      <Select v-model="composer.channel" label="Channel" :options="channelOptions" />
      <Select v-model="composer.day" label="Day" :options="dayOptions" />
      <TimePicker v-model="composer.time" label="Time" />
      <FileUpload label="Attach a file" accept=".jpg,.png,.pdf" @files-change="onFile" />
    </div>
    <template #footer>
      <ButtonGroup>
        <Button type="button" variant="secondary" @click="file('Draft')">Save draft</Button>
        <Button type="button" @click="file('Scheduled')">Schedule</Button>
      </ButtonGroup>
    </template>
  </Modal>
</template>
