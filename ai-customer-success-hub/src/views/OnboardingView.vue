<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  FileUpload,
  ProgressBar,
  Stepper,
  TimePicker,
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import playbook from '../data/playbook.json';
import { BASE_PATH, BREADCRUMB_ROOT, ONBOARDING_STEPS } from '../constants/navigation.js';
import { useSuccess } from '../stores/success.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useSuccess();
const selectedId = ref(store.onboarding[0]?.id || '');
const playId = ref('play-train-admins');
const callTime = ref(store.onboarding[0]?.time || '15:30');

const current = computed(() => store.onboarding.find((item) => item.id === selectedId.value) || store.onboarding[0]);
const stepIndex = computed(() => ONBOARDING_STEPS.findIndex((step) => step.id === current.value?.stage));
const playNote = computed(() => playbook.notes[playId.value] || 'Select a step in the playbook.');

function choose(id) {
  selectedId.value = id;
  const next = store.onboarding.find((item) => item.id === id);
  if (next) callTime.value = next.time;
}

function onFiles() {
  showToast({
    title: 'Kickoff file added',
    description: `${current.value?.owner || 'The owner'} can share it in the workspace.`,
    variant: 'success',
  });
}
</script>

<template>
  <div class="mrg-page">
    <PageHeader
      title="Onboarding"
      description="Kickoff, integration, training, and go-live for new accounts."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Onboarding' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="In motion" :value="store.liveOnboarding.length" icon="bi-signpost" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Live" :value="store.onboarding.filter((item) => item.stage === 'live').length" icon="bi-check2" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Next go-live" value="28 Oct" icon="bi-calendar-check" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Owners" value="4" icon="bi-people" tone="brand" />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-5">
        <ChartSection title="Accounts" subtitle="Select a workspace">
          <ul class="mrg-pick-list">
            <li v-for="item in store.onboarding" :key="item.id">
              <button type="button" :class="{ 'is-active': item.id === current?.id }" @click="choose(item.id)">
                <strong>{{ item.account }}</strong>
                <span>{{ item.owner }} · live {{ formatDate(item.goLive) }}</span>
                <StatusBadge :status="item.stage" />
              </button>
            </li>
          </ul>
        </ChartSection>
      </div>
      <div v-if="current" class="col-12 col-xl-7">
        <ChartSection :title="current.account" :subtitle="current.note">
          <Stepper :steps="ONBOARDING_STEPS" :active-index="Math.max(stepIndex, 0)" />
          <ProgressBar class="mt-3" label="Progress" :value="current.progress" show-value />
          <div class="mrg-form-stack">
            <TimePicker v-model="callTime" label="Standing call" />
            <FileUpload label="Kickoff notes" hint="PDF or doc" @files-change="onFiles" />
          </div>
          <button type="button" class="mrg-text-btn" @click="router.push(`${BASE_PATH}/accounts/${current.accountId}`)">
            Open {{ current.account }}
          </button>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Playbook" subtitle="Shared steps for every new account">
          <TreeView :nodes="playbook.tree" @select="playId = $event" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-7">
        <ChartSection title="Step note" subtitle="What the owner does next">
          <p class="mb-0">{{ playNote }}</p>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
