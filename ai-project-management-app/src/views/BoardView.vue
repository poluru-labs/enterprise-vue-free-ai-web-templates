<script setup>
import { ref } from 'vue';
import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  MenuItem,
  Tag,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, COLUMNS } from '../constants/navigation.js';
import { boardColumns, moveIssue, openIssueModal, sprintProgress } from '../stores/projects.js';
import { formatShortDate } from '../utils/format.js';
import { statusTone } from '../utils/status.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const openMenuId = ref('');

function toggleMenu(id, open) {
  openMenuId.value = open ? id : '';
}

function moveCard(issue, column) {
  const result = moveIssue(issue.id, column);
  openMenuId.value = '';
  if (!result) return;
  showToast({
    title: 'Card moved',
    description: `${result.issue.key} → ${result.toLabel}`,
    variant: 'success',
  });
}
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Board"
      :description="`${sprintProgress.name} · four columns · move a card to toast the new lane.`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Board' }]"
    >
      <template #actions>
        <Button variant="secondary" @click="$router.push(`${BASE_PATH}/backlog`)">Backlog</Button>
        <Button icon="plus" @click="openIssueModal()">New issue</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div v-for="column in boardColumns" :key="column.id" class="col-12 col-sm-6 col-xl-3">
        <StatCard :label="column.label" :value="String(column.points)" :hint="`${column.items.length} issues`" />
      </div>
    </div>

    <div class="keel-kanban">
      <section v-for="column in boardColumns" :key="column.id" class="keel-kanban-col">
        <h2>
          <span>{{ column.label }}</span>
          <Badge :label="String(column.items.length)" variant="brand" pill />
        </h2>
        <div class="keel-kanban-total">{{ column.points }} pts</div>
        <div class="keel-hbar-track keel-kanban-bar">
          <div class="keel-hbar-fill" :style="{ width: `${Math.min(100, (column.points / sprintProgress.committed) * 100)}%` }" />
        </div>

        <div v-for="issue in column.items" :key="issue.id" class="keel-issue-wrap">
          <article class="keel-issue-card">
            <div class="keel-issue-head">
              <span class="keel-issue-key">{{ issue.key }}</span>
              <StatusBadge :status="issue.type" />
            </div>
            <strong>{{ issue.title }}</strong>
            <div class="keel-issue-meta">
              <Avatar :name="issue.assignee" size="sm" />
              <Tag :label="`${issue.points} pts`" :variant="statusTone(issue.priority)" />
              <span>{{ formatShortDate(issue.updated) }}</span>
            </div>
          </article>
          <DropdownMenu
            class="keel-issue-menu"
            placement="left"
            :open="openMenuId === issue.id"
            @update:open="(value) => toggleMenu(issue.id, value)"
          >
            <template #trigger>
              <button type="button" class="keel-issue-menu-trigger" aria-label="Move card">⋯</button>
            </template>
            <MenuItem
              v-for="target in COLUMNS.filter((item) => item.id !== issue.column)"
              :key="target.id"
              :value="target.id"
              :label="`Move to ${target.label}`"
              @select="() => moveCard(issue, target.id)"
            />
          </DropdownMenu>
        </div>
      </section>
    </div>
  </div>
</template>
