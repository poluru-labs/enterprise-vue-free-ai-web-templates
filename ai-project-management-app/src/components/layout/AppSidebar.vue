<script setup>
import { useRouter } from 'vue-router';
import { Button } from '@poluru-labs/enterprise-design-system-vue';
import { APP_NAME, APP_TAGLINE, BASE_PATH, NAV_GROUPS, QUICK_LINKS } from '../../constants/navigation.js';
import { openIssueModal, sprintProgress } from '../../stores/projects.js';

const router = useRouter();

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);

function runQuick(id) {
  if (id === 'ql-issue') openIssueModal();
  emit('navigate');
}
</script>

<template>
  <aside :class="['keel-sidebar', { 'is-open': open }]" aria-label="Keel navigation">
    <RouterLink class="keel-brand" :to="`${BASE_PATH}/overview`" @click="emit('navigate')">
      <span class="keel-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="20" height="20">
          <path d="M5 20 16 7.5 27 20h-3.4L16 12.2 8.4 20H5Z" fill="currentColor" />
          <path d="M7 22.4h18c-1.5 2.2-4.7 3.6-9 3.6s-7.5-1.4-9-3.6Z" fill="currentColor" opacity="0.75" />
        </svg>
      </span>
      <span>
        <strong>{{ APP_NAME }}</strong>
        <small>{{ APP_TAGLINE }}</small>
      </span>
    </RouterLink>

    <div v-for="group in NAV_GROUPS" :key="group.label">
      <p class="keel-nav-label">{{ group.label }}</p>
      <nav class="keel-nav">
        <RouterLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="keel-nav-link"
          active-class="is-active"
          @click="emit('navigate')"
        >
          <i :class="['bi', item.icon]" aria-hidden="true" />
          <span>
            <em>{{ item.label }}</em>
            <small>{{ item.description }}</small>
          </span>
        </RouterLink>
      </nav>
    </div>

    <div class="keel-quick">
      <p class="keel-nav-label">Quick links</p>
      <div class="keel-quick-stack">
        <Button size="sm" icon="plus" @click="runQuick('ql-issue')">{{ QUICK_LINKS[0].label }}</Button>
        <Button size="sm" variant="secondary" @click="router.push(`${BASE_PATH}/board`); emit('navigate')">
          {{ QUICK_LINKS[1].label }}
        </Button>
        <Button size="sm" variant="tertiary" @click="router.push(`${BASE_PATH}/sprint`); emit('navigate')">
          {{ QUICK_LINKS[2].label }}
        </Button>
      </div>
    </div>

    <div class="keel-sidebar-foot">
      <div class="keel-health-chip">
        <span class="keel-pulse" />
        {{ sprintProgress.name }} · {{ sprintProgress.done }}/{{ sprintProgress.committed }}
      </div>
      <p>Mock fixtures · last sync 1 min ago</p>
    </div>
  </aside>
</template>
