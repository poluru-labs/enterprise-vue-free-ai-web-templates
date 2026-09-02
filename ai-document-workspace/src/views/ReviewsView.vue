<script setup>
import { useRouter } from 'vue-router';
import {
  Avatar,
  Button,
  DropdownMenu,
  EmptyState,
  MenuItem,
  Status,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import { useDocuments } from '../stores/documents.js';
import PageHeader from '../components/widgets/PageHeader.vue';

const router = useRouter();
const { state, reviewAction } = useDocuments();
</script>

<template>
  <div class="vault-page">
    <PageHeader
      title="Reviews"
      description="Approve, reassign, or remove items from the Legal and Security queues."
    />

    <section class="vault-panel">
      <ul v-if="state.reviews.length" class="vault-review-list vault-review-list-full">
        <li v-for="item in state.reviews" :key="item.id" class="vault-review-item">
          <Avatar :name="item.name" size="sm" />
          <div class="vault-review-body">
            <strong>{{ item.name }}</strong>
            <button type="button" class="vault-linkish" @click="router.push(`${BASE_PATH}/library/${item.documentId}`)">
              {{ item.task }}
            </button>
            <span>{{ item.queue }} queue</span>
          </div>
          <Status :label="item.due" :tone="item.tone" />
          <DropdownMenu placement="left">
            <template #trigger>
              <Button variant="tertiary" icon="more-horizontal" icon-only accessible-label="Row actions" />
            </template>
            <MenuItem label="Approve" @select="reviewAction(item, 'Approved', 'success')" />
            <MenuItem label="Reassign" @select="reviewAction(item, 'Reassigned', 'info')" />
            <MenuItem label="Remove" danger @select="reviewAction(item, 'Removed from queue', 'warning')" />
          </DropdownMenu>
        </li>
      </ul>
      <EmptyState
        v-else
        title="Queue is clear"
        description="No documents are waiting on a reviewer."
        icon="check"
      />
    </section>
  </div>
</template>
