<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-black text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Imprimer les codes à barres des produit
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
            <div style="height: 45vh" class="modal-body pb-16 mb-5 p-5 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->

              <div></div>
              <!-- Champ de sélection d'image -->
             
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 font-bold mb-2">Nom du produit</label>
                  <input v-model="formData.name" type="text" id="name" name="name"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required />
                </div>
                <div class="mb-4">
                  <label for="category" class="block text-gray-700 font-bold mb-2">Catégorie du produit</label>
                  <v-select v-model="formData.categoryId"
                    class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500"
                    required :options="storeCat.categories" label="name" :reduce="(option: any) => option.id">
                    <!-- Personnalisation de l'affichage des options -->
                    <template #option="option: any">
                      <div class="flex gap-2">
                        <span>{{ option.name }}</span>
                      </div>
                    </template>
                    <template #search="{ attributes, events }: any">
                      <input class="vs__search" :required="!formData.categoryId" v-bind="attributes" v-on="events" />
                    </template>
                  </v-select>

                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="price" class="block text-gray-700 font-bold mb-2">Prix d'achat du produit</label>
                  <input v-model.number="formData.purchase_price" type="number" id="purchase_price" name="purchase_price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required />
                </div>
                <div class="mb-4">
                  <label for="price" class="block text-gray-700 font-bold mb-2">Prix de vente produit</label>
                  <input v-model.number="formData.selling_price" type="number" id="selling_price" name="selling_price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required />
                </div>
              </div>
              <div class="mb-4">
                <label for="stock" class="block text-gray-700 font-bold mb-2">Stock disponible</label>
                <input v-model.number="formData.stock" type="number" id="stock" name="stock"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required />
              </div>
              <div class="mb-4">
                <label for="description" class="block text-gray-700 font-bold mb-2">Description du produit</label>
                <textarea v-model="formData.description" id="description" name="description"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required></textarea>
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
import FirebaseStorageService from "~/services/FirebaseStorageService";
import { Product, ProductForm } from "~/types";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const store = useProductsStore();
const storeCat = useCategoriesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const props = defineProps<{
  isOpen: boolean;
  selectedData?: Product;
}>();
const formData = ref<ProductForm>({
  name: "", // Nom du produit
  description: "", // Description du produit
  purchase_price: 0, // Prix d'achat du produit
  selling_price: 0, // Prix du produit
  stock: 0, // Stock disponible
  categoryId: "", // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
  imageUrl: null,
}); // Champ de nom de catégorie // Champ de nom de catégorie
const storageService = new FirebaseStorageService();

watch(
  () => props.isOpen,
  (newValue, oldValue) => {
    if (newValue && props.selectedData) {
      // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
      formData.value = { ...props.selectedData };
      imagePreview.value = apiBaseURL + '/' + props.selectedData.imageUrl;
    }
  }
);
const imageFile = ref(null);
const imagePreview = ref("");
// Gérer le changement de fichier image
const handleImageChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();

    reader.onload = (e) => {
      // Lorsque le fichier est chargé, mettez à jour l'aperçu de l'image
      if (typeof e.target?.result === "string") {
        imagePreview.value = e.target.result;
      }
    };
    formData.value.imageUrl = file

    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {
  loading.value = true;
  if (props.selectedData) {
    // Soumettre le formulaire avec l'image à Firebase Storage
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.value.name);
    formDataToSend.append('description', formData.value.description);
    formDataToSend.append('purchase_price', formData.value.purchase_price);
    formDataToSend.append('selling_price', formData.value.selling_price);
    formDataToSend.append('stock', formData.value.stock);
    formDataToSend.append('categoryId', formData.value.categoryId);
    if (formData.value.imageUrl) {
      formDataToSend.append('imageUrl', formData.value.imageUrl);
    }

    await store
      .updated_ata(formDataToSend, props.selectedData.id)
      .then((status) => {
        if (status) {
          emit("onClose");
          emit("onSuccess", "Produit mis à jour avec succès");
        }

        loading.value = false;
      });
  }

  setTimeout(() => {
    loading.value = false;
  }, 5000);
};
</script>
