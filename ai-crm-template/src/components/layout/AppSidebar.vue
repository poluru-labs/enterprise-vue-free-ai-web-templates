<script setup>
import { Button } from '@poluru-labs/enterprise-design-system-vue';
import { APP_NAME, APP_TAGLINE, BASE_PATH, NAV_GROUPS, QUICK_LINKS } from '../../constants/navigation.js';
import { openActivityDrawer, openDealModal, openLeadDrawer } from '../../stores/crm.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);

function runQuick(id) {
  if (id === 'ql-deal') openDealModal();
  if (id === 'ql-call') openActivityDrawer();
  if (id === 'ql-lead') openLeadDrawer();
  emit('navigate');
}
</script>

<template>
  <aside :class="['bloom-sidebar', { 'is-open': open }]" aria-label="Bloom navigation">
    <RouterLink class="bloom-brand" :to="`${BASE_PATH}/overview`" @click="emit('navigate')">
      <span class="bloom-mark" aria-hidden="true">B</span>
      <span>
        <strong>{{ APP_NAME }}</strong>
        <small>{{ APP_TAGLINE }}</small>
      </span>
    </RouterLink>

    <div v-for="group in NAV_GROUPS" :key="group.label">
      <p class="bloom-nav-label">{{ group.label }}</p>
      <nav class="bloom-nav">
        <RouterLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="bloom-nav-link"
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

    <div class="bloom-quick">
      <p class="bloom-nav-label">Quick links</p>
      <div class="bloom-quick-stack">
        <Button size="sm" icon="plus" @click="runQuick('ql-deal')">{{ QUICK_LINKS[0].label }}</Button>
        <Button size="sm" variant="secondary" icon="mail" @click="runQuick('ql-call')">{{ QUICK_LINKS[1].label }}</Button>
        <Button size="sm" variant="tertiary" icon="user" @click="runQuick('ql-lead')">{{ QUICK_LINKS[2].label }}</Button>
      </div>
    </div>

    <div class="bloom-sidebar-foot">
      <div class="bloom-health-chip">
        <span class="bloom-pulse" />
        Book live · Q3 commit
      </div>
      <p>Mock fixtures · last sync 1 min ago</p>
    </div>
  </aside>
</template>
