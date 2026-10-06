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
  <div class="flo-table-wrap">
    <EmptyState v-if="!rows.length" :title="emptyTitle" :description="emptyDescription" />
    <table v-else class="flo-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row[rowKey] ?? JSON.stringify(row)"
          :class="{ 'is-clickable': $attrs.onRowClick }"
          @click="emit('row-click', row)"
        >
          <td v-for="column in columns" :key="column.key">
            <slot :name="column.key" :value="row[column.key]" :row="row">
              {{ row[column.key] ?? '—' }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
