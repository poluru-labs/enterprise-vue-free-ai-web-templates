<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, DescriptionList, List, Rating, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/claims'

const selectedId = ref('northwind')

const tree = [
  {
    id: 'travel',
    label: 'Travel',
    children: [{ id: 'northwind', label: 'Northwind Travel' }],
  },
  {
    id: 'software',
    label: 'Software',
    children: [{ id: 'deskware', label: 'Deskware' }],
  },
  {
    id: 'meals',
    label: 'Meals',
    children: [{ id: 'harbor', label: 'Harbor Table' }],
  },
]

const vendor = computed(() => desk.vendors.find((item) => item.id === selectedId.value) ?? desk.vendors[0])

const facts = computed(() => {
  const item = vendor.value
  if (!item) return []
  return [
    { term: 'Category', description: item.category },
    { term: 'Contact', description: item.contact },
    { term: 'Note', description: item.note },
  ]
})

const directory = computed(() =>
  desk.vendors.map((item) => ({
    id: item.id,
    label: item.name,
    description: `${item.contact} · ${item.category}`,
  })),
)
</script>

<template>
  <PageHead
    title="Vendors"
    lede="The three desks claims are filed against."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Vendors' }]"
  />

  <TreeView class="cl-tree" :nodes="tree" @select="selectedId = $event" />

  <section v-if="vendor" class="cl-vendor">
    <div class="cl-person">
      <Avatar :name="vendor.contact" size="md" />
      <div>
        <h2>{{ vendor.name }}</h2>
        <p class="cl-quiet">{{ vendor.contact }}</p>
      </div>
    </div>
    <DescriptionList :items="facts" />
    <Rating class="cl-rating" :model-value="4" label="Ease of filing" read-only />
  </section>

  <h2 class="cl-section">Directory</h2>
  <List :items="directory" />
</template>
