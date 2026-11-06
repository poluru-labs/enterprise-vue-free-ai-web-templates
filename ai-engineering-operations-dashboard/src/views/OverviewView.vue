<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  CircularProgress,
  DataTable,
  Divider,
  Link,
  Meter,
  ProgressBar,
  Stat,
  Status,
  Tag,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, BASE_PATH } from '@/constants/navigation'
import { desk, onCall } from '@/data/desk'
import { serviceTone } from '@/utils/status'

const router = useRouter()

const openIncidents = computed(() => desk.incidents.filter((item) => item.state === 'Open'))
const healthy = computed(() => desk.services.filter((item) => item.status === 'Healthy'))
const deployHealth = computed(() => Math.round((healthy.value.length / desk.services.length) * 100))

const rows = computed(() =>
  desk.services.map((item) => ({
    service: item.name,
    owner: item.owner,
    status: item.status,
    uptime: `${item.uptime.toFixed(1)}%`,
    region: item.region,
  })),
)

const timeline = computed(() =>
  desk.deploys.slice(0, 4).map((item) => ({
    id: item.id,
    title: `${item.service} ${item.version}`,
    description: `${item.owner} · ${item.environment}`,
    time: item.at,
  })),
)
</script>

<template>
  <PageHead title="Overview" :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]">
    <template #actions>
      <ButtonGroup>
        <Button size="sm" variant="secondary" @click="router.push(`${BASE_PATH}/incidents`)">Incidents</Button>
        <Button size="sm" @click="router.push(`${BASE_PATH}/deploys`)">Deploys</Button>
      </ButtonGroup>
    </template>
  </PageHead>

  <section class="nl-ribbon" aria-label="Desk metrics">
    <Stat label="Open incidents" :value="String(openIncidents.length)" hint="Need a write-up" trend="flat" trend-value="Today" />
    <Stat label="Deploy health" :value="`${deployHealth}%`" hint="Services marked Healthy" trend="flat" trend-value="Holding" />
    <Stat label="On call" value="Anika Poluru" hint="Primary · Mohan Poluru secondary" />
    <Stat label="Services" :value="String(desk.services.length)" :hint="`${desk.services.length - healthy.length} not healthy`" />
  </section>

  <Alert
    v-if="openIncidents.length"
    class="nl-alert"
    variant="warning"
    title="Checkout is degraded"
    message="Harsha Poluru is holding the 2.4.1 canary. p95 is still above the line."
  />

  <div class="nl-split">
    <section class="nl-panel">
      <div class="nl-panel-head">
        <h2>Services</h2>
        <Badge label="Dense" variant="neutral" soft size="sm" />
      </div>
      <DataTable
        compact
        striped
        :columns="[
          { key: 'service', label: 'Service', sortable: true },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Status', sortable: true },
          { key: 'uptime', label: 'Uptime' },
          { key: 'region', label: 'Region' },
        ]"
        :rows="rows"
      />
      <div class="nl-status-row">
        <Status
          v-for="item in desk.services"
          :key="item.id"
          :label="item.name"
          :tone="serviceTone(item.status)"
          dot
        />
      </div>
      <Divider />
      <div class="nl-link-row">
        <span v-for="item in desk.services" :key="item.id" @click.capture="router.push(`${BASE_PATH}/services/${item.id}`); $event.preventDefault()">
          <Link :href="`${BASE_PATH}/services/${item.id}`">{{ item.name }}</Link>
        </span>
      </div>
    </section>

    <aside class="nl-panel">
      <h2>Recent deploys</h2>
      <div class="nl-health">
        <CircularProgress :value="deployHealth" show-value label="Healthy" />
        <div class="nl-stack">
          <Meter :value="healthy.length" :max="desk.services.length" label="Healthy services" show-value />
          <ProgressBar label="Deploy health" :value="deployHealth" show-value />
        </div>
      </div>
      <Timeline :items="timeline" />
      <div class="nl-tag-row">
        <Tag v-for="item in onCall" :key="item.id" :label="`${item.label}: ${item.description.split(' · ')[0]}`" />
      </div>
    </aside>
  </div>
</template>
