<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI SaaS Analytics is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-graph-up-arrow" aria-hidden="true"></i>
            <strong>AI SaaS Analytics</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Activation</a>
            <a class="side-link" href="#">Retention</a>
            <a class="side-link" href="#">Usage</a>
            <a class="side-link" href="#">Experiments</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">Growth</span>
              <h1>AI SaaS Analytics</h1>
              <p>Activation, retention, and product usage for a subscription business.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="MRR" value="$186k" hint="Net new $22.4k" trend="up" trend-value="+13.6%" />
            </Card>
            <Card>
              <Stat label="Active users" value="18.4k" hint="WAU / MAU 42%" trend="up" trend-value="+8.1%" />
            </Card>
            <Card>
              <Stat label="Churn" value="2.4%" hint="Logo churn" trend="down" trend-value="-0.3 pts" />
            </Card>
            <Card>
              <Stat label="NPS" value="54" hint="Last pulse" trend="up" trend-value="+6" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
