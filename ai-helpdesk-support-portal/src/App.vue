<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI Helpdesk Portal is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-headset" aria-hidden="true"></i>
            <strong>AI Helpdesk Portal</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Queue</a>
            <a class="side-link" href="#">Macros</a>
            <a class="side-link" href="#">Knowledge</a>
            <a class="side-link" href="#">SLAs</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">Support</span>
              <h1>AI Helpdesk Portal</h1>
              <p>Queues, SLAs, and suggested replies for customer operations.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Open tickets" value="248" hint="38 created today" trend="up" trend-value="+12" />
            </Card>
            <Card>
              <Stat label="First response" value="42m" hint="12% faster this week" trend="down" trend-value="-8m" />
            </Card>
            <Card>
              <Stat label="Satisfaction" value="94.2%" hint="+2.1% this month" trend="up" trend-value="+2.1%" />
            </Card>
            <Card>
              <Stat label="Resolved today" value="186" hint="91% within SLA" trend="up" trend-value="+14" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
