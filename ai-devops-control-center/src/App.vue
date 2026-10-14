<script setup>
import { EdsThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-vue';
import AppShell from './components/layout/AppShell.vue';
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  </EdsThemeProvider>
</template>
