<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI Knowledge Intranet is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-journal-bookmark" aria-hidden="true"></i>
            <strong>AI Knowledge Intranet</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Spaces</a>
            <a class="side-link" href="#">Articles</a>
            <a class="side-link" href="#">Collections</a>
            <a class="side-link" href="#">Owners</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">Internal wiki</span>
              <h1>AI Knowledge Intranet</h1>
              <p>Policies, how-tos, and team spaces for the company intranet.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Articles" value="3,420" hint="64 published this month" trend="up" trend-value="+8.8%" />
            </Card>
            <Card>
              <Stat label="Searches" value="18.2k" hint="This month" trend="up" trend-value="+12%" />
            </Card>
            <Card>
              <Stat label="Helpful rate" value="87%" hint="Reader feedback" trend="up" trend-value="+3 pts" />
            </Card>
            <Card>
              <Stat label="Needs update" value="41" hint="Owners assigned" trend="down" trend-value="-7" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
