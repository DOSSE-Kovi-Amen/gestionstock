<template>
    <div>
      <transition name="modal" mode="out-in">
        <div v-if="isOpen" class="fixed inset-0 p-8 z-50">
          <div
            class="modal-container relative bg-white w-full sm:w-full md:w-full transition-transform duration-500 ease-in-out mx-auto rounded shadow-lg z-50">
            <!-- Contenu du modal -->
            <slot />
          </div>
        </div>
  
      </transition>
      <div v-if="isOpen" class="fixed inset-0 p-8 z-40 bg-black bg-opacity-70">
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    isOpen: { type: Boolean, required: true, default: false },
  });
  </script>
  
  <style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    transform: scale(0);
  }
  
  .modal-enter-to,
  .modal-leave-from {
    transform: scale(1);
  }
  </style>
  