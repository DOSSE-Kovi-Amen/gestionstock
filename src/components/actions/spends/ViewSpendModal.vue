
<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-yellow-500 text-white justify-between pb-3">
          <h3 class="text-xl"> <i class="fa-regular fa-eye"></i> Voir une dépense</h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <!-- Contenu du modal -->
        <div style="height: 80vh;" class="modal-body pb-16 p-5 overflow-y-auto">
          <!-- Ajoutez ici le contenu du modal -->
          <li><strong>ID:</strong> {{ selectedData?.id }}</li>
          <li><strong>Titre:</strong> {{ selectedData?.title }}</li>
          <li><strong>Montant:</strong> {{ selectedData?.amount }}</li>
          <li><strong>Description:</strong> {{ selectedData?.description }}</li>
          <li><strong>Date de création:</strong> {{ frenchDate(selectedData?.created_at) }}</li>
          <li><strong>Date de modification:</strong> {{ frenchDate(selectedData?.updated_at) }}</li>

        </div>

        <!-- Pied du modal -->
        <!-- Pied du modal -->
        <div class="absolute bg-gray-100 w-full flex justify-end bottom-0  p-4">
          <button class="bg-gray-200 text-black py-1 px-4 rounded-sm mr-2" @click="$emit('onClose')">
            <i class="fa-solid fa-close"></i>  Fermer
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import type{ Spend } from '~/types';


defineProps<{
  isOpen: boolean
  selectedData?: Spend
}>()

</script>

<style scoped></style>