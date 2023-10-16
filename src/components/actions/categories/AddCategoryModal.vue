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
                    v-model="formData.name"
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
                    v-model="formData.slug"
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
const store = useCategoriesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const formData = ref({
  name: "",
  slug: "",
}); // Champ de nom de catégorie
const formDataSlug = ref(""); // Champ de slug
function updateSlug() {
  console.log("====================================");
  console.log();
  console.log("====================================");
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
  await store.postData(formData.value).then((status) => {
    if (status) {
      emit("onClose");
      emit("onSuccess", "Catégorie ajoutée avec succès");
      formData.value.name = "";
      formData.value.slug = "";
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
