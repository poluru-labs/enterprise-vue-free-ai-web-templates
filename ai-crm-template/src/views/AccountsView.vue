<script setup>
import { Button, TreeView } from '@poluru-labs/enterprise-design-system-vue';
import { useRouter } from 'vue-router';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { accountColumns, crm } from '../stores/crm.js';
import { exportToCsv } from '../utils/csv.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();

function onSelect(id) {
  const match = crm.accounts.find((item) => item.id === id);
  if (match) router.push(`${BASE_PATH}/accounts/${match.id}`);
}

function downloadCsv() {
  exportToCsv('accounts.csv', accountColumns, crm.accounts);
}
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Accounts"
      description="Hierarchy, health, and next meetings. Open Harbor to see Meera Poluru’s buying team."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Accounts' }]"
    >
      <template #actions>
        <Button variant="secondary" icon="download" @click="downloadCsv">Export CSV</Button>
      </template>
    </PageHeader>

    <div class="row g-3">
      <div class="col-12 col-xl-4">
        <ChartSection title="Account tree" subtitle="Click a node to open the record">
          <TreeView :nodes="crm.accountTree" @select="onSelect" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-8">
        <div class="row g-3">
          <div v-for="account in crm.accounts" :key="account.id" class="col-12 col-sm-6">
            <RouterLink class="bloom-account-card" :to="`${BASE_PATH}/accounts/${account.id}`">
              <article class="bloom-health-card">
                <header>
                  <h3>{{ account.name }}</h3>
                  <StatusBadge :status="account.health" />
                </header>
                <p>{{ account.industry }} · {{ account.region }}</p>
                <footer>
                  <strong>{{ account.arr }}</strong>
                  <span>{{ account.owner }} · {{ account.next }}</span>
                </footer>
              </article>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
