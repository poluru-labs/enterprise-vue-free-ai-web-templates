<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { EmptyState, Modal, Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, COMMAND_ITEMS } from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useFinanceStore } from '../../stores/finance.js';
import { searchRecords } from '../../utils/search.js';

const router = useRouter();
const store = useFinanceStore();
const { open, setOpen } = useCommandPalette();
const query = ref('');

watch(open, (value) => {
  if (value) query.value = '';
});

const hits = computed(() => {
  const commands = searchRecords(COMMAND_ITEMS, query.value, ['label', 'hint', 'group']);
  const expenses = searchRecords(store.expenses, query.value, ['description', 'vendor', 'employee']).slice(0, 4);
  const vendors = searchRecords(store.vendors, query.value, ['name', 'category']).slice(0, 4);
  return {
    commands,
    expenses,
    vendors,
  };
});

const empty = computed(
  () => !hits.value.commands.length && !hits.value.expenses.length && !hits.value.vendors.length,
);

function go(to) {
  setOpen(false);
  if (to.includes('compose=1')) store.openComposer();
  router.push(to);
}
</script>

<template>
  <Modal :open="open" heading="Jump in Mint" @update:open="setOpen">
    <Search v-model="query" placeholder="Expenses, vendors, or a page" />
    <EmptyState v-if="empty" title="No matches" description="Try close, CloudPoluru, or invoices." icon="search" />
    <div v-else class="mint-cmd">
      <section v-if="hits.commands.length">
        <p class="mint-sidenav-label">Commands</p>
        <button v-for="item in hits.commands" :key="item.id" type="button" class="mint-cmd-item" @click="go(item.to)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </section>
      <section v-if="hits.expenses.length">
        <p class="mint-sidenav-label">Expenses</p>
        <button
          v-for="item in hits.expenses"
          :key="item.id"
          type="button"
          class="mint-cmd-item"
          @click="go(`${BASE_PATH}/expenses/${item.id}`)"
        >
          <strong>{{ item.description }}</strong>
          <span>{{ item.vendor }} · {{ item.employee }}</span>
        </button>
      </section>
      <section v-if="hits.vendors.length">
        <p class="mint-sidenav-label">Vendors</p>
        <button
          v-for="item in hits.vendors"
          :key="item.id"
          type="button"
          class="mint-cmd-item"
          @click="go(`${BASE_PATH}/vendors?q=${encodeURIComponent(item.name)}`)"
        >
          <strong>{{ item.name }}</strong>
          <span>{{ item.category }} · {{ item.owner }}</span>
        </button>
      </section>
    </div>
  </Modal>
</template>
