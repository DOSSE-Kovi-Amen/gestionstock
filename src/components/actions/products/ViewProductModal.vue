<template>
  <div>
    <LargeModal :is-open="isOpen">
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
        <div style="height: 80vh" class="modal-body capitalize pb-16 p-5 overflow-y-auto">
          <!-- Ajoutez ici le contenu du modal -->

          <div class="grid grid-cols-2">
            <div>
              <li>
                <strong>Image:

                </strong>
                <span v-if="!selectedData?.image">Aucune image</span>
                <!-- Prévisualisation de l'image -->
                <img v-if="selectedData?.image" :src="getImageUrl(selectedData?.image)"
                  alt="Prévisualisation de l'image" style="object-fit: cover;"
                  class="mt-2  object-contain w-full rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
              </li>
            </div>
            <div>
              <div class="grid pb-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="(image, index) in JSON.parse(selectedData?.images)" :key="index"
                  class="relative border-width-2 border-black border-solid border-1 shadow-lg">
                  <img :src="getImageUrl(image)" class="w-full h-40 object-cover rounded" />
                </div>
              </div>
            </div>
          </div>


          <li><strong>ID:</strong> {{ selectedData?.id }}</li>
          <li><strong>Nom:</strong> {{ selectedData?.name }}</li>
          <li>
            <strong>Prix d'achat:</strong> {{ formatMonetaire(selectedData?.purchase_price??0) }}
          </li>
          <li>
            <strong>Prix de vente:</strong> {{ formatMonetaire(selectedData?.selling_price??0) }}
          </li>

          <li><strong>Stock:</strong> {{ selectedData?.stock }}</li>

          <li><strong>Alerte stock:</strong> {{ selectedData?.reorder_level }}</li>
          <li><strong>Catégorie:</strong> {{ selectedData?.category.name }}</li>
          <li>
            <strong>
              Description:
              <div v-html="selectedData?.description"></div>


            </strong>
          </li>

          <li>
            <strong>Date de création:</strong>
            {{ frenchDate(selectedData?.created_at) }}
          </li>
          <li>
            <strong>Date de modification:</strong>
            {{ frenchDate(selectedData?.updated_at) }}
          </li>
        </div>

        <!-- Pied du modal -->
        <!-- Pied du modal -->
        <div class="absolute bg-gray-100 w-full flex justify-end bottom-0 p-4">
          <button class="bg-gray-200 text-black py-1 px-4 rounded-sm mr-2" @click="$emit('onClose')">
            <i class="fa-solid fa-close"></i> Fermer
          </button>
        </div>
      </div>
    </LargeModal>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';


defineProps<{
  isOpen: boolean;
  selectedData?: Product;
}>();
</script>

<style scoped></style>
