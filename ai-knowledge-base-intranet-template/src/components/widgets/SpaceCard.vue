<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Badge, Button } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../../constants/navigation.js';
import { formatNumber } from '../../utils/format.js';

const props = defineProps({
  space: { type: Object, required: true },
});

const router = useRouter();
const owners = computed(() => (props.space.owners || []).join(' · '));

function openSpace() {
  router.push(`${BASE_PATH}/spaces/${props.space.id}`);
}
</script>

<template>
  <article class="atlas-space-card" @click="openSpace">
    <div class="atlas-space-card-top">
      <span class="atlas-space-mark" :style="{ background: space.accent }">
        <i :class="`bi ${space.icon}`" aria-hidden="true"></i>
      </span>
      <Badge :label="`${space.unread} unread`" variant="neutral" />
    </div>
    <p class="atlas-space-kicker">{{ space.kicker }}</p>
    <h2>{{ space.name }}</h2>
    <p class="atlas-muted">{{ space.description }}</p>
    <div class="atlas-space-card-foot">
      <span>{{ formatNumber(space.articles) }} articles · {{ owners }}</span>
      <Button variant="tertiary" @click.stop="openSpace">Open space</Button>
    </div>
  </article>
</template>
