<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Button,
  DropdownMenu,
  EmptyState,
  MenuItem,
  Pagination,
  Search,
  SegmentedControl,
  Tag,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import {
  documentColumns,
  docTypes,
  scopes,
  useDocuments,
} from '../stores/documents.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import DataTable from '../components/widgets/DataTable.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const {
  state,
  filteredDocuments,
  pagedDocuments,
  pageCount,
  setTypeFilter,
  setScope,
  setSearchQuery,
  clearFilters,
  openUpload,
} = useDocuments();

const typeFilterOpen = ref(false);

function onSearch(value) {
  setSearchQuery(value);
}

function onScope(value) {
  setScope(value);
}

function onType(value) {
  setTypeFilter(value);
  typeFilterOpen.value = false;
}

function openDocument(row) {
  router.push(`${BASE_PATH}/library/${row.id}`);
}
</script>

<template>
  <div class="vault-page">
    <PageHeader
      title="Library"
      description="Filter by scope, type, or the file-path crumbs in the header."
    >
      <template #actions>
        <Button class-name="vault-btn-accent" icon="upload" @click="openUpload">New document</Button>
      </template>
    </PageHeader>

    <section class="vault-panel">
      <Toolbar class="vault-library-toolbar">
        <template #start>
          <Search
            :model-value="state.searchQuery"
            placeholder="Search documents or owners…"
            class-name="vault-library-search"
            @update:model-value="onSearch"
          />
          <SegmentedControl :model-value="state.scope" :segments="scopes" @update:model-value="onScope" />
        </template>
        <template #end>
          <DropdownMenu v-model:open="typeFilterOpen" placement="bottom">
            <template #trigger>
              <Button variant="secondary" icon="filter">{{ state.typeFilter || 'All types' }}</Button>
            </template>
            <MenuItem label="All types" @select="onType('')" />
            <MenuItem v-for="t in docTypes" :key="t.value" :label="t.label" @select="onType(t.label)" />
          </DropdownMenu>
        </template>
      </Toolbar>

      <div class="vault-type-row">
        <Tag v-for="t in docTypes" :key="t.value" :label="t.label" variant="brand" />
      </div>

      <DataTable :columns="documentColumns" :rows="pagedDocuments" @select="openDocument">
        <template #name="{ row }">
          <button type="button" class="vault-linkish" @click.stop="openDocument(row)">{{ row.name }}</button>
        </template>
        <template #status="{ row }">
          <StatusBadge :label="row.status" />
        </template>
      </DataTable>

      <EmptyState
        v-if="!pagedDocuments.length"
        title="No documents match your filters"
        description="Try clearing the search or switching scope."
        icon="search"
      >
        <Button variant="secondary" @click="clearFilters">Clear filters</Button>
      </EmptyState>

      <div class="vault-library-footer">
        <span class="vault-muted">{{ filteredDocuments.length }} documents</span>
        <Pagination :page="state.page" :page-count="pageCount" @update:page="(page) => (state.page = page)" />
      </div>
    </section>
  </div>
</template>
