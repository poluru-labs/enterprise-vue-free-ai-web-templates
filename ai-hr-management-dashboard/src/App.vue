<script setup>
import { Alert, Button, Card, EdsThemeProvider, Stat, ToastProvider, showToast } from '@poluru-labs/enterprise-design-system-vue';

function ping() {
  showToast({ title: 'Starter ready', description: 'AI HR Management is using Enterprise Design Systems for Vue.', variant: 'success' });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-people" aria-hidden="true"></i>
            <strong>AI HR Management</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Directory</a>
            <a class="side-link" href="#">Leave</a>
            <a class="side-link" href="#">Hiring</a>
            <a class="side-link" href="#">Learning</a>
          </nav>
        </aside>
        <main class="main">
          <header class="page-header">
            <div>
              <span class="eyebrow">People ops</span>
              <h1>AI HR Management</h1>
              <p>Headcount, leave, hiring, and learning for the people team.</p>
            </div>
            <Button icon="plus" @click="ping">New record</Button>
          </header>
          <Alert class="mb-4" variant="info" title="Vue starter" message="This template is wired to @poluru-labs/enterprise-design-system-vue. Replace the sample metrics with your workspace." />
          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Headcount" value="1,284" hint="42 open reqs" trend="up" trend-value="+18" />
            </Card>
            <Card>
              <Stat label="Time to hire" value="28d" hint="Engineering median" trend="down" trend-value="-3d" />
            </Card>
            <Card>
              <Stat label="Leave balance" value="8.4d" hint="Company average" trend="flat" trend-value="On track" />
            </Card>
            <Card>
              <Stat label="eNPS" value="47" hint="Q3 pulse" trend="up" trend-value="+4" />
            </Card>
          </section>
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
