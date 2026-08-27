<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI Document Workspace is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-file-earmark-text" aria-hidden="true"></i>
            <strong>AI Document Workspace</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Library</a>
            <a class="side-link" href="#">Reviews</a>
            <a class="side-link" href="#">Search</a>
            <a class="side-link" href="#">Sources</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">Knowledge ops</span>
              <h1>AI Document Workspace</h1>
              <p>Ingest, review, and retrieve documents with citations and owners.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Documents" value="12.6k" hint="840 added this week" trend="up" trend-value="+7.2%" />
            </Card>
            <Card>
              <Stat label="Pending review" value="46" hint="Legal + security" trend="down" trend-value="-9" />
            </Card>
            <Card>
              <Stat label="Search success" value="91%" hint="Cited answers" trend="up" trend-value="+3 pts" />
            </Card>
            <Card>
              <Stat label="Stale sources" value="28" hint="> 180 days" trend="down" trend-value="-4" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
