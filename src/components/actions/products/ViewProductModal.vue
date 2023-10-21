<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-yellow-500 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-regular fa-eye"></i> Voir un produit
          </h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <!-- Contenu du modal -->
        <div style="height: 80vh" class="modal-body pb-16 p-5 overflow-y-auto">
          <!-- Ajoutez ici le contenu du modal -->
          <li>
            <strong
              >Image:
             
            </strong>
             <span v-if="!selectedData?.imageUrl">Aucune image</span>
            <!-- Prévisualisation de l'image -->
            <img
              v-if="selectedData?.imageUrl"
              :src="selectedData?.imageUrl"
              alt="Prévisualisation de l'image"
              class="mt-2 max-h-32 object-contain w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            />
          </li>
          <li><strong>ID:</strong> {{ selectedData?.id }}</li>
          <li><strong>Nom:</strong> {{ selectedData?.name }}</li>
          <li>
            <strong>Prix d'achat:</strong> {{ selectedData?.purchase_price }}
          </li>
          <li>
            <strong>Prix de vente:</strong> {{ selectedData?.selling_price }}
          </li>
          <li><strong>Stock:</strong> {{ selectedData?.stock }}</li>
          <li>
            <strong>Date de création:</strong>
            {{ formatDateFrench(selectedData?.createdAt) }}
          </li>
          <li>
            <strong>Date de modification:</strong>
            {{ formatDateFrench(selectedData?.updatedAt) }}
          </li>
        </div>

        <!-- Pied du modal -->
        <!-- Pied du modal -->
        <div class="absolute bg-gray-100 w-full flex justify-end bottom-0 p-4">
          <button
            class="bg-gray-200 text-black py-1 px-4 rounded-sm mr-2"
            @click="$emit('onClose')"
          >
          <i class="fa-solid fa-close"></i> Fermer
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Product } from "~/types";

defineProps<{
  isOpen: boolean;
  selectedData?: Product;
}>();
</script>

<style scoped></style>
