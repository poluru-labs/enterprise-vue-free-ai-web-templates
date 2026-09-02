<script setup>
import { computed } from 'vue';
import { Card } from '@poluru-labs/enterprise-design-system-vue';
import BudgetCard from '../components/widgets/BudgetCard.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import { useFinanceStore } from '../stores/finance.js';
import { formatCurrency, formatPercent } from '../utils/format.js';

const store = useFinanceStore();

const usage = computed(() => Math.round((store.totalSpent / store.totalAllocated) * 100));
</script>

<template>
  <div class="mint-page">
    <PageHeader
      eyebrow="Cost centers"
      title="Budgets"
      description="Eight equal-height cards — software through professional services — so the grid stays even."
    />

    <section class="mint-kpi-grid mint-kpi-grid-4">
      <StatCard label="Allocated" :value="formatCurrency(store.totalAllocated)" hint="FY26 operating" />
      <StatCard label="Spent" :value="formatCurrency(store.totalSpent)" hint="Posted + approved" />
      <StatCard label="Remaining" :value="formatCurrency(store.remainingBudget)" hint="Before September lock" />
      <StatCard label="Overall usage" :value="formatPercent(usage)" hint="Across eight centers" />
    </section>

    <section class="mint-equal-grid" aria-label="Category budgets">
      <BudgetCard v-for="budget in store.budgets" :key="budget.id" :budget="budget" />
    </section>

    <Card class="mint-panel" title="Category breakdown" description="Same eight centers, one burn list.">
      <ul class="mint-burn-list">
        <li v-for="budget in store.budgets" :key="budget.id">
          <div class="mint-hbar-meta">
            <span>{{ budget.category }}</span>
            <strong>{{ formatCurrency(budget.spent) }} / {{ formatCurrency(budget.allocated) }}</strong>
          </div>
          <div class="mint-meter-track">
            <span
              class="mint-meter-fill"
              :style="{ width: `${Math.min(100, Math.round((budget.spent / budget.allocated) * 100))}%` }"
            />
          </div>
        </li>
      </ul>
    </Card>
  </div>
</template>
