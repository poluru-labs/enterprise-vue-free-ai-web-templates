<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Tabs } from '@poluru-labs/enterprise-design-system-vue'
import { BASE_PATH, CATALOG_TABS } from '@/constants/navigation'

const props = defineProps<{ current: 'studies' | 'papers' | 'grants' }>()

const router = useRouter()
const tab = ref(props.current)

watch(
  () => props.current,
  (id) => {
    tab.value = id
  },
)

watch(tab, (id) => {
  if (id !== props.current) router.push(`${BASE_PATH}/${id}`)
})
</script>

<template>
  <div class="sh-tabs">
    <Tabs v-model="tab" :items="[...CATALOG_TABS]" />
  </div>
</template>
