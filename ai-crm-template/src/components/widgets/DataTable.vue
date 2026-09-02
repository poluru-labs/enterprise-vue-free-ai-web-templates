<script setup>
import { EmptyState } from '@poluru-labs/enterprise-design-system-vue';

defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  rowKey: { type: String, default: 'id' },
  emptyTitle: { type: String, default: 'No records' },
  emptyDescription: { type: String, default: 'Try adjusting filters or wait for the next sync.' },
});

const emit = defineEmits(['row-click']);
</script>

<template>
  <div class="bloom-table-wrap">
    <EmptyState v-if="!rows.length" :title="emptyTitle" :description="emptyDescription" icon="search" />
    <table v-else class="bloom-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" :class="column.className">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row[rowKey] ?? JSON.stringify(row)"
          :class="{ 'is-clickable': Boolean($attrs.onRowClick) }"
          @click="emit('row-click', row)"
        >
          <td v-for="column in columns" :key="column.key" :class="column.className" :data-label="column.label">
            <slot :name="column.key" :row="row" :value="row[column.key]">
              {{ row[column.key] ?? '—' }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
