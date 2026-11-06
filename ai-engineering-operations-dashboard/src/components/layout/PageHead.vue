<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Breadcrumb } from '@poluru-labs/enterprise-design-system-vue'

export type Crumb = { label: string; to?: string }

withDefaults(
  defineProps<{
    title: string
    crumbs?: Crumb[]
  }>(),
  { crumbs: () => [] },
)

const router = useRouter()

function onCrumbClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return
  const link = target.closest('a')
  if (!link) return
  const href = link.getAttribute('href')
  if (!href || href.startsWith('http')) return
  event.preventDefault()
  router.push(href)
}
</script>

<template>
  <header class="nl-head">
    <div v-if="crumbs?.length" @click.capture="onCrumbClick">
      <Breadcrumb
        :items="
          crumbs.map((crumb, index) => ({
            label: crumb.label,
            href: index < crumbs.length - 1 ? crumb.to : undefined,
          }))
        "
      />
    </div>
    <div class="nl-head-row">
      <h1>{{ title }}</h1>
      <div v-if="$slots.actions" class="nl-head-actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
