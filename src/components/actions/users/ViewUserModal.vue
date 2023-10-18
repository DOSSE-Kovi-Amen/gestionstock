
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
          <li><strong>Nom d'utilisateur:</strong> {{ selectedData?.attributes.username }}</li>
          <li><strong>Prénom:</strong> {{ selectedData?.attributes.first_name }}</li>
          <li><strong>Nom de famille:</strong> {{ selectedData?.attributes.last_name }}</li>
          <li><strong>Nom complet:</strong> {{ selectedData?.attributes.full_name }}</li>
          <li><strong>Email:</strong> {{ selectedData?.attributes.email }}</li>
          <li><strong>Téléphone:</strong> {{ selectedData?.attributes.phone_number }}</li>
          <li><strong>CNI:</strong> {{ selectedData?.attributes.cni }}</li>
          <li><strong>Passeport:</strong> {{ selectedData?.attributes.passport }}</li>
          <li><strong>Dernière connexion:</strong> {{ selectedData?.attributes.last_login }}</li>
          <li><strong>Est agent: </strong> 
            <i v-if="selectedData?.attributes.is_agent == true" class="fa fa-check-circle fa-2x text-green-500"
              aria-hidden="true"></i>
            <i v-else class="fa fa-xmark-circle fa-lg text-red-500" aria-hidden="true"></i>
          </li>
          <li><strong>Est personnel: </strong> 
            <i v-if="selectedData?.attributes.is_staff == true" class="fa fa-check-circle fa-2x text-green-500"
            aria-hidden="true"></i>
          <i v-else class="fa fa-xmark-circle fa-lg text-red-500" aria-hidden="true"></i>
      
          </li>
          <li><strong>Est super utilisateur:</strong>
            <i v-if="selectedData?.attributes.is_superuser == true" class="fa fa-check-circle fa-2x text-green-500"
            aria-hidden="true"></i>
          <i v-else class="fa fa-xmark-circle fa-lg text-red-500" aria-hidden="true"></i>
      
          </li>
          <li><strong>Statut:</strong> {{ selectedData?.attributes.status }}</li>
          <li><strong>Évaluation:</strong> {{ selectedData?.attributes.rating }}</li>
          <li><strong>Commentaires:</strong> {{ selectedData?.attributes.reviews }}</li>
          <li><strong>Date de création:</strong> {{ frenchDate(selectedData?.attributes.created ?? "") }}</li>
          <li><strong>Date de modification:</strong> {{ frenchDate(selectedData?.attributes.modified ?? "") }}</li>
          <li><strong>Date d'activation:</strong> {{ frenchDate(selectedData?.attributes.activate_date ?? "") }}</li>
          <li><strong>Date de désactivation:</strong> {{ frenchDate(selectedData?.attributes.deactivate_date ?? "") }}
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
import { UserList } from '~/types/types';

defineProps<{
  isOpen: boolean
  selectedData?: UserList
}>()

</script>

<style scoped></style>~/types/users