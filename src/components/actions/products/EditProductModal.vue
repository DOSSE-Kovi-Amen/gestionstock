<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Editer un produit
          </h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Contenu du modal -->
        <div
          v-if="loading"
          class="flex bg-white h-64 w-full justify-center items-center"
        >
          <Spinner class="h-12" />
        </div>

        <div v-else>
          <form @submit.prevent="submitForm">
            <!-- Contenu du modal -->
            <div
              style="height: 85vh"
              class="modal-body pb-16 p-5 overflow-y-auto"
            >
              <!-- Ajoutez ici le contenu du modal -->

              <div></div>
              <!-- Champ de sélection d'image -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="image" class="block text-gray-700 font-bold mb-2"
                    >Image du produit</label
                  >

                  <label
                    for="image"
                    class="cursor-pointer mt-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Choisissez un fichier
                  </label>
                  <input
                    @change="handleImageChange"
                    type="file"
                    class="hidden"
                    accept="image/*"
                    id="image"
                    name="image"
                  />
                </div>
                <div class="mb-4">
                  <!-- <label for="image" class="block text-gray-700 font-bold mb-2"
                    >Image du produit</label
                  > -->
                  <!-- Prévisualisation de l'image -->
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Prévisualisation de l'image"
                    class="mt-2 max-h-32 object-contain w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 font-bold mb-2"
                    >Nom du produit</label
                  >
                  <input
                    v-model="formData.name"
                    type="text"
                    id="name"
                    name="name"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="category"
                    class="block text-gray-700 font-bold mb-2"
                    >Catégorie du produit</label
                  >
                  <select
                    v-model="formData.category"
                    name="category"
                    id="category"
                    class="bg-transparent border rounded w-full text-gray-700 py-2 pl-3 pr-10 focus:outline-none focus:border-blue-500"
                  >
                    <option value="" disabled selected>
                      Sélectionnez une catégorie
                    </option>
                    <option
                      v-if="selectedData?.category"
                      :value="selectedData?.category"
                      selected
                    >
                      {{ selectedData?.category }}
                    </option>

                    <option
                      v-for="(cat, index) in storeCat.categories"
                      :key="index"
                      :value="cat.name"
                    >
                      {{ cat.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="price" class="block text-gray-700 font-bold mb-2"
                    >Prix d'achat du produit</label
                  >
                  <input
                    v-model.number="formData.purchase_price"
                    type="number"
                    id="purchase_price"
                    name="purchase_price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label for="price" class="block text-gray-700 font-bold mb-2"
                    >Prix de vente produit</label
                  >
                  <input
                    v-model.number="formData.selling_price"
                    type="number"
                    id="selling_price"
                    name="selling_price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div class="mb-4">
                <label for="stock" class="block text-gray-700 font-bold mb-2"
                  >Stock disponible</label
                >
                <input
                  v-model.number="formData.stock"
                  type="number"
                  id="stock"
                  name="stock"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="description"
                  class="block text-gray-700 font-bold mb-2"
                  >Description du produit</label
                >
                <textarea
                  v-model="formData.description"
                  id="description"
                  name="description"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
            </div>

            <!-- Pied du modal -->
            <div
              class="absolute bg-gray-100 w-full flex justify-end bottom-0 p-4"
            >
              <a
                class="bg-gray-200 text-black py-2 px-4 rounded-sm mr-2"
                @click="$emit('onClose')"
              >
              <i class="fa-solid fa-close"></i> Fermer
              </a>
              <button
                type="submit"
                class="btn-primary text-white py-2 px-4 rounded-sm"
              >
              <i class="fa-solid fa-save"></i>  Enregistrer
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

const store = useProductsStore();
const storeCat = useCategoriesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const props = defineProps<{
  isOpen: boolean;
  selectedData?: Product;
}>();
const formData = ref({
  name: "", // Nom du produit
  description: "", // Description du produit
  purchase_price: 0, // Prix d'achat du produit
  selling_price: 0, // Prix du produit
  stock: 0, // Stock disponible
  category: "", // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
  imageUrl: "",
}); // Champ de nom de catégorie // Champ de nom de catégorie
const storageService = new FirebaseStorageService();

watch(
  () => props.isOpen,
  () => {
    if (props.selectedData) {
      // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
      formData.value = { ...props.selectedData };
      imagePreview.value = props.selectedData.imageUrl;
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

    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {
  loading.value = true;
  if (props.selectedData) {
    // Soumettre le formulaire avec l'image à Firebase Storage
    if (imageFile.value) {
      // Télécharger l'image vers Firebase Storage ici
      // Utilisez Firebase Storage pour obtenir l'URL de téléchargement de l'image
      const downloadURL = await storageService.uploadFile(imageFile.value);
      if (downloadURL) {
        formData.value.imageUrl = downloadURL;
        console.log('=====================url===============');
        console.log(formData.value);
        console.log('====================================');
      }
    }

    await store
      .updateData(formData.value, props.selectedData.id)
      .then((status) => {
        if (status) {
          console.log("=============status=======================");
          console.log(status);
          console.log("====================================");
          emit("onClose");
          emit("onSuccess", "Produit mis à jour avec succès");
        }

        loading.value = false;
      });
  }

  setTimeout(() => {
    loading.value = false;
  }, 15000);
};
</script>
