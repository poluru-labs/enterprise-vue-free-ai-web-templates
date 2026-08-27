<script setup>
import { ref } from 'vue';
import {
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  DatePicker,
  Radio,
  RadioGroup,
  Status,
  Stepper,
  TimePicker,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue';
import { agenda, sequenceSteps, timelineItems } from '../data';

const emit = defineEmits(['log-activity']);
const day = ref('2026-08-27');
const when = ref('16:20');
const includeTasks = ref(true);
const view = ref('agenda');
const step = ref(1);
</script>

<template>
  <header class="page-head">
    <div>
      <span class="eyebrow">Calendar</span>
      <h1>Activities</h1>
      <p>Priya Poluru’s afternoon is Harbor legal, then a Fieldwork discount review with Elena Poluru.</p>
    </div>
    <Button icon="plus" @click="emit('log-activity')">Log activity</Button>
  </header>

  <div class="grid-2">
    <Card title="Agenda filters">
      <div class="form-grid">
        <DatePicker v-model="day" label="Day" />
        <TimePicker v-model="when" label="Focus time" />
        <Checkbox class="full" v-model="includeTasks" label="Include tasks and internal reviews" />
        <RadioGroup v-model="view" class="full" label="View" orientation="horizontal">
          <Radio value="agenda" label="Agenda" />
          <Radio value="timeline" label="Timeline" />
        </RadioGroup>
      </div>
    </Card>
    <Card title="Email sequence" description="Harbor expansion · step 2 of 4">
      <Stepper :steps="sequenceSteps" :active-index="step" />
      <ButtonGroup class="mt-3">
        <Button size="sm" variant="secondary" :disabled="step <= 0" @click="step -= 1">Back</Button>
        <Button size="sm" :disabled="step >= sequenceSteps.length - 1" @click="step += 1">Next step</Button>
      </ButtonGroup>
    </Card>
  </div>

  <Card class="mt-3" title="Today">
    <div v-if="view === 'agenda'" class="stack">
      <div v-for="item in agenda" :key="item.id" class="row" style="justify-content: space-between">
        <div>
          <strong>{{ item.title }}</strong>
          <div class="muted">{{ item.with }} · {{ item.time }}</div>
        </div>
        <Status :label="item.type" :tone="item.type === 'Meeting' ? 'info' : 'neutral'" />
      </div>
    </div>
    <Timeline v-else :items="timelineItems" />
  </Card>
</template>
