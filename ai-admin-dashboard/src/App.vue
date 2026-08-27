<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI Admin Dashboard is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-grid-1x2" aria-hidden="true"></i>
            <strong>AI Admin Dashboard</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Tenants</a>
            <a class="side-link" href="#">Members</a>
            <a class="side-link" href="#">Flags</a>
            <a class="side-link" href="#">Settings</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">Control plane</span>
              <h1>AI Admin Dashboard</h1>
              <p>Organizations, seats, flags, and workspace settings for your AI platform.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Organizations" value="842" hint="+32 this month" trend="up" trend-value="+4.0%" />
            </Card>
            <Card>
              <Stat label="Active seats" value="12,480" hint="82% utilization" trend="up" trend-value="+6.2%" />
            </Card>
            <Card>
              <Stat label="Feature flags" value="64" hint="12 in rollout" trend="flat" trend-value="Stable" />
            </Card>
            <Card>
              <Stat label="Uptime" value="99.98%" hint="Last 30 days" trend="flat" trend-value="SLA" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
