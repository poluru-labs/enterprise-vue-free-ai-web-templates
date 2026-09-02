<script setup>
import { ref } from 'vue';
import {
  Button,
  ButtonGroup,
  Combobox,
  FileUpload,
  Input,
  Modal,
  Select,
} from '@poluru-labs/enterprise-design-system-vue';
import { docTypes, reviewers, useDocuments } from '../../stores/documents.js';

const { state, submitUpload, closeUpload } = useDocuments();

const uploadName = ref('');
const uploadType = ref('');
const uploadReviewer = ref('');
const uploadFiles = ref([]);

function reset() {
  uploadName.value = '';
  uploadType.value = '';
  uploadReviewer.value = '';
  uploadFiles.value = [];
}

function onOpenChange(open) {
  if (open) reset();
  else closeUpload();
}

function onSubmit() {
  const created = submitUpload({
    name: uploadName.value,
    type: uploadType.value,
    reviewer: uploadReviewer.value,
    files: uploadFiles.value,
  });
  if (created) reset();
}
</script>

<template>
  <Modal :open="state.uploadOpen" heading="New document" @update:open="onOpenChange">
    <div class="vault-upload-form">
      <Input v-model="uploadName" label="Document name" placeholder="e.g. Reseller agreement — Acme" required />
      <Select v-model="uploadType" label="Document type" :options="docTypes" placeholder="Select a type" />
      <Combobox v-model="uploadReviewer" label="Assign reviewer" :options="reviewers" placeholder="Search reviewers…" />
      <FileUpload label="Attachment" hint="PDF, DOCX up to 25MB" @files-change="(d) => (uploadFiles = d.files)" />
    </div>
    <template #footer>
      <ButtonGroup :attached="false">
        <Button variant="secondary" @click="closeUpload">Cancel</Button>
        <Button class-name="vault-btn-accent" @click="onSubmit">Create document</Button>
      </ButtonGroup>
    </template>
  </Modal>
</template>
