<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Button, Input, Modal, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { formatDate, formatNumber } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';

const route = useRoute();
const store = useHelpdesk();
const showDialog = ref(false);
const name = ref('');
const queue = ref('Identity');
const body = ref('');

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') showDialog.value = true;
  },
  { immediate: true },
);

const macros = computed(() => store.state.macros);

function saveMacro() {
  if (!name.value.trim() || !body.value.trim()) {
    showToast({ title: 'Name and body required', variant: 'warning' });
    return;
  }
  store.state.macros.unshift({
    id: `mac-${Date.now()}`,
    name: name.value.trim(),
    queue: queue.value,
    uses: 0,
    body: body.value.trim(),
    updated: new Date().toISOString().split('T')[0],
  });
  showToast({ title: 'Macro saved', description: name.value, variant: 'success' });
  name.value = '';
  body.value = '';
  showDialog.value = false;
}
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Macros"
      description="Canned replies Meera’s desk uses on Identity, Billing, and Platform."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Macros' }]"
    >
      <template #actions>
        <Button size="sm" icon="plus" @click="showDialog = true">New macro</Button>
      </template>
    </PageHeader>

    <div class="row g-3">
      <div v-for="macro in macros" :key="macro.id" class="col-12 col-md-6 col-xl-4">
        <article class="lumen-macro-card">
          <header>
            <div>
              <h3>{{ macro.name }}</h3>
              <span class="lumen-subtle">{{ macro.queue }}</span>
            </div>
            <strong>{{ formatNumber(macro.uses) }}</strong>
          </header>
          <p class="lumen-policy-note">{{ macro.body }}</p>
          <span class="lumen-subtle">Updated {{ formatDate(macro.updated) }}</span>
        </article>
      </div>
    </div>

    <Modal :open="showDialog" heading="New macro" @update:open="(open) => (showDialog = open)">
      <div class="lumen-form-stack">
        <Input v-model="name" label="Name" placeholder="First response acknowledgment" />
        <Input v-model="queue" label="Queue" placeholder="Identity" />
        <label class="lumen-composer-field">
          Body
          <textarea v-model="body" rows="4" placeholder="Thanks for writing Lumen…" />
        </label>
      </div>
      <template #footer>
        <Button variant="secondary" @click="showDialog = false">Cancel</Button>
        <Button @click="saveMacro">Save macro</Button>
      </template>
    </Modal>
  </div>
</template>
