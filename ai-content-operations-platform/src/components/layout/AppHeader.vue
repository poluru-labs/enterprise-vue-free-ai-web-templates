<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Kbd, Modal } from '@poluru-labs/enterprise-design-system-vue';
import { APP_NAME, APP_TAGLINE, BASE_PATH, COMMAND_ITEMS } from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useContent } from '../../stores/content.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const router = useRouter();
const store = useContent();
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
  if (item.id === 'new-brief') {
    store.setBriefOpen(true);
    return;
  }
  router.push(item.to);
}
</script>

<template>
  <header class="flo-header">
    <div class="flo-header-inner">
      <div class="flo-header-start">
        <Button
          class="flo-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="flo-header-brand">
          <span class="flo-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="9" fill="#102E50" />
              <path d="M9 8.5h9.2c3.4 0 5.6 1.9 5.6 4.7 0 2.1-1.2 3.6-3.1 4.3L24.4 24h-3.6l-3.4-5.9H12.2V24H9V8.5zm3.2 2.5v4.8h5.4c1.7 0 2.7-.9 2.7-2.4s-1-2.4-2.7-2.4H12.2z" fill="#ffffff" />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <label class="flo-inset-search">
        <i class="bi bi-search" aria-hidden="true" />
        <input
          v-model="query"
          type="search"
          placeholder="Search briefs, reviews, channels"
          aria-label="Search briefs, reviews, channels"
          @keydown.enter.prevent="goSearch"
        />
        <button type="button" class="flo-kbd-btn" aria-label="Command palette" @click="setPaletteOpen(true)">
          <Kbd>⌘K</Kbd>
        </button>
      </label>
    </div>
  </header>

  <Modal :open="paletteOpen" heading="Jump to anything" @update:open="setPaletteOpen">
    <label class="flo-palette-search">
      Search pages and actions
      <input v-model="paletteQuery" placeholder="Drafts, reviews, channels…" />
    </label>
    <ul class="flo-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>
</template>
