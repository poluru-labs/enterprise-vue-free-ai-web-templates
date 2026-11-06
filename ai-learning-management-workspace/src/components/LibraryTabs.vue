<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Tabs } from '@poluru-labs/enterprise-design-system-vue'
import { BASE_PATH, LIBRARY_TABS } from '@/constants/navigation'

const props = defineProps<{ current: 'catalog' | 'paths' | 'people' }>()

const router = useRouter()
const tab = ref(props.current)

watch(tab, (id) => {
  if (id !== props.current) router.push(`${BASE_PATH}/${id}`)
})
</script>

<template>
  <div class="cy-tabs">
    <Tabs v-model="tab" :items="[...LIBRARY_TABS]" />
  </div>
</template>
