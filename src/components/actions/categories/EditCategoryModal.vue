<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Editer une catégorie
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
              style="height: 30vh"
              class="modal-body pb-16 p-5 overflow-y-auto"
            >
              <!-- Ajoutez ici le contenu du modal -->
              <div
                v-if="store.errors && store.errors.length != 0"
                class="bg-red-200 border-l-4 border-red-500 p-4 mb-4"
              >
                <p
                  v-for="(error, index) in store.errors"
                  :key="index"
                  class="font-semibold my-1"
                >
                  {{ getFieldFromPointer(error.source.pointer) }} :
                  {{ error.detail }}
                </p>
              </div>
              <div></div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                    >Nom :</label
                  >
                  <input
                    v-model="category.name"
                    @input="updateSlug"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nom de la catégorie"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="slug"
                    >Slug :</label
                  >
                  <input
                    v-model="category.slug"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="slug"
                    name="slug"
                    placeholder="Slug de la catégorie"
                    readonly
                    required
                  />
                </div>
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
import { Category, CategoryForm } from "~/types";

const store = useCategoriesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const props = defineProps<{
  isOpen: boolean;
  selectedData?: Category;
}>();
const category = ref({
  name: "",
  slug: "",
}); // Champ de nom de catégorie

watch(
  () => props.isOpen,
  (newValue, oldValue) => {
    if (newValue && props.selectedData) {
      // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
      category.value = { ...props.selectedData };
    }
  }
);
function updateSlug() {
  console.log("====================================");
  console.log();
  console.log("====================================");
  // Mettez en forme le champ de slug en fonction du nom de catégorie
  category.value.slug = category.value.name
    .trim() // Supprimez les espaces avant et après
    .toLowerCase() // Convertissez en minuscules
    .replace(/\s+/g, "-") // Remplacez les espaces par des tirets
    .replace(/[^a-z0-9-]/g, ""); // Supprimez tous les caractères non autorisés

  // Vous pouvez également ajouter d'autres transformations au slug si nécessaire
}
// watch(categoryName, updateSlug);

const submitForm = async () => {
  loading.value = true;
  if (props.selectedData) {
    await store
      .updatedData(category.value, props.selectedData.id)
      .then((status) => {
        if (status) {
          console.log("=============status=======================");
          console.log(status);
          console.log("====================================");
          emit("onClose");
          emit("onSuccess", "Catégorie mise à jour avec succès");
        }

        loading.value = false;
      });
  }

  setTimeout(() => {
    loading.value = false;
  }, 15000);
};
</script>
