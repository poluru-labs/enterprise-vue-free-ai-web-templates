<script setup>
import { computed, ref } from 'vue';
import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  Select,
  Textarea,
} from '@poluru-labs/enterprise-design-system-vue';
import { articleTypes, useIntranet } from '../../stores/intranet.js';

const { state, submitPublish, closePublish } = useIntranet();

const title = ref('');
const spaceId = ref('engineering');
const type = ref('article');
const excerpt = ref('');

const spaceOptions = computed(() =>
  state.spaces.map((space) => ({ value: space.id, label: space.name })),
);

function reset() {
  title.value = '';
  spaceId.value = 'engineering';
  type.value = 'article';
  excerpt.value = '';
}

function onOpenChange(open) {
  if (open) reset();
  else closePublish();
}

function onSubmit() {
  const created = submitPublish({
    title: title.value,
    spaceId: spaceId.value,
    type: type.value,
    excerpt: excerpt.value,
  });
  if (created) reset();
}
</script>

<template>
  <Modal :open="state.publishOpen" heading="Publish article" @update:open="onOpenChange">
    <div class="atlas-publish-form">
      <Input v-model="title" label="Title" placeholder="e.g. Q4 all-hands recap" required />
      <Select v-model="spaceId" label="Space" :options="spaceOptions" />
      <Select v-model="type" label="Type" :options="articleTypes" />
      <Textarea v-model="excerpt" label="Opening note" placeholder="What should this space know first?" rows="4" />
    </div>
    <template #footer>
      <ButtonGroup :attached="false">
        <Button variant="secondary" @click="closePublish">Cancel</Button>
        <Button class-name="atlas-btn-accent" @click="onSubmit">Save draft</Button>
      </ButtonGroup>
    </template>
  </Modal>
</template>
