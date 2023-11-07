
<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-yellow-500 text-white justify-between pb-3">
          <h3 class="text-xl"> <i class="fa-regular fa-eye"></i> Voir un utilistaeur</h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <!-- Contenu du modal -->
        <div style="height: 80vh;" class="modal-body pb-16 p-5 overflow-y-auto">
          <!-- Ajoutez ici le contenu du modal -->
          <li><strong>ID:</strong> {{ selectedData?.id }}</li>
          <li><strong>Nom et prénoms:</strong> {{ selectedData?.name }}</li>
          <li><strong>Pseudo</strong>{{ selectedData?.username }}</li>
          <li><strong>Email:</strong> {{ selectedData?.email }}</li>
          <li><strong>Téléphone:</strong> {{ selectedData?.phoneNumber }}</li>
          <li><strong>Dernière connexion:</strong> {{ selectedData?.lastLogin }}</li>
          <!-- <li><strong>Est super utilisateur:</strong>
            <i v-if="selectedData?.is_superuser == true" class="fa fa-check-circle fa-2x text-green-500"
            aria-hidden="true"></i>
          <i v-else class="fa fa-xmark-circle fa-lg text-red-500" aria-hidden="true"></i>
      
          </li> -->
          <li><strong>Statut:</strong> {{ selectedData?.status }}</li>
          <li><strong>Date de création:</strong> {{ frenchDate(selectedData?.createdAt ?? "") }}</li>
          <li><strong>Date de modification:</strong> {{ frenchDate(selectedData?.updatedAt ?? "") }}</li>
          <li><strong>Date d'activation:</strong> {{ frenchDate(selectedData?.activate_date ?? "") }}</li>
          <li><strong>Date de désactivation:</strong> {{ frenchDate(selectedData?.deactivate_date ?? "") }}
          </li>

        </div>

        <!-- Pied du modal -->
        <!-- Pied du modal -->
        <div class="absolute bg-gray-100 w-full flex justify-end bottom-0  p-4">
          <button class="bg-gray-200 text-black py-1 px-4 rounded-sm mr-2" @click="$emit('onClose')">
            Fermer
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { User } from '~/types';

defineProps<{
  isOpen: boolean
  selectedData?: User
}>()

</script>

<style scoped></style>~/types/users