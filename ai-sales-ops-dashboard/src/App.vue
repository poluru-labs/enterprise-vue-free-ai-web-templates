<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI Sales Ops is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-bar-chart-line" aria-hidden="true"></i>
            <strong>AI Sales Ops</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Forecast</a>
            <a class="side-link" href="#">Coverage</a>
            <a class="side-link" href="#">Hygiene</a>
            <a class="side-link" href="#">Playbooks</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">Revenue ops</span>
              <h1>AI Sales Ops</h1>
              <p>Forecast, coverage, and deal hygiene for the sales operations team.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Commit" value="$936k" hint="78% of quota" trend="up" trend-value="+9.4%" />
            </Card>
            <Card>
              <Stat label="Coverage" value="1.4×" hint="Next quarter" trend="flat" trend-value="On plan" />
            </Card>
            <Card>
              <Stat label="Slippage" value="11%" hint="Pushed this week" trend="down" trend-value="-2 pts" />
            </Card>
            <Card>
              <Stat label="Hygiene" value="88%" hint="Next step set" trend="up" trend-value="+5 pts" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
