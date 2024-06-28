<template>
  <div>
    <div ref="editor" class="quill-editor"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

// Emits
const emit = defineEmits(['update:modelValue']);

// Refs
const editor = ref(null);
const quill = ref(null);
const {$quill}= useNuxtApp();

// Watcher
watch(
  () => props.modelValue,
  (newVal) => {
    if (quill.value && quill.value.root.innerHTML !== newVal) {
      quill.value.root.innerHTML = newVal;
    }
  }
);

// On Mounted
onMounted(() => {
  if (process.client) {
    quill.value = new $quill(editor.value, {
      theme: 'snow',
      placeholder: 'Compose an epic...',
      modules: {
        toolbar: [
          
          [{ header: [1, 2,3,4,5,6, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block','link','video']
        ]
      }
    });

    quill.value.on('text-change', () => {
      emit('update:modelValue', quill.value.root.innerHTML);
    });

    if (props.modelValue) {
      quill.value.root.innerHTML = props.modelValue;
    }
  }
});
</script>

<style>
.quill-editor {
  height: 400px;
}
</style>
