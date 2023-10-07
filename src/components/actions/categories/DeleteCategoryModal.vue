
<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left h-56">

        <!-- En-tête du modal -->

        <div class="flex p-4 bg-red-500 text-white justify-between pb-3">
          <h3 class="text-xl">Confirmer la suppression</h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <!-- Contenu du modal -->
        <div v-if="loading" class="flex bg-white h-full w-full justify-center items-center ">
          <Spinner class="h-12" />
        </div>
        
        <div v-else>
          <div  class="modal-body p-5">
            <!-- Ajoutez ici le contenu du modal -->
            <p>{{ `Supprimer ${selectedData?.attributes.last_name} ${selectedData?.attributes.first_name} ?` }}</p>
          </div>
  
          <!-- Pied du modal -->
            <!-- Pied du modal -->
            <div class="absolute bg-gray-100 w-full flex justify-end bottom-0  p-4">
              <button class="bg-gray-200 text-black py-1 px-4 rounded-sm mr-2" @click="$emit('onClose')">
                Fermer
              </button>
              <button @click="deleteData(selectedData?.id??'')" class="btn-primary text-white py-1 px-4 rounded-sm">
                Supprimer
              </button>
            </div>          
        </div>

      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { UserList } from '~/types/types';
const emit =defineEmits(['onClose','onSuccess'])

const loading=ref(false);
const store = useUsersStore();
defineProps<{
  isOpen: boolean
  selectedData?:UserList
}>()

const deleteData = async (id: string) => {
  loading.value=true;
  store.deleteData(id).then(() => {
    loading.value=false;
    emit('onClose')
    emit('onSuccess',"Utilisateur supprimé avec succès")
  })
}
</script>

<style scoped>

</style>