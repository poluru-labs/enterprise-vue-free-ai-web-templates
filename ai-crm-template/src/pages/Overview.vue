<script setup>
import { ref } from 'vue';
import { Accordion, Alert, Badge, Button, Card, CircularProgress, List, Meter, ProgressBar, SegmentedControl, Stat, Status, Tabs, Timeline } from '@poluru-labs/enterprise-design-system-vue';
import { agenda, atRisk, kpis, pipelineMonths, playbooks, sparkPoints, teamBoard, timelineItems } from '../data';
import { go } from '../ui';

const emit = defineEmits(['create-deal', 'log-activity']);
const range = ref('month');
const tab = ref('commit');
const spark = sparkPoints(pipelineMonths);
</script>

<template>
  <header class="page-head hero">
    <div class="hero-copy">
      <span class="eyebrow">Workspace</span>
      <h1>Overview</h1>
      <p>FY26 Q3 · Priya Poluru · 78% to quota</p>
    </div>
    <div class="row">
      <SegmentedControl
        v-model="range"
        :segments="[
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'quarter', label: 'Quarter' },
        ]"
      />
      <Button variant="secondary" icon="calendar" @click="emit('log-activity')">Log activity</Button>
      <Button icon="plus" @click="emit('create-deal')">New deal</Button>
    </div>
  </header>

  <Alert
    class="mb-3"
    variant="info"
    title="Next best action"
    message="Book 15 minutes with Meera Poluru before 17:00. Harbor’s $184k expansion is still in commit if legal moves today."
  />

  <section class="metrics">
    <Card v-for="item in kpis" :key="item.label">
      <Stat :label="item.label" :value="item.value" :hint="item.hint" :trend="item.trend" :trend-value="item.trendValue" />
    </Card>
  </section>

  <div class="grid-2">
    <div class="stack">
      <Card title="Pipeline pulse" description="Trailing twelve months · $4.86M open">
        <svg class="spark" viewBox="0 0 220 56" aria-hidden="true">
          <polyline :points="spark" />
          <circle cx="220" cy="4" r="3.5" />
        </svg>
        <ProgressBar label="Quota attained" :value="78" show-value />
        <Meter class="mt-3" label="Commit coverage" :value="1.4" :min="0" :max="3" :low="1" :high="2" :optimum="2" show-value />
      </Card>
      <Card title="Team board">
        <div class="stack">
          <div v-for="rep in teamBoard" :key="rep.name" class="row" style="justify-content: space-between">
            <div>
              <strong>{{ rep.name }}</strong>
              <div class="muted">{{ rep.closed }} closed · {{ rep.pipeline }} pipeline</div>
            </div>
            <Badge :label="`${rep.quota}%`" :variant="rep.quota >= 70 ? 'success' : 'warning'" pill />
          </div>
        </div>
      </Card>
    </div>
    <div class="stack">
      <Card title="AI coaching" description="Next actions for Priya Poluru this afternoon">
        <Tabs
          class="coach-tabs"
          v-model="tab"
          :items="[
            { id: 'commit', label: 'Commit' },
            { id: 'risk', label: 'At risk' },
            { id: 'motion', label: 'Motion' },
          ]"
        >
          <template #default="{ active }">
            <div v-if="active === 'commit'" class="stack">
              <p class="note">Keep Harbor and Fieldwork in commit. Weighted coverage is 1.4×.</p>
              <Accordion :items="playbooks" />
            </div>
            <List v-else-if="active === 'risk'" :items="atRisk.map((item) => ({ ...item, icon: 'alert-triangle' }))" divided />
            <Timeline v-else :items="timelineItems.slice(0, 3)" />
          </template>
        </Tabs>
      </Card>
      <Card title="Today">
        <div class="stack">
          <div v-for="item in agenda" :key="item.id" class="row" style="justify-content: space-between">
            <div>
              <strong>{{ item.title }}</strong>
              <div class="muted">{{ item.with }} · {{ item.time }}</div>
            </div>
            <Status :label="item.type" :tone="item.type === 'Task' ? 'warning' : 'info'" />
          </div>
        </div>
      </Card>
    </div>
  </div>

  <div class="grid-3" style="margin-top: 0.85rem">
    <Card title="Playbooks">
      <div class="stack">
        <div v-for="item in playbooks" :key="item.id">
          <strong>{{ item.title }}</strong>
          <p class="note">{{ item.content }}</p>
        </div>
      </div>
      <template #footer>
        <Button size="sm" variant="secondary" @click="go('#/activities')">Open agenda</Button>
      </template>
    </Card>
    <Card title="Health">
      <div class="row" style="justify-content: space-around; padding: 0.4rem 0 0.8rem">
        <div style="text-align: center">
          <CircularProgress :value="86" show-value label="Harbor health" />
          <div class="muted">Harbor</div>
        </div>
        <div style="text-align: center">
          <CircularProgress :value="42" show-value label="Nimbus health" />
          <div class="muted">Nimbus</div>
        </div>
      </div>
    </Card>
    <Card title="Follow-ups">
      <Timeline :items="timelineItems" />
    </Card>
  </div>
</template>
