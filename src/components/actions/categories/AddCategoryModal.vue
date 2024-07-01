<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Ajouter une catégorie
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
              style="height: 70vh"
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
                  {{ error[0] }}
                </p>
              </div>
              <div></div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                    >Nom :</label
                  >
                  <input
                    v-model="formData.name"
                    @input="updateSlug"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nom de la catégorie"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="slug"
                    >Slug :</label
                  >
                  <input
                    v-model="formData.slug"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="slug"
                    name="slug"
                    placeholder="Slug de la catégorie"
                    readonly
                  />
                </div>
                <div class="mb-2">
                  <label for="category" class="block text-gray-700 font-bold mb-2">Catégorie (Optionnel)</label>
                  <v-select v-model="formData.parent_id"
                    class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500"
                     :options="store.categories" :reduce="(option: any) => option.id" label="name">
                    <!-- Personnalisation de l'affichage des options -->
                    <template #option="option: any">
                      <div class="flex gap-2">
                        <span>{{ option.name }}</span>
                      </div>
                    </template>
                    <template #search="{ attributes, events }: any">
                      <input class="vs__search" v-bind="attributes"
                        v-on="events" />
                    </template>
                  </v-select>
  
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const store = useCategoriesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const formData = ref({
  name: "",
  slug: "",
  parent_id: "",
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
// watch(formDataName, updateSlug);

const submitForm = async () => {
  loading.value = true;
  console.log("====================================");
  console.log(formData);
  console.log("====================================");
  await store.postData(formData.value).then((status) => {
    if (status) {
      emit("onClose");
      emit("onSuccess", "Catégorie ajoutée avec succès");
      formData.value.name = "";
      formData.value.slug = "";
      formData.value.parent_id = "";
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
