<template>
  <div>
    <LargeModal :is-open="isOpen">
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
            <div style="height: 85vh" class="modal-body pb-16 p-10 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->
              <div v-if="store.errors && store.errors.length != 0"
                class="bg-red-200 border-l-4 border-red-500 p-4 mb-2">
                <p v-for="(error, index) in store.errors" :key="index" class="font-semibold my-1">
                  {{ error[0] }}
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
                <div class="mb-2">
                  <div>
                    <div class="mb-2">
                      <label for="name" class="block text-gray-700 font-bold mb-2">Nom du produit</label>
                      <input v-model="formData.name" type="text" id="name" name="name"
                        class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        required />
                    </div>
                    <div class="mb-2">
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
                          <input class="vs__search" :required="!formData.category_id" v-bind="attributes"
                            v-on="events" />
                        </template>
                      </v-select>

                    </div>
                    <div class="mb-2">
                      <label for="stock" class="block text-gray-700 font-bold mb-2">Stock disponible</label>
                      <input v-model.number="formData.stock" type="number" min="0" id="stock" name="stock"
                        class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        required step="1">
                    </div>
                    <div class="mb-2">
                      <label for="reorder_level" class="block text-gray-700 font-bold mb-2">Alerte stock</label>
                      <input  v-model.number="formData.reorder_level" type="number" id="reorder_level"
                        name="reorder_level"
                        class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        required step="1">
                    </div>
                  </div>
                </div>

              </div>


              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-2">
                  <label for="purchase_price" class="block text-gray-700 font-bold mb-2">Prix d'achat du produit</label>
                  <input v-model.number="formData.purchase_price" min="1" type="number" id="purchase_price"
                    name="purchase_price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required step="any" />
                </div>
                <div class="mb-2">
                  <label for="selling_price" class="block text-gray-700 font-bold mb-2">Prix de vente produit</label>
                  <input v-model.number="formData.selling_price" min="1" type="number"  id="selling_price" name="selling_price"
                    class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    required step="any" />
                </div>
              </div>

              <div class="mb-2">
                <label for="description" class="block text-gray-700 font-bold mb-2">Description du produit</label>
                <QuillEditor v-model="formData.description" />
              </div>
              <div class="bg-white shadow-lg h-full">
                <input type="file" ref="fileInput" multiple @change="handleFiles" class="hidden" />
                <button type="button" @click="selectFiles"
                  class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Selectionner les
                  images</button>

                <div class="grid pb-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div v-for="(image, index) in previewImages" :key="index"
                    class="relative border-width-2 border-black border-solid border-1 shadow-lg">
                    <img :src="image" class="w-full h-40 object-cover rounded" />
                    <button type="button" @click="removeImage(index)"
                      class="absolute h-8 w-8 top-2 right-2 bg-red-500 text-white rounded-full p-1">X</button>
                  </div>
                </div>
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
    </LargeModal>
  </div>
</template>

<script setup lang="ts">
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const store = useProductsStore();
const storeCat = useCategoriesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const formData = ref({
  name: "", // Nom du produit
  description: "", // Description du produit
  purchase_price: 0, // Prix d'achat du produit
  selling_price: 0, // Prix du produit
  reorder_level: 0,
  stock: 0, // Stock disponible
  category_id: "",
  slug: "",
  image: null,
  images: []
}); // Champ de nom de catégorie

// Watch pour valider et corriger le stock s'il devient négatif
watch(() => formData.value.stock, (newVal) => {
  if (newVal < 0) {
    formData.value.stock = 0;
  }
}
);
// Watch pour valider et corriger le stock s'il devient négatif
watch(() => formData.value.reorder_level, (newVal) => {
  if (newVal < 0) {
    formData.value.reorder_level = 0;
  }
}
);


const fileInput = ref<HTMLInputElement | null>(null);
const previewImages = ref<string[]>([]);

const selectFiles = () => {
  fileInput.value?.click();
};

const handleFiles = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  const files = Array.from(input.files);
  console.log('====================================');
  console.log(files);
  console.log('====================================');
  formData.value.images = files;
  previewImages.value = files.map(file => URL.createObjectURL(file));
};

const removeImage = (index: number) => {
  formData.value.images.splice(index, 1);
  previewImages.value.splice(index, 1);
};

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
    formData.value.image = file

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
  formDataToSend.append('reorder_level', formData.value.reorder_level);
  formDataToSend.append('slug', formData.value.slug);
  formDataToSend.append('category_id', formData.value.category_id);
  formDataToSend.append('image', formData.value.image);
  formData.value.images.forEach((file: string | Blob, index: any) => {
    formDataToSend.append(`images[${index}]`, file);
  });
  // formDataToSend.append('images[]', formData.value.images);
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
      formData.value.image = "";
      formData.value.images = null;
      formData.value.name = "";
      formData.value.purchase_price = null;
      formData.value.selling_price = null;
      formData.value.stock = null;
      formData.value.reorder_level = null;
      imageFile.value = null;
      imagePreview.value = "";
      previewImages.value = [];
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
