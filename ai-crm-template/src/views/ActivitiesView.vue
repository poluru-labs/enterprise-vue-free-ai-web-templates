<script setup>
import { ref } from 'vue';
import {
  Button,
  ButtonGroup,
  Checkbox,
  DatePicker,
  Radio,
  RadioGroup,
  TimePicker,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import activities from '../data/activities.json';
import overview from '../data/overview.json';
import { crm, openActivityDrawer } from '../stores/crm.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const day = ref('2026-08-27');
const when = ref('16:20');
const includeTasks = ref(true);
const view = ref('agenda');
const step = ref(1);
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Activities"
      description="Priya Poluru’s afternoon is Harbor legal, then a Fieldwork discount review with Elena Poluru."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Activities' }]"
    >
      <template #actions>
        <Button icon="plus" @click="openActivityDrawer()">Log activity</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-6">
        <ChartSection title="Agenda filters">
          <div class="bloom-form-grid">
            <DatePicker v-model="day" label="Day" />
            <TimePicker v-model="when" label="Focus time" />
            <Checkbox class="full" v-model="includeTasks" label="Include tasks and internal reviews" />
            <RadioGroup v-model="view" class="full" label="View" orientation="horizontal">
              <Radio value="agenda" label="Agenda" />
              <Radio value="timeline" label="Timeline" />
            </RadioGroup>
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-6">
        <ChartSection title="Email sequence" subtitle="Harbor expansion · step 2 of 4">
          <ol class="bloom-stepper">
            <li v-for="(item, index) in activities.sequenceSteps" :key="item.id" :class="{ 'is-active': index <= step }">
              {{ item.label }}
            </li>
          </ol>
          <ButtonGroup class="mt-3">
            <Button size="sm" variant="secondary" :disabled="step <= 0" @click="step -= 1">Back</Button>
            <Button size="sm" :disabled="step >= activities.sequenceSteps.length - 1" @click="step += 1">Next step</Button>
          </ButtonGroup>
        </ChartSection>
      </div>
    </div>

    <ChartSection title="Today" :subtitle="`${crm.agenda.length} items on the book`">
      <div v-if="view === 'agenda'" class="bloom-stack">
        <div v-for="item in crm.agenda" :key="item.id" class="bloom-row-between">
          <div>
            <strong>{{ item.title }}</strong>
            <div class="bloom-muted">{{ item.with }} · {{ item.time }}</div>
          </div>
          <StatusBadge :status="item.type" />
        </div>
      </div>
      <Timeline v-else :items="overview.timeline" />
    </ChartSection>
  </div>
</template>
