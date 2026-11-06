<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  DataTable,
  DateRangePicker,
  Drawer,
  Status,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'
import { incidentTone, severityTone } from '@/utils/status'

const rangeStart = ref('2026-11-01')
const rangeEnd = ref('2026-11-30')
const drawerOpen = ref(false)
const activeId = ref('')
const draft = ref('')

const filtered = computed(() =>
  desk.incidents.filter((item) => item.opened >= rangeStart.value && item.opened <= rangeEnd.value),
)

const rows = computed(() =>
  filtered.value.map((item) => ({
    incident: item.title,
    service: item.service,
    severity: item.severity,
    state: item.state,
    owner: item.owner,
    opened: item.opened,
  })),
)

const active = computed(() => desk.incidents.find((item) => item.id === activeId.value))

function openWriteup(id: string) {
  const item = desk.incidents.find((entry) => entry.id === id)
  if (!item) return
  activeId.value = id
  draft.value = item.writeup
  drawerOpen.value = true
}

function saveWriteup() {
  const item = desk.incidents.find((entry) => entry.id === activeId.value)
  if (!item) return
  item.writeup = draft.value
  drawerOpen.value = false
  showToast({
    title: 'Write-up saved',
    description: `${item.title} · ${item.owner}`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead title="Incidents" :crumbs="[BREADCRUMB_ROOT, { label: 'Incidents' }]" />

  <div class="nl-toolbar">
    <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" label="Opened" />
  </div>

  <p v-if="!filtered.length" class="nl-muted">No incidents in this window.</p>

  <section v-else class="nl-panel">
    <DataTable
      compact
      striped
      :columns="[
        { key: 'incident', label: 'Incident', sortable: true },
        { key: 'service', label: 'Service' },
        { key: 'severity', label: 'Severity' },
        { key: 'state', label: 'State' },
        { key: 'owner', label: 'Owner' },
        { key: 'opened', label: 'Opened' },
      ]"
      :rows="rows"
    />
    <div class="nl-status-row">
      <button
        v-for="item in filtered"
        :key="item.id"
        type="button"
        class="nl-text-btn"
        @click="openWriteup(item.id)"
      >
        <Status :label="item.severity" :tone="severityTone(item.severity)" />
        <Status :label="item.state" :tone="incidentTone(item.state)" />
        <span>{{ item.title }}</span>
      </button>
    </div>
  </section>

  <Drawer v-model:open="drawerOpen" :heading="active?.title || 'Write-up'" size="md">
    <p v-if="active" class="nl-muted">{{ active.service }} · {{ active.owner }}</p>
    <Textarea v-model="draft" label="Write-up" />
    <div class="nl-form-actions">
      <Button size="sm" @click="saveWriteup">Save write-up</Button>
    </div>
  </Drawer>
</template>
