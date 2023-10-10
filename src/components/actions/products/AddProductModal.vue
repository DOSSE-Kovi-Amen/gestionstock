<template>
  <div>
    <Modal :is-open="isOpen" style="width: 1110px !important">
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
                    required
                    class="bg-transparent border rounded w-full text-gray-700 py-2 pl-3 pr-10"
                  >
                    <option value="" disabled selected>
                      Sélectionnez une option
                    </option>
                    <option
                      v-for="(cat, index) in storeCat.categories"
                      key="index"
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
                    >Prix du produit</label
                  >
                  <input
                    v-model.number="formData.price"
                    type="number"
                    id="price"
                    name="price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required
                    @focus="formData.price = null"
                  />
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
              <div class="mb-4">
                <label for="imageUrl" class="block text-gray-700 font-bold mb-2"
                  >URL de l'image</label
                >
                <input
                  v-model="formData.imageUrl"
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                />
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
                Fermer
              </a>
              <button
                type="submit"
                class="btn-primary text-white py-2 px-4 rounded-sm"
              >
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
import { CategoryForm } from "~/types";

const store = useProductsStore();
const storeCat = useCategoriesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const formData = ref({
  name: "", // Nom du produit
  description: "", // Description du produit
  price: 0 || null, // Prix du produit
  stock: 0 || null, // Stock disponible
  category: "", // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
  imageUrl: "",
}); // Champ de nom de catégorie
const imageFile = ref(null);
const imagePreview = ref("");
// Gérer le changement de fichier image
function handleImageChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
}
const submitForm = async () => {
  loading.value = true;

  // Soumettre le formulaire avec l'image à Firebase Storage
  if (imageFile.value) {
    // Télécharger l'image vers Firebase Storage ici
    // Utilisez Firebase Storage pour obtenir l'URL de téléchargement de l'image
    const imageUrl = await uploadImageToStorage(imageFile.value);
    formData.value.imageUrl = imageUrl;
  }
  await store.postData(formData.value).then((status) => {
    if (status) {
      console.log("=============status=======================");
      console.log(status);
      console.log("====================================");
      emit("onClose");
      emit("onSuccess", "Produit ajouté avec succès");
    }
    loading.value = false;
  });
  setTimeout(() => {
    loading.value = false;
  }, 15000);
};

async function uploadImageToStorage(file:any) {
  // Téléchargez le fichier image vers Firebase Storage ici
  // Utilisez les fonctionnalités de Firebase Storage pour le téléchargement
  // Retournez l'URL de téléchargement de l'image
  // Par exemple, avec Firebase Storage
  // const storageRef = firebase.storage().ref();
  // const imageRef = storageRef.child('images/' + file.name);
  // await imageRef.put(file);
  // const imageUrl = await imageRef.getDownloadURL();
  // return imageUrl;
}

defineProps({
  isOpen: { type: Boolean, required: true, default: false },
});
</script>
