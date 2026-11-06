<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Autocomplete,
  Avatar,
  Button,
  Combobox,
  DescriptionList,
  Drawer,
  EmptyState,
  Input,
  Pagination,
  Rating,
  Search,
  Select,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, SITES } from '@/constants/navigation'
import { book, findSupplier, type Category, type Site } from '@/data/ledger'

const query = ref('')
const jump = ref('')
const page = ref(1)
const pageSize = 5
const drawerOpen = ref(false)
const selectedId = ref('')
const name = ref('')
const category = ref<Category>('Office')
const site = ref<Site>('Austin')
const contact = ref('Gita Poluru')

const categories = ['Office', 'Facilities', 'Software'].map((item) => ({ value: item, label: item }))
const sites = SITES.map((item) => ({ value: item, label: item }))
const people = [
  'Gita Poluru',
  'Hemant Poluru',
  'Ira Poluru',
  'Jatin Poluru',
  'Kala Poluru',
  'Lokesh Poluru',
  'Mira Poluru',
  'Nitin Poluru',
].map((item) => ({ value: item, label: item }))

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return book.suppliers.filter((supplier) => {
    const text = `${supplier.name} ${supplier.contact} ${supplier.category}`.toLowerCase()
    return q.length === 0 || text.includes(q)
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(visible.value.length / pageSize)))
const paged = computed(() => visible.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const selected = computed(() => findSupplier(selectedId.value))

watch(query, () => {
  page.value = 1
})

function choose(value: string) {
  const supplier = book.suppliers.find((item) => item.name === value)
  if (!supplier) return
  selectedId.value = supplier.id
  drawerOpen.value = true
}

function openSupplier(id: string) {
  selectedId.value = id
  drawerOpen.value = true
}

function addSupplier() {
  const trimmed = name.value.trim()
  if (!trimmed) return
  const id = `sp-${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  book.suppliers.push({
    id,
    name: trimmed,
    category: category.value,
    contact: contact.value,
    site: site.value,
    phone: '512-0100',
    email: 'desk@purchasewell.example',
    score: 3,
  })
  name.value = ''
  showToast({ title: 'Supplier added', description: trimmed, variant: 'success' })
}
</script>

<template>
  <PageHead
    title="Suppliers"
    lede="Who fills the purchase book."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Suppliers' }]"
  />
  <div class="pw-split">
    <form class="pw-form" @submit.prevent="addSupplier">
      <h2 class="pw-subhead">New supplier</h2>
      <Input v-model="name" label="Firm" />
      <Select v-model="category" label="Category" :options="categories" />
      <Select v-model="site" label="Site" :options="sites" />
      <Combobox v-model="contact" label="Contact" :options="people" />
      <Button type="submit">Add supplier</Button>
    </form>
    <div>
      <div class="pw-tools pw-tools-tight">
        <Search v-model="query" placeholder="Find a supplier" />
        <Autocomplete v-model="jump" label="Jump to a firm" :options="visible.map((item) => ({ value: item.name, label: item.name }))" @update:model-value="choose" />
      </div>
      <EmptyState
        v-if="visible.length === 0"
        title="No suppliers match"
        description="Try another firm."
        icon="search"
      />
      <div v-else class="pw-people">
        <button
          v-for="supplier in paged"
          :key="supplier.id"
          type="button"
          class="pw-supplier"
          @click="openSupplier(supplier.id)"
        >
          <Avatar :name="supplier.contact" size="sm" />
          <span>
            <strong>{{ supplier.name }}</strong>
            <span>{{ supplier.contact }} · {{ supplier.category }}</span>
          </span>
          <span class="pw-quiet">{{ supplier.site }}</span>
        </button>
        <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="pw-pages" />
      </div>
    </div>
  </div>
  <Drawer v-model:open="drawerOpen" :heading="selected?.name ?? 'Supplier'" size="md">
    <template v-if="selected">
      <DescriptionList
        :items="[
          { term: 'Contact', description: selected.contact },
          { term: 'Category', description: selected.category },
          { term: 'Site', description: selected.site },
          { term: 'Phone', description: selected.phone },
          { term: 'Email', description: selected.email },
        ]"
      />
      <Rating :model-value="selected.score" label="Standing" read-only />
    </template>
  </Drawer>
</template>
