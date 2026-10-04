<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Kbd, Modal } from '@poluru-labs/enterprise-design-system-vue';
import { APP_NAME, APP_TAGLINE, BASE_PATH, COMMAND_ITEMS } from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useCompliance } from '../../stores/compliance.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const router = useRouter();
const store = useCompliance();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const paletteHits = computed(() =>
  searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']),
);

function goSearch() {
  const next = query.value.trim();
  router.push(next ? `${BASE_PATH}/search?q=${encodeURIComponent(next)}` : `${BASE_PATH}/search`);
}

function goCommand(item) {
  setPaletteOpen(false);
  paletteQuery.value = '';
  if (item.id === 'new-control') {
    store.setControlOpen(true);
    return;
  }
  router.push(item.to);
}
</script>

<template>
  <header class="aeg-header">
    <div class="aeg-header-inner">
      <div class="aeg-header-start">
        <Button
          class="aeg-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="aeg-header-brand">
          <span class="aeg-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="9" fill="#FF5722" />
              <path d="M16 5.5 25 9.2v7.1c0 6.1-3.9 9.4-9 10.7-5.1-1.3-9-4.6-9-10.7V9.2L16 5.5z" fill="#ffffff" />
              <path d="M16 10.2v12.2c3.6-1.1 6.2-3.5 6.2-7.6V11.8L16 10.2z" fill="#FFCCBC" />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <label class="aeg-inset-search">
        <i class="bi bi-search" aria-hidden="true" />
        <input
          v-model="query"
          type="search"
          placeholder="Search controls, audits, risks"
          aria-label="Search controls, audits, risks"
          @keydown.enter.prevent="goSearch"
        />
        <button type="button" class="aeg-kbd-btn" aria-label="Command palette" @click="setPaletteOpen(true)">
          <Kbd>⌘K</Kbd>
        </button>
      </label>
    </div>
  </header>

  <Modal :open="paletteOpen" heading="Jump to anything" @update:open="setPaletteOpen">
    <label class="aeg-palette-search">
      Search pages and actions
      <input v-model="paletteQuery" placeholder="Controls, audits, risks…" />
    </label>
    <ul class="aeg-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>
</template>
