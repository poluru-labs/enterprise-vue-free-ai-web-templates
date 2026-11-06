<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  CodeSnippet,
  Icon,
  PinInput,
  Slider,
  Spinner,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '@/constants/navigation'
import { desk } from '@/data/board'

const saving = ref(false)
const unitsCode = 'Cedar\nMaple\nHarbor'

function save() {
  saving.value = true
  window.setTimeout(() => {
    saving.value = false
    showToast({
      title: 'Settings saved',
      description: `${SIGNED_IN_USER.name} · open-bed target ${desk.targetOpen}.`,
      variant: 'success',
    })
  }, 400)
}
</script>

<template>
  <PageHead
    title="Settings"
    lede="Open-bed target and the house page."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Settings' }]"
  >
    <template #actions>
      <Button size="sm" :loading="saving" @click="save">
        <Spinner v-if="saving" size="sm" label="Saving" />
        <span v-else>Save</span>
      </Button>
    </template>
  </PageHead>

  <form class="wl-form" @submit.prevent="save">
    <h2>
      <Icon name="settings" size="sm" />
      House
    </h2>
    <Slider v-model="desk.targetOpen" label="Open beds to keep" :min="1" :max="8" :step="1" show-value />
    <Switch v-model="desk.pager" label="Page Isha Poluru when open beds fall under the target" />
    <Switch v-model="desk.quietHours" label="Hold pages during the night shift" />
    <PinInput v-model="desk.pin" label="Board PIN" :length="4" type="number" />
    <CodeSnippet :code="unitsCode" language="text" />
  </form>
</template>
