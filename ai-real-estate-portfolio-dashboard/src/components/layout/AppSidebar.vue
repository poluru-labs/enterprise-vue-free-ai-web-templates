<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Avatar, DropdownMenu, MenuItem, SideNav, showToast } from '@poluru-labs/enterprise-design-system-vue'
import { BASE_PATH, NAV_ITEMS, SIGNED_IN_USER } from '@/constants/navigation'

defineProps<{ open?: boolean }>()
const emit = defineEmits<{ navigate: [] }>()

const route = useRoute()
const router = useRouter()
const menuOpen = ref(false)

const items = computed(() =>
  NAV_ITEMS.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.to,
    active: route.path === item.to || route.path.startsWith(`${item.to}/`),
  })),
)

function onNavClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return
  const link = target.closest('a')
  if (!link) return
  const href = link.getAttribute('href')
  if (!href || href.startsWith('http')) return
  event.preventDefault()
  emit('navigate')
  router.push(href)
}

function onMenuSelect(item: { value?: string }) {
  menuOpen.value = false
  if (item.value === 'settings') {
    emit('navigate')
    router.push(`${BASE_PATH}/settings`)
  }
  if (item.value === 'signout') {
    showToast({
      title: 'Signed out',
      description: `${SIGNED_IN_USER.name} left the portfolio.`,
      variant: 'info',
    })
  }
}
</script>

<template>
  <aside class="lw-sidebar" :class="{ 'is-open': open }" aria-label="Lotwell" @click.capture="onNavClick">
    <p class="lw-brand">
      Lotwell
      <span>Portfolio</span>
    </p>
    <div class="lw-nav">
      <SideNav :items="items" />
    </div>
    <div class="lw-sidebar-foot">
      <DropdownMenu v-model:open="menuOpen">
        <template #trigger>
          <button type="button" class="lw-profile">
            <Avatar :name="SIGNED_IN_USER.name" size="sm" />
            <span>
              <strong>{{ SIGNED_IN_USER.name }}</strong>
              <span>{{ SIGNED_IN_USER.role }}</span>
            </span>
          </button>
        </template>
        <MenuItem label="Settings" value="settings" @select="onMenuSelect" />
        <MenuItem label="Sign out" value="signout" danger @select="onMenuSelect" />
      </DropdownMenu>
    </div>
  </aside>
</template>
