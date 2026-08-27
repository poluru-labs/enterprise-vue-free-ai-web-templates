<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI Finance & Expense is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-cash-stack" aria-hidden="true"></i>
            <strong>AI Finance & Expense</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Expenses</a>
            <a class="side-link" href="#">Invoices</a>
            <a class="side-link" href="#">Budgets</a>
            <a class="side-link" href="#">Close</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">Ledger</span>
              <h1>AI Finance & Expense</h1>
              <p>Spend, invoices, and budget vs actual for finance operations.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Spend MTD" value="$428k" hint="72% of budget" trend="up" trend-value="+6.4%" />
            </Card>
            <Card>
              <Stat label="Open invoices" value="128" hint="$186k outstanding" trend="down" trend-value="-12" />
            </Card>
            <Card>
              <Stat label="Close progress" value="64%" hint="Month-end checklist" trend="up" trend-value="+18 pts" />
            </Card>
            <Card>
              <Stat label="Exceptions" value="19" hint="Need review" trend="down" trend-value="-5" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
