<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl"><i class="fa-regular fa-pen-to-square"></i> Editer une organisation</h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Contenu du modal -->
        <div v-if="loading" class="flex bg-white h-64 w-full justify-center items-center ">
          <Spinner class="h-12" />
        </div>

        <div v-else>


          <form @submit.prevent="submitForm">
            <!-- Contenu du modal -->
            <div style="height: 80vh;" class="modal-body pb-16 p-5 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->
              <div v-if="store.errors && store.errors.length != 0" class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
                <p v-for="(error, index) in  store.errors" :key="index" class="font-semibold my-1">
                  {{ getFieldFromPointer(error.source.pointer) }} : {{ error.detail }}</p>
              </div>

              <div class="mb-4">
                <label for="name" class="block font-bold mb-2">Nom</label>
                <input v-model="formData.name" type="text" id="name" name="name"
                  class="w-full p-2 border border-gray-300 rounded" placeholder="Nom" required>
              </div>

              <div class="mb-4">
                <label for="description" class="block font-bold mb-2">Description</label>
                <textarea v-model="formData.description" id="description" name="description" rows="4"
                  class="w-full p-2 border border-gray-300 rounded" placeholder="Description"></textarea>
              </div>
              <div class="mb-4">
                <label for="cfe" class="block font-bold mb-2">CFE</label>
                <input v-model="formData.cfe" type="text" id="cfe" name="cfe"
                  class="w-full p-2 border border-gray-300 rounded">
              </div>

            </div>


            <!-- Pied du modal -->
            <div class="absolute bg-gray-100 w-full flex justify-end bottom-0  p-4">
              <button class="bg-gray-200 text-black py-2 px-4 rounded-sm mr-2" @click="$emit('onClose')">
                Fermer
              </button>
              <button type="submit" class="btn-primary text-white py-2 px-4 rounded-sm">
                Enregistrer
              </button>
            </div>
          </form>
        </div>

      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Organization } from '~/types';

const store = useOrganizationsStore();
const emit = defineEmits(['onClose', 'onSuccess'])
const props = defineProps<{
  isOpen: boolean
  selectedData?: Organization
}>()
const loading = ref(false)
const formData = {
  name: props.selectedData?.attributes.name,
  description: "",
  cfe: null,
  ceo: '',
};

const submitForm = async () => {
  loading.value = true
  await store.editData(formData).then((status) => {

    if (status) {
      console.log('=============data=======================');
      console.log(status);
      console.log('====================================');
      emit('onClose')
      emit('onSuccess', "Organisation ajouté avec succès")

    }
    loading.value = false
  })
};
// watch(() => props.show, (newValue, oldValue) => {
//   if (newValue) {
//     // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
//     setTimeout(() => {
//       emit("onClose")
//     }, 3000);
//   }
// });

</script>