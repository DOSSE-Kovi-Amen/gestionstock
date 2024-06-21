<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Ajouter un produit
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
            <div style="height: 85vh" class="modal-body pb-16 p-5 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->
              <div v-if="store.errors && store.errors.length != 0"
                class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
                <p v-for="(error, index) in store.errors" :key="index" class="font-semibold my-1">
                  {{ error }} :
                </p>
              </div>
              <!-- Champ de sélection d'image -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-2 border rounded p-2">
                  <label for="image" class="block text-gray-700 font-bold mb-2">Choisir une image</label>

                  <label for="image" class="cursor-pointer">
                    <div style="height:200px;width:200px; display: flex; justify-content: center; align-items: center;">
                    <i v-if="!imagePreview" class="fa fa-image fa-10x text-gray-500 hover:text-gray-700"></i>

                    <img v-if="imagePreview" style="object-fit: contain; height:200px;width:200px" :src="imagePreview"
                      alt="Prévisualisation de l'image"
                      class="mt-2 max-h-32 hover:bg-gray-500 object-contain text-gray-700 focus:outline-none focus:border-blue-500" />

                    </div>

                  </label>
                  <input @change="handleImageChange" type="file" class="hidden" accept="image/*" id="image"
                    name="image" />
                </div>
                <div class="mb-4">
                  <!-- <label for="image" class="block text-gray-700 font-bold mb-2"
                    >Image du produit</label
                  > -->
                  <!-- Prévisualisation de l'image -->
                  <img v-if="imagePreview" :src="imagePreview" alt="Prévisualisation de l'image"
                    class="mt-2 max-h-32 bg-black object-contain w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 font-bold mb-2">Nom du produit</label>
                  <input v-model="formData.name" @input="updateSlug" type="text" id="name" name="name"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required placeholder="Nom du produit" />
                </div>
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 font-bold mb-2">Slug du produit</label>

                 <input v-model="formData.slug" class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" type="text" id="slug"
                  name="slug" placeholder="Slug de la catégorie" readonly required /> 
                </div>
                
               
              </div>
              <div class="mb-4">
                <label for="category" class="block text-gray-700 font-bold mb-2">Catégorie (Optionnel)</label>
                <v-select v-model="formData.category_id"
                  class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500"
                  required :options="storeCat.categories" :reduce="(option: any) => option.id" label="name">
                  <!-- Personnalisation de l'affichage des options -->
                  <template #option="option: any">
                    <div class="flex gap-2">
                      <span>{{ option.name }}</span>
                    </div>
                  </template>
                  <template #search="{ attributes, events }: any">
                    <input class="vs__search" :required="!formData.category_id" v-bind="attributes" v-on="events" />
                  </template>
                </v-select>

              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-2">
                  <label for="price" class="block text-gray-700 font-bold mb-2">Prix d'achat du produit</label>
                  <input v-model.number="formData.purchase_price" type="number" id="purchase_price"
                    name="purchase_price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required />
                </div>
                <div class="mb-2">
                  <label for="price" class="block text-gray-700 font-bold mb-2">Prix de vente produit</label>
                  <input v-model.number="formData.selling_price" type="number" id="selling_price" name="selling_price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required />
                </div>
              </div>

              <div class="mb-2">
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
import { CategoryForm, ProductForm } from "~/types";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const store = useProductsStore();
const storeCat = useCategoriesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const formData = ref<any>({
  name: "", // Nom du produit
  description: "", // Description du produit
  purchase_price: null, // Prix d'achat du produit
  selling_price: null, // Prix du produit
  stock: null, // Stock disponible
  category_id: "",
  slug: "",
  image_url: null
}); // Champ de nom de catégorie
function updateSlug() {
  // Mettez en forme le champ de slug en fonction du nom de catégorie
  formData.value.slug = formData.value.name
    .trim() // Supprimez les espaces avant et après
    .toLowerCase() // Convertissez en minuscules
    .replace(/\s+/g, "-") // Remplacez les espaces par des tirets
    .replace(/[^a-z0-9-]/g, ""); // Supprimez tous les caractères non autorisés

  // Vous pouvez également ajouter d'autres transformations au slug si nécessaire
}
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
    formData.value.image_url = file

    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {

  loading.value = true;
  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.value.name);
  formDataToSend.append('description', formData.value.description);
  formDataToSend.append('purchase_price', formData.value.purchase_price);
  formDataToSend.append('selling_price', formData.value.selling_price);
  formDataToSend.append('stock', formData.value.stock);
  formDataToSend.append('slug', formData.value.slug);
  formDataToSend.append('category_id', formData.value.category_id);
  formDataToSend.append('image_url', formData.value.image_url);

  console.log('==================formDataToSend==================');
  console.log(formData.value);
  console.log('====================================');

  await store.postData(formDataToSend).then((status) => {
    if (status) {
      emit("onClose");
      emit("onSuccess", "Produit ajouté avec succès");
      console.log('====================================');
      console.log();
      console.log('====================================');
      // reset data
      formData.value.category_id = "";
      formData.value.description = "";
      formData.value.image_url = "";
      formData.value.name = "";
      formData.value.purchase_price = null; 
      formData.value.selling_price = null;
      formData.value.stock = null;

      imageFile.value = null;
      imagePreview.value = "";
    }
    loading.value = false;
  });
  setTimeout(() => {
    loading.value = false;
  }, 5000);
};

defineProps({
  isOpen: { type: Boolean, required: true, default: false },
});
</script>
