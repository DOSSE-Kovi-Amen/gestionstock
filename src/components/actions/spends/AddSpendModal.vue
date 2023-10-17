<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Ajouter une dépense
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
              style="height: 60vh"
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
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                  >Titre :</label
                >
                <input
                  v-model="formData.title"
                  class="border rounded-md py-2 px-3 w-full"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Titre"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                  >Montant :</label
                >
                <input
                  v-model="formData.amount"
                  class="border rounded-md py-2 px-3 w-full"
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Montant"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="slug"
                  >Description :</label
                >
                <textarea
                  v-model="formData.description"
                  id="description"
                  name="description"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Description"
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
const store = useSpendsStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const formData = ref({
  title: "",
  amount: "",
  description: "",
}); // Champ de nom de catégorie

// watch(formDataName, updateSlug);

const submitForm = async () => {
  loading.value = true;
  await store.postData(formData.value).then((status) => {
    if (status) {
      emit("onClose");
      emit("onSuccess", "Dépense ajoutée avec succès");
      formData.value.title = "";
      formData.value.amount = "";
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
