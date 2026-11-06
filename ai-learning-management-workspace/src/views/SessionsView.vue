<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { school } from '@/data/school'

const open = ref(false)
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

function book() {
  const course = school.courses.find((item) => item.id === form.course)
  school.bookings.unshift({
    id: `bk-${school.bookings.length + 1}`,
    title: form.title.trim() || 'Classroom session',
    course: course?.title ?? 'Course',
    room: form.room,
    date: form.date,
    time: form.time,
    note: form.note.trim(),
  })
  open.value = false
  showToast({
    title: 'Session booked',
    description: `${form.title.trim() || 'Classroom session'} · ${form.room}`,
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
    <Button type="submit">Book session</Button>
  </form>
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
      <Button type="button" @click="book">Confirm</Button>
    </template>
  </Modal>
</template>
