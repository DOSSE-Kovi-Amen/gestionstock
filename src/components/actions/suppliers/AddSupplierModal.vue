<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Ajouter un fournisseur
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
              <div
                v-if="store.errors && store.errors.length != 0"
                class="bg-red-200 border-l-4 border-red-500 p-4 mb-4"
              >
                <p
                  v-for="(error, index) in store.errors"
                  :key="index"
                  class="font-semibold my-1"
                >
                  {{ error[0] }} :
                </p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                    >Nom (*) :
                  </label>
                  <input
                    v-model="formData.name"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nom"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                    >Email :</label
                  >
                  <input
                    v-model="formData.email"
                    class="border rounded-md py-2 px-3 w-full"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="telephone"
                    >Telephone (*) :
                  </label>
                  <input
                    v-model="formData.telephone"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="telephone"
                    name="telephone"
                    placeholder="Téléphone"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="address"
                    >Adresse :</label
                  >
                  <input
                    v-model="formData.address"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Adresse"
                  />
                </div>
              </div>
              
              <div class="mb-4">
                <label
                  for="description"
                  class="block text-gray-700 font-bold mb-2"
                  >Description</label
                >
                <textarea
                  v-model="formData.description"
                  id="description"
                  name="description"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
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
const store = useSuppliersStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const formData = ref({
  codeSupplier: "", //
  name: "",
  email: "",
  telephone: "",
  zip_code: "",
  address: "",
  description: "",
  country: "",
  city: ""
}); // Champ de nom de catégorie

const submitForm = async () => {
  loading.value = true;
  await store.postData(formData.value).then((status) => {
    if (status) {
      emit("onClose");
      emit("onSuccess", "Client ajouté avec succès");
      formData.value.name = "";
      formData.value.address = "";
      formData.value.city = "";
      formData.value.codeSupplier = "";
      formData.value.country = "";
      formData.value.zip_code = "";
      formData.value.email = "";
      formData.value.description;
      formData.value.telephone = "";
    }
    // emit('onClose')
    // emit('onSuccess', "Catégorie ajoutée avec succès")

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
