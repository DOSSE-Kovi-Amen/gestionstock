<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Ajouter une perte
          </h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Contenu du modal -->
        <div v-if="loading" class="flex bg-white h-64 w-full justify-center items-center">
          <Spinner class="h-12" />
        </div>

        <div v-else>
          <form @submit.prevent="submitForm">
            <!-- Contenu du modal -->
            <div style="height: 70vh" class="modal-body pb-16 p-5 overflow-y-auto">
              <div v-if="store.errors && store.errors.length != 0" class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
                <p v-for="(error, index) in store.errors" :key="index" class="font-semibold my-1">
                  {{ error }} :
                </p>
              </div>
              <!-- Ajoutez ici le contenu du modal -->
              <div class="mb-4">
                <label for="product" class="block text-gray-700 font-bold mb-2">Nom du produit perdu:
                </label>
                <v-select v-model="formData.product"
                  class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500"
                  required :options="productStore.products" label="name">
                  <!-- Personnalisation de l'affichage des options -->
                  <template #option="option: any">
                    <div class="flex gap-2">
                      <span>{{ option.name }}</span>
                      <span class="text-green-500">({{ option.stock }})</span>
                    </div>
                  </template>
                  <template #search="{ attributes, events }: any">
                    <input class="vs__search" :required="!formData.product" v-bind="attributes" v-on="events" />
                  </template>
                </v-select>

              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">Quantité:</label>
                <input v-model="formData.quantity" class="border rounded-md py-2 px-3 w-full" type="number" id="quantity"
                  min="0.25" step="0.25" name="quantity" placeholder="Quantité" required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="slug">Description :</label>
                <textarea v-model="formData.description" id="description" name="description"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" required
                  placeholder="Description"></textarea>
              </div>
            </div>

            <!-- Pied du modal -->
            <div class="absolute bg-gray-100 w-full flex justify-end bottom-0 p-4">
              <a class="bg-gray-200 text-black py-2 px-4 rounded-sm mr-2" @click="$emit('onClose')">
                <i class="fa-solid fa-close"></i> Fermer
              </a>
              <button type="submit" class="btn-primary text-white py-2 px-4 rounded-sm">
                <i class="fa-solid fa-save"></i> Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { LossForm } from "~/types";
const store = useLossesStore();
const productStore = useProductsStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const formData = ref<LossForm>({
  product: null,
  quantity: null,
  description: "",
}); // Champ de nom de catégorie

const submitForm = async () => {
  loading.value = true;
  await store.postData(formData.value).then(async (status) => {
    if (status) {
      emit("onClose");
      emit("onSuccess", "Perte ajoutée avec succès");

      productStore.getData();
      formData.value.product = null;
      formData.value.quantity = null;
      formData.value.description = "";
    }
    // emit('onClose')
    // emit('onSuccess', "Catégorie ajoutée avec succès")

    loading.value = false;
  });
  setTimeout(() => {
    loading.value = false;
  }, 15000);
};

defineProps({
  isOpen: { type: Boolean, required: true, default: false },
});
</script>
