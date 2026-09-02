<script setup>
import { EmptyState, Modal, Search } from '@poluru-labs/enterprise-design-system-vue';
import { useQuotaStore } from '../../stores/quota.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';

const { state } = useQuotaStore();
const { commandQuery, filteredCommands, closeCommand, runCommand } = useCommandPalette();
</script>

<template>
  <Modal :open="state.commandOpen" heading="Jump to anything" @update:open="(open) => (open ? (state.commandOpen = true) : closeCommand())">
    <Search v-model="commandQuery" placeholder="Type a section or action" />
    <EmptyState
      v-if="!filteredCommands.length"
      title="No matches"
      description="Try Overview, Coverage, or Log activity."
      icon="search"
    />
    <div v-else class="quota-cmd-list">
      <button v-for="item in filteredCommands" :key="item.id" type="button" @click="runCommand(item)">
        {{ item.label }}
      </button>
    </div>
  </Modal>
</template>
