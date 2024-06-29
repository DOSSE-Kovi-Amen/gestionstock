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
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];
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
        toolbar: toolbarOptions
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
