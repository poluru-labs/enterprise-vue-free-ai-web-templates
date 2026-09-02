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

function rowClass(row) {
  if (row.status === 'inactive' || row.status === 'suspended') return 'is-severe';
  if (row.status === 'trial' || row.status === 'invited') return 'is-attention';
  return '';
}
</script>

<template>
  <div class="hbr-table-wrap">
    <EmptyState v-if="!rows.length" :title="emptyTitle" :description="emptyDescription" />
    <table v-else class="hbr-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row[rowKey] ?? JSON.stringify(row)"
          :class="[rowClass(row), { 'is-clickable': $attrs.onRowClick }]"
          @click="emit('row-click', row)"
        >
          <td v-for="column in columns" :key="column.key" :data-label="column.label">
            <slot :name="column.key" :value="row[column.key]" :row="row">
              {{ row[column.key] ?? '—' }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
