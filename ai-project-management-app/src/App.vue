<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI Project Management is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-kanban" aria-hidden="true"></i>
            <strong>AI Project Management</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Boards</a>
            <a class="side-link" href="#">Sprints</a>
            <a class="side-link" href="#">Capacity</a>
            <a class="side-link" href="#">Risks</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">Delivery</span>
              <h1>AI Project Management</h1>
              <p>Plans, tasks, and team capacity for product and operations work.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Active projects" value="36" hint="8 at risk" trend="flat" trend-value="Steady" />
            </Card>
            <Card>
              <Stat label="Cycle time" value="4.2d" hint="Story median" trend="down" trend-value="-0.6d" />
            </Card>
            <Card>
              <Stat label="Throughput" value="94" hint="Items this sprint" trend="up" trend-value="+11" />
            </Card>
            <Card>
              <Stat label="Capacity" value="86%" hint="Team load" trend="up" trend-value="+4 pts" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
