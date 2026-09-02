<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Autocomplete,
  Button,
  Input,
  Modal,
  NumberInput,
  Select,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, COLUMNS, ISSUE_TYPES, PRIORITIES, SIGNED_IN_USER } from '../../constants/navigation.js';
import {
  assigneeOptions,
  createIssue,
  workspace,
} from '../../stores/projects.js';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';

const route = useRoute();
const router = useRouter();
const sidebarOpen = ref(false);
const issueTitle = ref('');
const issueType = ref('story');
const issuePoints = ref(3);
const issueAssignee = ref(SIGNED_IN_USER.name);
const issueColumn = ref('todo');
const issuePriority = ref('medium');
const issueNotes = ref('');

watch(
  () => route.path,
  () => {
    sidebarOpen.value = false;
  },
);

watch(sidebarOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onMounted(() => {
  document.body.style.overflow = '';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

function saveIssue() {
  const issue = createIssue({
    title: issueTitle.value,
    type: issueType.value,
    points: issuePoints.value,
    assignee: issueAssignee.value,
    column: issueColumn.value,
    priority: issuePriority.value,
  });
  if (!issue) {
    showToast({ title: 'Title required', description: 'Name the issue before it can join the board.', variant: 'warning' });
    return;
  }
  issueTitle.value = '';
  issueNotes.value = '';
  showToast({
    title: 'Issue created',
    description: `${issue.key} is with ${issue.assignee} in ${COLUMNS.find((item) => item.id === issue.column)?.label}.`,
    variant: 'success',
  });
  router.push(`${BASE_PATH}/board`);
}
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="keel-shell">
    <AppSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
    <button
      v-if="sidebarOpen"
      type="button"
      class="keel-backdrop"
      aria-label="Close navigation"
      @click="sidebarOpen = false"
    />
    <div class="keel-workspace">
      <AppHeader :on-menu-toggle="() => (sidebarOpen = !sidebarOpen)" />
      <main id="main" class="keel-content">
        <RouterView />
      </main>
    </div>
  </div>

  <Modal v-model:open="workspace.issueOpen" heading="New issue">
    <div class="keel-form-grid">
      <Input class="full" v-model="issueTitle" label="Title" placeholder="Pair on auth fallback" required />
      <Select v-model="issueType" label="Type" :options="ISSUE_TYPES" />
      <Select v-model="issuePriority" label="Priority" :options="PRIORITIES" />
      <NumberInput v-model="issuePoints" label="Story points" :min="1" :max="13" :step="1" />
      <Select v-model="issueColumn" label="Column" :options="COLUMNS.map((item) => ({ value: item.id, label: item.label }))" />
      <Autocomplete class="full" v-model="issueAssignee" label="Assignee" :options="assigneeOptions" />
      <Textarea class="full" v-model="issueNotes" label="Notes" placeholder="Acceptance, deps, or a pairing plan." />
    </div>
    <template #footer>
      <Button variant="secondary" @click="workspace.issueOpen = false">Cancel</Button>
      <Button @click="saveIssue">Create issue</Button>
    </template>
  </Modal>
</template>
