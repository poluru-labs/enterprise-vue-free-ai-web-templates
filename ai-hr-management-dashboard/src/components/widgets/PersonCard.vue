<script setup>
import { Avatar } from '@poluru-labs/enterprise-design-system-vue';
import { useRouter } from 'vue-router';
import { BASE_PATH } from '../../constants/navigation.js';
import StatusBadge from './StatusBadge.vue';

const props = defineProps({
  person: { type: Object, required: true },
});

const router = useRouter();

function open() {
  router.push(`${BASE_PATH}/people/${props.person.id}`);
}
</script>

<template>
  <article
    class="grove-person-card"
    role="button"
    tabindex="0"
    @click="open"
    @keydown.enter="open"
  >
    <header>
      <Avatar :name="person.name" size="md" />
      <StatusBadge :status="person.status" />
    </header>
    <h3>{{ person.name }}</h3>
    <p>{{ person.title }}</p>
    <div class="grove-card-meta">
      <span>{{ person.department }}</span>
      <span>{{ person.location }}</span>
    </div>
    <p class="grove-subtle">{{ person.email }}</p>
  </article>
</template>
