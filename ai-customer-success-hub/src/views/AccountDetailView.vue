<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Avatar,
  CodeSnippet,
  DescriptionList,
  EmptyState,
  FileUpload,
  Link,
  Popover,
  ProgressBar,
  Rating,
  Slider,
  Stepper,
  Tabs,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, ONBOARDING_STEPS } from '../constants/navigation.js';
import { useSuccess } from '../stores/success.js';
import { formatDate, formatMoney, healthBand } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useSuccess();
const tab = ref('health');
const noteOpen = ref(false);

const account = computed(() => store.getAccount(route.params.id));
const renewal = computed(() => store.renewals.find((item) => item.accountId === account.value?.id));
const onboarding = computed(() => store.onboarding.find((item) => item.accountId === account.value?.id));
const activity = computed(() => store.activities.filter((item) => item.accountId === account.value?.id));
const stepIndex = computed(() => {
  const index = ONBOARDING_STEPS.findIndex((step) => step.id === onboarding.value?.stage);
  return index < 0 ? 0 : index;
});

const facts = computed(() => {
  if (!account.value) return [];
  return [
    { term: 'Owner', description: account.value.owner },
    { term: 'Segment', description: account.value.segment },
    { term: 'Region', description: account.value.region },
    { term: 'ARR', description: formatMoney(account.value.arr) },
    { term: 'Seats', description: String(account.value.seats) },
    { term: 'Renewal', description: formatDate(account.value.renewal) },
    { term: 'Next call', description: account.value.nextCall },
    { term: 'Stage', description: account.value.stage },
  ];
});

const timeline = computed(() =>
  activity.value.map((item) => ({
    title: item.title,
    description: item.note,
    time: formatDate(item.when),
  })),
);

function onHealth(value) {
  if (!account.value) return;
  store.updateAccount(account.value.id, { health: value });
}

function onFiles(detail) {
  const count = detail?.files?.length || 0;
  showToast({
    title: count ? 'Deck attached' : 'No file selected',
    description: count ? `${count} file ready for the next QBR.` : 'Choose a deck to attach.',
    variant: count ? 'success' : 'info',
  });
}
</script>

<template>
  <div class="mrg-page">
    <EmptyState
      v-if="!account"
      title="Account not on the book"
      description="It may have been removed from this session."
      icon="search"
    />

    <template v-else>
      <PageHeader
        :title="account.name"
        :description="account.notes"
        :crumbs="[BREADCRUMB_ROOT, { label: 'Accounts', to: `${BASE_PATH}/accounts` }, { label: account.name }]"
      >
        <template #actions>
          <StatusBadge :status="healthBand(account.health)" />
          <Popover v-model:open="noteOpen" heading="Thursday note" placement="bottom">
            <template #trigger>
              <button type="button" class="mrg-text-btn">Book note</button>
            </template>
            <p class="mb-0">{{ account.owner }} reviews this account with Meera Poluru.</p>
          </Popover>
        </template>
      </PageHeader>

      <div class="row g-3 mb-3">
        <div class="col-12 col-xl-7">
          <ChartSection title="Account facts" :subtitle="account.externalId">
            <DescriptionList :items="facts" />
            <div class="mrg-snippet">
              <p class="mrg-subtle">External id</p>
              <CodeSnippet :code="account.externalId" language="text" />
            </div>
          </ChartSection>
        </div>
        <div class="col-12 col-xl-5">
          <ChartSection title="Health" subtitle="Drag to update the Thursday score">
            <div class="mrg-stack">
              <Slider :model-value="account.health" label="Health score" :min="0" :max="100" show-value @update:model-value="onHealth" />
              <ProgressBar label="Health" :value="account.health" show-value />
              <Rating :model-value="account.sentiment" read-only label="Sentiment" />
              <p v-if="renewal" class="mrg-subtle mb-0">
                Renewal {{ renewal.stage.replace('_', ' ') }} · {{ renewal.probability }}%
                <span @click.capture="router.push(`${BASE_PATH}/renewals`); $event.preventDefault()">
                  <Link :href="`${BASE_PATH}/renewals`">Open renewals</Link>
                </span>
              </p>
            </div>
          </ChartSection>
        </div>
      </div>

      <Tabs
        v-model="tab"
        :items="[
          { id: 'health', label: 'People' },
          { id: 'plan', label: 'Plan' },
          { id: 'activity', label: 'Activity' },
        ]"
      />

      <div class="row g-3 mt-1">
        <div v-if="tab === 'health'" class="col-12">
          <ChartSection title="People" subtitle="Owners and customer contacts">
            <ul class="mrg-people">
              <li v-for="person in account.contacts" :key="person.name">
                <Avatar :name="person.name" size="sm" />
                <div>
                  <strong>{{ person.name }}</strong>
                  <p class="mrg-subtle mb-0">{{ person.role }}</p>
                </div>
              </li>
              <li>
                <Avatar :name="account.owner" size="sm" />
                <div>
                  <strong>{{ account.owner }}</strong>
                  <p class="mrg-subtle mb-0">Success owner</p>
                </div>
              </li>
            </ul>
          </ChartSection>
        </div>
        <div v-else-if="tab === 'plan'" class="col-12">
          <ChartSection title="Plan" :subtitle="onboarding ? onboarding.note : 'This account is past onboarding.'">
            <Stepper v-if="onboarding" :steps="ONBOARDING_STEPS" :active-index="stepIndex" />
            <p v-else class="mrg-subtle">Next milestone is the renewal on {{ formatDate(account.renewal) }}.</p>
            <FileUpload class="mt-3" label="QBR deck" hint="PDF or slides" accept=".pdf,.ppt,.pptx,.key" @files-change="onFiles" />
          </ChartSection>
        </div>
        <div v-else class="col-12">
          <ChartSection title="Activity" subtitle="Recent success work">
            <Timeline v-if="timeline.length" :items="timeline" />
            <p v-else class="mrg-subtle mb-0">No notes yet.</p>
          </ChartSection>
        </div>
      </div>
    </template>
  </div>
</template>
