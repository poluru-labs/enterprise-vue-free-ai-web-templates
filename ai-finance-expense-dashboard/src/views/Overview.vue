<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Alert, Button, Card } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import AreaChart from '../components/charts/AreaChart.vue';
import Sparkline from '../components/charts/Sparkline.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import { useFinanceStore } from '../stores/finance.js';
import { formatCurrency, formatDate, formatPercent } from '../utils/format.js';

const store = useFinanceStore();

const kpis = computed(() => [
  {
    id: 'spend',
    label: 'Spend MTD',
    value: formatCurrency(store.totalExpenses),
    hint: 'Cards + reimbursements',
    trend: 'up',
    trendValue: '+4.8%',
  },
  {
    id: 'pending',
    label: 'Pending approvals',
    value: String(store.pendingExpenses.length),
    hint: 'Hana Poluru queue',
    trend: 'down',
    trendValue: `-${store.pendingExpenses.length ? 3 : 0}`,
  },
  {
    id: 'invoices',
    label: 'Open invoices',
    value: String(store.pendingInvoices.length),
    hint: formatCurrency(store.openInvoiceAmount),
    trend: 'down',
    trendValue: '-2',
  },
  {
    id: 'remaining',
    label: 'Budget remaining',
    value: formatCurrency(store.remainingBudget),
    hint: `${formatPercent((store.totalSpent / store.totalAllocated) * 100)} used`,
    trend: 'flat',
    trendValue: 'On plan',
  },
  {
    id: 'close',
    label: 'Close progress',
    value: formatPercent(store.close.percent),
    hint: `${store.close.tasksDone} of ${store.close.tasksTotal} tasks`,
    trend: 'up',
    trendValue: '+8 pts',
  },
  {
    id: 'overdue',
    label: 'Overdue AP',
    value: String(store.overdueInvoices.length),
    hint: formatCurrency(store.overdueInvoices.reduce((sum, item) => sum + item.amount, 0)),
    trend: store.overdueInvoices.length ? 'up' : 'down',
    trendValue: store.overdueInvoices.length ? '+1' : '0',
  },
]);

const trend = computed(() => store.overview.monthlyTrend);
</script>

<template>
  <div class="mint-page">
    <PageHeader
      eyebrow="Mint control"
      title="August spend desk"
      description="Hana Poluru is 64% through month-end close. Accruals and overdue AP still sit on the ledger."
    >
      <template #actions>
        <Button variant="secondary" @click="$router.push(`${BASE_PATH}/analytics`)">Analytics</Button>
        <Button icon="plus" @click="store.openComposer()">Submit expense</Button>
      </template>
    </PageHeader>

    <Alert
      class="mint-alert"
      variant="info"
      :title="`${store.close.label} · ${store.close.percent}% closed`"
      :message="store.close.note"
    />

    <section class="mint-kpi-grid" aria-label="Finance KPIs">
      <StatCard
        v-for="kpi in kpis"
        :key="kpi.id"
        :label="kpi.label"
        :value="kpi.value"
        :hint="kpi.hint"
        :trend="kpi.trend"
        :trend-value="kpi.trendValue"
      />
    </section>

    <div class="mint-split">
      <Card class="mint-panel" title="Spend trend" description="March through August card plus reimbursement volume.">
        <AreaChart :values="trend.map((item) => item.amount)" :labels="trend.map((item) => item.month)" />
      </Card>
      <Card class="mint-panel" title="Accrual watch" description="Items Hana still needs before books lock.">
        <ul class="mint-stack-list">
          <li v-for="item in store.overview.accrualWatch" :key="item.id">
            <div>
              <strong>{{ item.label }}</strong>
              <span>{{ item.owner }}</span>
            </div>
            <em>{{ formatCurrency(item.amount) }}</em>
          </li>
        </ul>
      </Card>
    </div>

    <div class="mint-split">
      <Card class="mint-panel" title="Recent expenses">
        <template #header>
          <RouterLink class="mint-text-link" :to="`${BASE_PATH}/expenses`">View all</RouterLink>
        </template>
        <div class="mint-activity">
          <RouterLink
            v-for="expense in store.expenses.slice(0, 6)"
            :key="expense.id"
            class="mint-activity-row"
            :to="`${BASE_PATH}/expenses/${expense.id}`"
          >
            <span class="mint-activity-mark"><i class="bi bi-receipt" /></span>
            <span>
              <strong>{{ expense.description }}</strong>
              <small>{{ expense.employee }} · {{ formatDate(expense.date) }}</small>
            </span>
            <span class="mint-activity-end">
              <strong>{{ formatCurrency(expense.amount) }}</strong>
              <StatusBadge :status="expense.status" />
            </span>
          </RouterLink>
        </div>
      </Card>
      <Card class="mint-panel" title="Budget burn">
        <template #header>
          <RouterLink class="mint-text-link" :to="`${BASE_PATH}/budgets`">Budgets</RouterLink>
        </template>
        <ul class="mint-burn-list">
          <li v-for="budget in store.budgets" :key="budget.id">
            <div class="mint-hbar-meta">
              <span>{{ budget.category }}</span>
              <strong>{{ formatCurrency(budget.spent) }}</strong>
            </div>
            <div class="mint-meter-track">
              <span
                class="mint-meter-fill"
                :style="{ width: `${Math.min(100, Math.round((budget.spent / budget.allocated) * 100))}%` }"
              />
            </div>
          </li>
        </ul>
        <Sparkline class="mint-spark-wide" :values="trend.map((item) => item.amount)" />
      </Card>
    </div>
  </div>
</template>
