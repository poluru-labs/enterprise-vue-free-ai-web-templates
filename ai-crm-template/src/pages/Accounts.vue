<script setup>
import { Card, Status, Tag, TreeView } from '@poluru-labs/enterprise-design-system-vue';
import { accountTree, accounts, healthTone } from '../data';
import { go } from '../ui';

function onSelect(id) {
  const match = accounts.find((item) => item.id === id);
  if (match) go(`#/account/${match.id}`);
}
</script>

<template>
  <header class="page-head">
    <div>
      <span class="eyebrow">Customers</span>
      <h1>Accounts</h1>
      <p>Hierarchy, health, and next meetings. Open Harbor to see Meera Poluru’s buying team.</p>
    </div>
  </header>

  <div class="grid-2">
    <Card title="Account tree" description="Click a node to open the record">
      <TreeView :nodes="accountTree" @select="onSelect" />
    </Card>
    <div class="account-grid" style="grid-template-columns: 1fr 1fr">
      <a v-for="account in accounts" :key="account.id" class="account-card" :href="`#/account/${account.id}`">
        <Card :title="account.name" :description="account.industry">
          <div class="row">
            <Status :label="account.health" :tone="healthTone(account.health)" />
            <Tag :label="account.arr" variant="brand" />
          </div>
          <p class="note">{{ account.owner }} · {{ account.next }}</p>
        </Card>
      </a>
    </div>
  </div>
</template>
