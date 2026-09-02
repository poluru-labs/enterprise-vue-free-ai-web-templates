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
  articleColumns,
  articleStatuses,
  articleTypes,
  useIntranet,
} from '../stores/intranet.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import DataTable from '../components/widgets/DataTable.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const {
  state,
  filteredArticles,
  pagedArticles,
  pageCount,
  setTypeFilter,
  setStatusFilter,
  setSearchQuery,
  setSpaceFilter,
  clearFilters,
  openPublish,
  toggleBookmark,
} = useIntranet();

const typeFilterOpen = ref(false);

const spaceSegments = [
  { value: 'all', label: 'All spaces' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'people', label: 'People' },
  { value: 'legal', label: 'Legal' },
  { value: 'gtm', label: 'GTM' },
];

function openArticle(row) {
  router.push(`${BASE_PATH}/articles/${row.id}`);
}
</script>

<template>
  <div class="atlas-page">
    <PageHeader
      title="Articles"
      description="Filter by space (or the lime switcher in the header), type, and publish state."
    >
      <template #actions>
        <Button class-name="atlas-btn-accent" icon="plus" @click="openPublish">Publish article</Button>
      </template>
    </PageHeader>

    <section class="atlas-panel">
      <Toolbar class="atlas-library-toolbar">
        <template #start>
          <Search
            :model-value="state.searchQuery"
            placeholder="Search titles, owners, spaces…"
            class-name="atlas-library-search"
            @update:model-value="setSearchQuery"
          />
          <SegmentedControl
            :model-value="state.spaceFilter || 'all'"
            :segments="spaceSegments"
            @update:model-value="setSpaceFilter"
          />
        </template>
        <template #end>
          <DropdownMenu v-model:open="typeFilterOpen" placement="bottom">
            <template #trigger>
              <Button variant="secondary" icon="filter">{{ state.typeFilter || 'All types' }}</Button>
            </template>
            <MenuItem label="All types" @select="setTypeFilter(''); typeFilterOpen = false" />
            <MenuItem
              v-for="t in articleTypes"
              :key="t.value"
              :label="t.label"
              @select="setTypeFilter(t.value); typeFilterOpen = false"
            />
          </DropdownMenu>
        </template>
      </Toolbar>

      <div class="atlas-type-row">
        <button
          v-for="status in articleStatuses"
          :key="status.value"
          type="button"
          class="atlas-chip"
          :class="{ 'is-active': state.statusFilter === status.value }"
          @click="setStatusFilter(state.statusFilter === status.value ? '' : status.value)"
        >
          {{ status.label }}
        </button>
      </div>

      <DataTable :columns="articleColumns" :rows="pagedArticles" @select="openArticle">
        <template #title="{ row }">
          <button type="button" class="atlas-linkish" @click.stop="openArticle(row)">{{ row.title }}</button>
        </template>
        <template #type="{ row }">
          <Tag :label="row.type" variant="neutral" />
        </template>
        <template #status="{ row }">
          <StatusBadge :label="row.status" />
        </template>
      </DataTable>

      <EmptyState
        v-if="!pagedArticles.length"
        title="No articles match your filters"
        description="Try clearing the search or switching space."
        icon="search"
      >
        <Button variant="secondary" @click="clearFilters">Clear filters</Button>
      </EmptyState>

      <div class="atlas-library-footer">
        <span class="atlas-muted">{{ filteredArticles.length }} articles</span>
        <div class="d-flex gap-2">
          <Button
            v-if="pagedArticles[0]"
            variant="tertiary"
            @click="toggleBookmark(pagedArticles[0])"
          >
            Bookmark first result
          </Button>
          <Pagination :page="state.page" :page-count="pageCount" @update:page="(page) => (state.page = page)" />
        </div>
      </div>
    </section>
  </div>
</template>
