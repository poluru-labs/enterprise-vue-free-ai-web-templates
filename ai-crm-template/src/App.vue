<script setup>
import { EdsThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-vue';
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <RouterView />
    </ToastProvider>
  </EdsThemeProvider>
</template>
