<script setup>
import { useRouter } from 'vue-router';
import { Button } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../../constants/navigation.js';

const props = defineProps({
  howto: { type: Object, required: true },
});

const router = useRouter();

function openHowTo() {
  router.push(`${BASE_PATH}/articles/${props.howto.articleId}`);
}
</script>

<template>
  <article class="atlas-howto-card" @click="openHowTo">
    <span class="atlas-howto-icon" aria-hidden="true">
      <i :class="`bi ${howto.icon}`"></i>
    </span>
    <p class="atlas-space-kicker">{{ howto.space }}</p>
    <h2>{{ howto.title }}</h2>
    <p class="atlas-muted">{{ howto.summary }}</p>
    <div class="atlas-howto-card-foot">
      <span>{{ howto.steps }} steps · {{ howto.minutes }} min</span>
      <Button variant="tertiary" @click.stop="openHowTo">Open</Button>
    </div>
  </article>
</template>
