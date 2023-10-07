<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl"><i class="fa-solid fa-circle-plus"></i> Ajouter une catégorie</h3>
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
            <div style="height: 30vh;" class="modal-body pb-16 p-5 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->
              <div v-if="store.errors && store.errors.length!=0" class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
                <p  v-for="(error, index) in  store.errors" :key="index" class="font-semibold my-1">
                  {{ getFieldFromPointer(error.source.pointer) }} : {{error.detail}}</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Pseudo :</label>
                  <input v-model="category.name" class="border rounded-md py-2 px-3 w-full" type="text" id="name"
                    name="name" placeholder="Nom de la catégorie" required />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="last_name">Nom :</label>
                  <input v-model="category.slug" class="border rounded-md py-2 px-3 w-full" type="text" id="last_name"
                    name="last_name" placeholder="Slug de la catégorie" required />
                </div>
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
const store = useCategoriesStore();
const emit = defineEmits(['onClose', 'onSuccess'])
const loading = ref(false)
const category = {
  name: '',
  slug: '',
};

const submitForm = async () => {
  loading.value = true
  await store.postData(category).then((status) => {

    // if (status) {
    //   console.log('=============data=======================');
    //   console.log(status);
    //   console.log('====================================');
    //   emit('onClose')
    //   emit('onSuccess', "Utilisateur ajouté avec succès")

    // }
    emit('onClose')
      emit('onSuccess', "Catégorie ajoutée avec succès")

    loading.value = false
  })
};

defineProps({
  isOpen: { type: Boolean, required: true, default: false },
})
</script>