<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Button,
  Checkbox,
  DatePicker,
  DateRangePicker,
  FileUpload,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Select,
  SplitButton,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { school } from '@/data/school'

const open = ref(false)
const roomFree = ref(true)
const notice = ref('quiet')
const rangeStart = ref('2026-11-01')
const rangeEnd = ref('2026-11-30')
const form = reactive({
  course: 'crs-onboard',
  room: 'Room A',
  date: '2026-11-10',
  time: '09:00',
  title: 'Morning session',
  note: '',
})

const courseOptions = school.courses.map((course) => ({ value: course.id, label: course.title }))
const roomOptions = school.rooms.map((room) => ({ value: room, label: room }))

function book(notify: boolean) {
  const course = school.courses.find((item) => item.id === form.course)
  const title = form.title.trim() || 'Classroom session'
  school.bookings.unshift({
    id: `bk-${school.bookings.length + 1}`,
    title,
    course: course?.title ?? 'Course',
    room: form.room,
    date: form.date,
    time: form.time,
    note: form.note.trim(),
  })
  open.value = false
  showToast({
    title: notify ? 'Session booked and noted' : 'Session booked',
    description: `${title} · ${form.room}`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead title="Sessions" lede="Book a room for a class." :crumbs="[BREADCRUMB_ROOT, { label: 'Sessions' }]" />
  <form class="cy-form" @submit.prevent="open = true">
    <Select v-model="form.course" label="Course" :options="courseOptions" />
    <Select v-model="form.room" label="Room" :options="roomOptions" />
    <DatePicker v-model="form.date" label="Date" />
    <TimePicker v-model="form.time" label="Time" />
    <Input v-model="form.title" label="Title" />
    <Textarea v-model="form.note" label="Note" />
    <RadioGroup v-model="notice" label="Notice" orientation="horizontal">
      <Radio value="quiet" label="Quiet" />
      <Radio value="mail" label="Mail the owner" />
    </RadioGroup>
    <Checkbox v-model="roomFree" label="The room is free" />
    <FileUpload label="Roster" @files-change="() => undefined" />
    <SplitButton label="Book session" @click="open = true" @select="book(notice === 'mail')" />
  </form>
  <div class="cy-form">
    <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" />
  </div>
  <section class="cy-panel">
    <h2>On the board</h2>
    <ul class="cy-bookings">
      <li v-for="booking in school.bookings" :key="booking.id">
        <strong>{{ booking.title }}</strong>
        <span>{{ booking.course }} · {{ booking.room }} · {{ booking.date }} {{ booking.time }}</span>
      </li>
    </ul>
  </section>
  <Modal :open="open" heading="Book this session?" @update:open="open = $event">
    <p>{{ form.title }} in {{ form.room }} on {{ form.date }} at {{ form.time }}.</p>
    <template #footer>
      <Button type="button" variant="secondary" @click="open = false">Cancel</Button>
      <Button type="button" @click="book(notice === 'mail')">Confirm</Button>
    </template>
  </Modal>
</template>
