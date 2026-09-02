<script setup>
import { computed } from 'vue';
import { Card } from '@poluru-labs/enterprise-design-system-vue';
import { formatCurrency, formatPercent, usagePercent } from '../../utils/format.js';
import { budgetTone } from '../../utils/status.js';
import StatusBadge from './StatusBadge.vue';

const props = defineProps({
  budget: { type: Object, required: true },
});

const used = computed(() => usagePercent(props.budget.spent, props.budget.allocated));
const tone = computed(() => budgetTone(used.value));
</script>

<template>
  <Card class="mint-equal-card mint-budget-card">
    <div class="mint-budget-card-head">
      <h3>{{ budget.category }}</h3>
      <StatusBadge :status="budget.status" />
    </div>
    <p class="mint-muted">{{ budget.owner }} · {{ budget.note }}</p>
    <dl class="mint-kv">
      <div>
        <dt>Allocated</dt>
        <dd>{{ formatCurrency(budget.allocated) }}</dd>
      </div>
      <div>
        <dt>Spent</dt>
        <dd>{{ formatCurrency(budget.spent) }}</dd>
      </div>
      <div>
        <dt>Remaining</dt>
        <dd>{{ formatCurrency(budget.remaining) }}</dd>
      </div>
    </dl>
    <div class="mint-meter">
      <div class="mint-meter-meta">
        <span>Usage</span>
        <strong>{{ formatPercent(used) }}</strong>
      </div>
      <div class="mint-meter-track">
        <span class="mint-meter-fill" :class="`is-${tone}`" :style="{ width: `${Math.min(used, 100)}%` }" />
      </div>
    </div>
  </Card>
</template>
